import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiscussionBoard: React.FC = () => {
  const [discussions, setDiscussions] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchDiscussions = async () => {
      const response = await axios.get('http://localhost:8080/api/discussions');
      setDiscussions(response.data);
    };
    fetchDiscussions();
  }, []);

  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:8080/api/discussions`, {
      params: { search: query }
    });
    setDiscussions(response.data);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="토론 검색" 
      />
      <button onClick={handleSearch}>검색</button>
      <div>
        {discussions.map((discussion: any) => (
          <div key={discussion.id}>
            <h2>{discussion.title}</h2>
            <p>{discussion.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscussionBoard;
