import React, { useState } from 'react';
import VotingBoard from './VotingBoard';
import UploadLine from './UploadLine';

const Board: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleUploadSuccess = () => {
    setRefreshKey(Date.now()); // 타임스탬프를 사용하여 고유한 key 값 생성
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <VotingBoard key={refreshKey} />
      <UploadLine onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default Board;