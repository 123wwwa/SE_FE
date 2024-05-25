import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await axios.get(`http://localhost:8080/quotes/${id}`);
      setQuote(response.data);
    };
    fetchQuote();
  }, [id]);

  if (!quote) return <div>Loading...</div>;

  return (
    <div>
      <p>{quote.line}</p>
      <p>{quote.actor}</p>
      <p>{quote.movie}</p>
      <p>{quote.tags.join(', ')}</p>
      <p>좋아요: {quote.favoriteCount}</p>
      <img src={quote.image} alt={quote.movie} />
    </div>
  );
}

export default QuoteDetailPage;
