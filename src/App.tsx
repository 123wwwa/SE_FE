import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar';
import MainPage from './pages/MainPage';
import QuoteDetailPage from './pages/QuoteDetailPage';
import ProfilePage from './pages/ProfilePage';
import DiscussionBoard from './pages/DiscussionBoard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';
import TitleGame from './pages/Game/TitleGame';
import ActorGame from './pages/Game/ActorGame';
import UploadLine from './pages/UploadLine';
import VotingBoard from './pages/Board/VotingBoard';
import Board from './pages/Board';


const App: React.FC = () => {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/quote/:id" element={<QuoteDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/discussion" element={<DiscussionBoard />} />
        <Route path="/game/title" element={<TitleGame />} />
        <Route path="/game/actor" element={<ActorGame />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="board" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
