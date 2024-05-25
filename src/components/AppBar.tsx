import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8080/util/taglist', {
          headers: {
            'accept': '*/*'
          }
        });
        setTags(response.data.tagDtoList);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/check', {
          withCredentials: true,
        });
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    fetchTags();
    checkLoginStatus();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filteredSuggestions = tags.filter(tag =>
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?tag=${searchQuery}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    navigate(`/search?tag=${suggestion}`);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8080/auth/signout', {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="mr-4">Home</Link>
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded shadow-md w-full mt-1 max-h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-black">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="ml-4">
          Logout
        </button>
      ) : (
        <Link to="/login" className="ml-4">Login</Link>
      )}
    </div>
  );
}

export default AppBar;
