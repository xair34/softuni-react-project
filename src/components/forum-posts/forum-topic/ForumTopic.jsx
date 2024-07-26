import { Link, useParams } from "react-router-dom";
import styles from "./ForumTopic.module.css";
import { useAuth } from "../../../services/authContext";
import { useEffect, useRef, useState } from "react";
import GetComments from "../../../services/forumPostComments";
import AddReply from "../add-reply/AddReply";

import Button from "react-bootstrap/esm/Button";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';


export default function ForumTopic() {
    const { categoryName, topicName } = useParams();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddNewReply, setShowAddNewReply] = useState(false);

    const [userMessage, setUserMessage] = useState('');

    const { currentUser } = useAuth();
    const target = useRef(null)
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        setShowModal(true)
        showAddNewReply
    };
    const handleAddReply = () => {
        setShowAddNewReply(!showAddNewReply);
        handleShowModal();
        if (!currentUser) {
            setShowPopup(true);
            setUserMessage('You need to be logged in to be able to post a reply');
            setTimeout(() => {
                setShowPopup(false)
            }, 2000);
        }
    }


    useEffect(() => {
        (async () => {
            try {
                var id_topic_name = topicName.replace(/[^a-zA-Z -]/g, "").toLowerCase();
                var temp_comments = await GetComments(categoryName, id_topic_name);
                setComments(temp_comments);
                setLoading(false);
            }
            catch (error) {
                console.error('Unable to fetch comments at this time:', error);
            }

        })()
    }, [categoryName, topicName]);
    if (loading) {
        return <h3>Loading...</h3>
    }
    if (!comments) {
        return <h1>There are no posts yet</h1>
    }
    return (
        <div>
            <div>  <Link to={`/${categoryName}`} className='link-name'>Back to {categoryName}</Link></div>
            <div className={styles['topic-name-and-reply-button-container']}>
                <h3>{topicName.replace(/-/g, ' ')}</h3>
                <div className={styles["tooltip-container"]} >
                    <Button variant="secondary" type="submit" className="btn-center m-3" onClick={handleAddReply} ref={target} >Add reply</Button>
                    <Overlay target={target.current} show={showPopup} placement="right">
                        {(props) => (
                            <Tooltip id="overlay-example" {...props}>
                                {userMessage}
                            </Tooltip>
                        )}
                    </Overlay>
                </div>
            </div>
            <div className={styles['topic-container']}>
                {comments.map(([key, comment]) => (
                    <div key={key} className={styles['topic-row']}>
                        <div className={styles["user-avatar-and-name"]}>
                            <img src={comment.userAvatar} alt={`${comment.userName}'s avatar`} className={styles['user-avatar-icon']} />
                            <h4>{comment.userName}</h4>
                        </div>
                        <div className={['username-and-comment']}>
                            <p>{comment.text}</p>
                        </div>
                        <div>
                            Posted: {comment.timeOfPosting}
                        </div>
                    </div>
                ))}
                <div>
                    {showModal && currentUser &&  (
                        <Offcanvas show={showModal} onHide={handleCloseModal} placement="bottom" name="bottom" scroll={true} backdrop={false} className={styles["reply-post-container"]}>
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title>Type your reply here</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <AddReply/>
                        </Offcanvas.Body>
                      </Offcanvas>
                    )}
                </div>
            </div>

        </div>
    );
}
