
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ForumSections from './components/forum-sections/ForumSections'
import TopPosts from './components/TopPosts'
import './App.css'
import NavigationMenu from './components/navigation/NavigationMenu'
import ForumCategoryPosts from './components/forum-posts/ForumCategoryPosts'


function App() {
  
  return (
    <>
      <ForumCategoryPosts/>
      <div className='app-container'>
        <div className="navigation">
          <NavigationMenu />
        </div>
        <div className="app-content">
          <div className="forum-section">
            <ForumSections />
          </div>
          <div className='top-posts'>
            <TopPosts />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
