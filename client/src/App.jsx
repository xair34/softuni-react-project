import { Router, Routes, Route } from 'react-router-dom';
import ForumSections from './components/forum-sections/ForumSections';
import './App.css';
import NavigationMenu from './components/navigation/NavigationMenu';
import ForumCategoryPosts from './components/forum-posts/ForumCategoryPosts';
import ForumTopic from './components/forum-posts/ForumTopic';



function App() {
  return (
    <div className='app-container'>
      <div className="navigation">
        <NavigationMenu />
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<ForumSections />} />
          <Route path="/:categoryName" element={<ForumCategoryPosts />} />
          <Route path="/:categoryName/:topicName" element={<ForumTopic />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;