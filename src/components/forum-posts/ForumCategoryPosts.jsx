import { Link, useParams } from 'react-router-dom';
import styles from "./ForumCategoryPosts.module.css";
import PageNotFound from '../page-not-found/PageNotFound';
import { useEffect, useState } from 'react';
import GetSectionPosts from '../../services/forumPosts';

export default function ForumCategoryPosts() {
  const { categoryName } = useParams();
  const [topics, setTopics] = useState(null); // Adjust initial state

  useEffect(() => {
    (async () => {
      var temp = await GetSectionPosts(categoryName);
      setTopics(temp);
    })()
  }, [categoryName]); // Include categoryName as a dependency

  console.log(categoryName);
  console.log(topics);

  if (topics === null) {
    return <PageNotFound />;
  }

  return (
    <>
      {topics ? (
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
      ) : (<h3>Loading...</h3>)}
    </>
  );
}
