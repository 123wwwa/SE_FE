import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const [name, setName] = useState('');
  const [myQuote, setMyQuote] = useState('');

  const handleSave = async () => {
    await axios.post('http://localhost:8080/api/profile', { name, myQuote });
    alert('프로필 저장 완료');
  };

  return (
    <div>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="이름" 
      />
      <textarea 
        value={myQuote} 
        onChange={(e) => setMyQuote(e.target.value)} 
        placeholder="나만의 명대사" 
      />
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default ProfilePage;
