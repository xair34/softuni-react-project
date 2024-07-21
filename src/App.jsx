import { Router, Routes, Route } from 'react-router-dom';
import ForumSections from './components/forum-sections/ForumSections';
import './App.css';
import NavigationMenu from './components/navigation/NavigationMenu';
import ForumCategoryPosts from './components/forum-posts/ForumCategoryPosts';
import ForumTopic from './components/forum-posts/ForumTopic';
import Login from './components/login/Login';
import Register from './components/register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { AuthProvider } from './services/authContext';
import UserProfile from './components/user-profile/UserProfile';
import PageNotFound from './components/page-not-found/PageNotFound';
function App() {
  return (
    <AuthProvider>
      <div className='app-container'>
        <div className="navigation">
          <NavigationMenu />
        </div>
        <div className="app-content">
          <Container>
            <Row>
              <Routes>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/:categoryName" element={<ForumCategoryPosts />} />
                <Route path="/" element={<ForumSections />} />
                <Route path="/:categoryName/:topicName" element={<ForumTopic />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<UserProfile/>}/>
              </Routes>
            </Row>
          </Container>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;