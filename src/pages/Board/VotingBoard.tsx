import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const VotingBoard: React.FC = () => {
  const [lines, setLines] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLines = async () => {
    try {
      const response = await axios.get('http://localhost:8080/myline/board', {
        withCredentials: true,
        headers: {
          'accept': '*/*',
        }
      });
      console.log('API response:', response.data); // API 응답 데이터를 로그로 출력
      setLines(response.data.lineCandidateDtoList || []); // 응답 데이터가 없을 경우 빈 배열로 초기화
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err); // 에러 로그 출력
      setError('Failed to fetch lines. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLines();
  }, []);

  const handleLike = async (id: number) => {
    try {
      await axios.post('http://localhost:8080/myline/like', { id }, {
        withCredentials: true,
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        }
      });
      fetchLines();
    } catch (err) {
      setError('Failed to like the line. Please try again.');
    }
  };

  const handleDislike = async (id: number) => {
    try {
      await axios.post('http://localhost:8080/myline/dislike', { id }, {
        withCredentials: true,
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        }
      });
      fetchLines();
    } catch (err) {
      setError('Failed to dislike the line. Please try again.');
    }
  };

  const handleCancelLike = async (id: number) => {
    try {
      await axios.post('http://localhost:8080/myline/unlike', { id }, {
        withCredentials: true,
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        }
      });
      fetchLines();
    } catch (err) {
      setError('Failed to cancel like. Please try again.');
    }
  };

  const handleCancelDislike = async (id: number) => {
    try {
      await axios.post('http://localhost:8080/myline/undislike', { id }, {
        withCredentials: true,
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        }
      });
      fetchLines();
    } catch (err) {
      setError('Failed to cancel dislike. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Voting Board</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div>
        {lines.length > 0 ? (
          lines.map(line => (
            <div key={line.id} className="bg-gray-50 p-4 rounded mb-4 shadow">
              <p className="font-semibold">{line.line}</p>
              <p className="text-gray-600">{line.movie}</p>
              <p className="text-gray-600">{line.tags.join(', ')}</p>
              <p className="text-gray-600">Likes: {line.like}, Dislikes: {line.dislike}</p>
              <p className="text-gray-600">Expires at: {line.expireAt}</p>
              <div className="flex items-center mt-2 space-x-4">
                <button
                  className="flex items-center text-blue-500 hover:text-blue-600"
                  onClick={() => line.isLike ? handleCancelLike(line.id) : handleLike(line.id)}
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                  <span>{line.isLike ? 'Cancel Like' : 'Like'}</span>
                </button>
                <button
                  className="flex items-center text-red-500 hover:text-red-600"
                  onClick={() => line.isDislike ? handleCancelDislike(line.id) : handleDislike(line.id)}
                >
                  <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
                  <span>{line.isDislike ? 'Cancel Dislike' : 'Dislike'}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No lines available for voting.</p>
        )}
      </div>
    </div>
  );
};

export default VotingBoard;
