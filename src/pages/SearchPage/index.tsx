import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Line } from './type';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<Line[]>([]);
  const query = useQuery().get('tag') || '';
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/lines/search', {
          params: { tags: query, favorite: false },
          withCredentials: true,
        });
        setResults(response.data.lines);
      } catch (error: any) {
        console.error('Error fetching search results:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleLikeToggle = async (id: number, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await axios.post('http://localhost:8080/util/removefavorite', { id }, {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Cookie': 'session=<yourSessionHere>'
          },
          withCredentials: true
        });

        setResults(prevResults =>
          prevResults.map(result =>
            result.id === id ? { ...result, favoriteCount: result.favoriteCount - 1, isFavorite: false } : result
          )
        );
      } else {
        await axios.post('http://localhost:8080/util/addfavorite', { id }, {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Cookie': 'session=<yourSessionHere>'
          },
          withCredentials: true
        });

        setResults(prevResults =>
          prevResults.map(result =>
            result.id === id ? { ...result, favoriteCount: result.favoriteCount + 1, isFavorite: true } : result
          )
        );
      }
    } catch (error: any) {
      console.error('Error toggling favorite status:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  if (!query) {
    return <div className="text-center mt-8">Please enter a search query.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Search Results for "{query}"</h2>
      <div className="mt-6">
        {results.length > 0 ? (
          results.map((result: any) => (
            <div 
              key={result.id} 
              className="bg-white p-4 rounded shadow-md mb-4 cursor-pointer hover:bg-gray-100"
            >
              <p className="font-semibold">{result.line}</p>
              <p className="text-gray-600">{result.actor}</p>
              <p className="text-gray-600">{result.movie}</p>
              <p className="text-gray-600">{result.tag.join(', ')}</p>
              <div className="flex items-center">
                <div 
                  className="flex items-center text-blue-500 cursor-pointer hover:text-blue-600 mr-2"
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 방지
                    handleLikeToggle(result.id, result.isFavorite);
                  }} 
                >
                  <FontAwesomeIcon icon={result.isFavorite ? faThumbsDown : faThumbsUp} className="mr-1" />
                  <span>{result.isFavorite ? '좋아요 취소' : '좋아요'}</span>
                </div>
                <p className="text-gray-600">좋아요: {result.favoriteCount}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
