import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TitleGame: React.FC = () => {
  const [quote, setQuote] = useState<any>(null);
  const [guess, setGuess] = useState('');
  const [time, setTime] = useState(30);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchQuote = async () => {
    const response = await axios.get('http://localhost:8080/game/titlefromline/problems', {
      params: { count: 1 }
    });
    setQuote(response.data.data[0]);
    setGuess('');
    setTime(30);
    setIsCorrect(null);
    setShowAnswer(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setIsCorrect(false);
          setShowAnswer(true);
          setTimeout(fetchQuote, 3000);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === quote.title.toLowerCase()) {
      setIsCorrect(true);
      setTimeout(fetchQuote, 2000);
    } else {
      setIsCorrect(false);
      setShowAnswer(true);
      setTimeout(fetchQuote, 3000);
    }
  };

  if (!quote) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <p className="text-xl font-semibold mb-4">{quote.line}</p>
        <input 
          type="text" 
          value={guess} 
          onChange={(e) => setGuess(e.target.value)} 
          placeholder="영화 이름을 맞추세요" 
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleGuess}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          확인
        </button>
        <p className="mt-4 text-gray-700">남은 시간: {time}초</p>
        {isCorrect !== null && (
          <p className={`mt-4 text-lg ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? '정답입니다!' : '틀렸습니다!'}
          </p>
        )}
        {showAnswer && !isCorrect && (
          <p className="mt-2 text-gray-700">정답: {quote.title}</p>
        )}
      </div>
    </div>
  );
}

export default TitleGame;
