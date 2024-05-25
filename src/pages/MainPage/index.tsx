import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80 text-center space-y-4">
        <h1 className="text-2xl font-semibold mb-6">Welcome to Movie Quotes</h1>
        <Link to="/board" className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          명대사 게시판
        </Link>
        <Link to="/game/actor" className="block w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          명대사 배우 게임
        </Link>
        <Link to="/game/title" className="block w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
          명대사 영화 제목 게임
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
