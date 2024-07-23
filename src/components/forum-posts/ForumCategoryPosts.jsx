import { Link, useParams } from 'react-router-dom';
import styles from "./ForumCategoryPosts.module.css";
import PageNotFound from '../page-not-found/PageNotFound';
import { useEffect, useState } from 'react';
import GetSectionPosts from '../../services/forumPosts';
import { useAuth } from '../../services/authContext';
import CreateTopic from './CreateTopic';

export default function ForumCategoryPosts() {
  const { categoryName } = useParams();
  const [topics, setTopics] = useState(null);
  const [createNewTopic, setCreateNewTopic] = useState(false);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleCreateNewTopic = () => {
    setCreateNewTopic(!createNewTopic);
  }

  useEffect(() => {
    (async () => {
      try {
        var sectionPosts = await GetSectionPosts(categoryName);
        setTopics(sectionPosts);
      }
      catch (error) {
        console.error('Unable to get forum posts at this time:', error);
      }
      finally {
        setLoading(false);
      }

    })()
  }, [categoryName]);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (topics === null) {
    return <PageNotFound />;
  }

  return (
    <>
      <div>
        {currentUser ?
          <div>
            <button onClick={handleCreateNewTopic}>Add topic</button>
            {createNewTopic ? <CreateTopic categoryName={categoryName} /> : ""}
          </div>
          : ""}


        <div>
          <div><Link to={`/`}>Back to Main</Link></div>
          <h3 className='capitalize'>{categoryName}</h3>
          <table className={styles["forum-topics"]}>
            <thead>
              <tr>
                <td>Topic</td>
                <td>Replies</td>
                <td>Views</td>
              </tr>
            </thead>
            <tbody>
              {topics.length > 0 ? topics.map(([key, topic]) => (
                <tr key={key}>
                  <td className="topic-name">
                    <Link to={`/${categoryName}/${topic.topicName.replace(/ /g, '-')}`}>{topic.topicName}</Link>
                  </td>
                  <td className="replies">{topic.replies}</td>
                  <td className="views">{topic.views}</td>
                </tr>
              )) : <tr><td colSpan="3">No topics available</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
