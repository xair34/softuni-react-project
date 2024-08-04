import { Link, useParams } from 'react-router-dom';
import styles from "./ForumCategoryPosts.module.css";
import PageNotFound from '../../page-not-found/PageNotFound';
import { useEffect, useState } from 'react';
import GetSectionPosts from '../../../services/forumPosts';
import { useAuth } from '../../../services/authContext';
import CreateTopic from '../create-topic/CreateTopic';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { equalTo, get, orderByChild, query, ref, remove } from 'firebase/database';
import { db } from '../../../utils/firebase';
import getSectionPosts from '../../../services/forumPosts';

export default function ForumCategoryPosts() {
  const { categoryName } = useParams();
  const [topics, setTopics] = useState(null);
  const [createNewTopic, setCreateNewTopic] = useState(false);
  const { currentUser, currentUserDetails } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const handleCloseDelModal = () => setShowConfirmDeleteModal(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [postToDeleteTitle, setPostToDeleteTitle] = useState(null);
  const handleShowDelModal = (postId, postName) => {
    setPostToDelete(postId);
    setPostToDeleteTitle(postName);
    setShowConfirmDeleteModal(true);
  };


  const fetchTopics = async () => {
    setLoading(true);
    try {
      const sectionPosts = await GetSectionPosts(categoryName);
      setTopics(sectionPosts);
    } catch (error) {
      console.error('Unable to get forum posts at this time:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateNewTopic = () => {
    setCreateNewTopic(!createNewTopic);
  }

  const handleTopicCreated = () => {
    fetchTopics();
  };

  const handleDeletePost = async () => {
    try {
      const postRef = ref(db, `/forum-posts/${categoryName}/${postToDelete}`);
      await remove(postRef);
      const temp_topics = await getSectionPosts(categoryName);
      setTopics(temp_topics);
      handleCloseDelModal(true);
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTopics();
    console.log('effect')
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
        {currentUser && (
          <div>
            <Button variant='secondary' onClick={handleCreateNewTopic}>Add topic</Button>
            {createNewTopic && <CreateTopic categoryName={categoryName} onTopicCreated={handleTopicCreated} />}
          </div>
        )}
        <div>
          <div><Link to={`/`}>Back to Main</Link></div>
          <h3 className='capitalize'>{categoryName}</h3>
          {topics.length > 0 ? (
              <table className={styles["forum-topics"]}>
              <thead>
                <tr>
                  <td>Topic</td>
                  <td>Replies</td>
                  <td>Owner</td>
                </tr>
              </thead>
              <tbody>
                {topics.map(([key, topic]) => (
                  <tr key={key}>
                    <td className="topic-name">
                      <Link to={`/${categoryName}/${topic.topicName.replace(/ /g, '-')}`}>{topic.topicName}</Link>
                    </td>
                    <td className="replies">{topic.comments ? Object.entries(topic.comments).length : 0}</td>
                    <td className="views">{topic.owner}</td>
                    {currentUserDetails.userType == 'admin' ? (
                      <td className='user-actions'>
                        <Button variant='outline-danger' onClick={() => handleShowDelModal(key, topic.topicName)}>X</Button>
                      </td>
                    ) : ""}
                  </tr>
                ))}
              </tbody>
            </table>
          ): (<h3>No topics available</h3>)}
        </div>
        <div>
          <Modal show={showConfirmDeleteModal} onHide={handleCloseDelModal}>
            <Modal.Header closeButton>
              <Modal.Title>You're about to delete a topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete - {postToDeleteTitle}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelModal}>
                Close
              </Button>
              <Button variant="outline-danger" onClick={handleDeletePost}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
