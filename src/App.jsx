import { Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './services/authContext';
import { ProtectedRoutes, PublicRoutes } from './utils/RouteGuard';

import Login from './components/login/Login';
import Register from './components/register/Register';
import ForumTopic from './components/forum-posts/forum-topic/ForumTopic';
import UserProfile from './components/user-profile/UserProfile';
import ForumSections from './components/forum-sections/ForumSections';
import PageNotFound from './components/page-not-found/PageNotFound';
import NavigationMenu from './components/navigation/NavigationMenu';
import ForumCategoryPosts from './components/forum-posts/forum-category-posts/ForumCategoryPosts';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
                <Route element={<ProtectedRoutes />}>
                  <Route path="/profile" element={<UserProfile />} />
                </Route>
                <Route element={<PublicRoutes />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/" element={<ForumSections />} />
                <Route path="/:categoryName" element={<ForumCategoryPosts />} />
                <Route path="/:categoryName/:topicName" element={<ForumTopic />} />
                
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Row>
          </Container>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;