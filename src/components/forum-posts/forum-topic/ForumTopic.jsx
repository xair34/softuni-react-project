import { Link, useParams } from "react-router-dom";
import styles from "./ForumTopic.module.css";
import { useAuth } from "../../../services/authContext";
import { useEffect, useRef, useState } from "react";
import GetComments from "../../../services/forumPostComments";
import AddReply from "../add-reply/AddReply";

import Button from "react-bootstrap/esm/Button";
import Tooltip from 'react-bootstrap/Tooltip';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { query, ref, orderByChild, equalTo, get, update, remove } from "firebase/database";
import { db } from "../../../utils/firebase";

export default function ForumTopic() {
    const { categoryName, topicName } = useParams();
    const { currentUser, currentUserDetails } = useAuth();
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showAddNewReply, setShowAddNewReply] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [commentToDelete, setCommentToDelete] = useState(null);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');

    const handleCloseDelModal = () => setShowConfirmDeleteModal(false);
    const handleShowDelModal = (commentKey) => {
        setCommentToDelete(commentKey);
        setShowConfirmDeleteModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = (commentKey, commentText) => {
        setCommentToEdit(commentKey);
        setEditedCommentText(commentText);
        setShowEditModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleAddReply = () => {
        setShowAddNewReply(!showAddNewReply);
        handleShowModal();
    };
    const handleChildAction = (updatedComments) => {
        setComments(updatedComments);
        setShowModal(false);
    };
    const handleDeleteComment = async () => {
        console.log(topicName);
        try {
            const id_topic_name = topicName.replace(/[^a-zA-Z -]/g, "").toLowerCase();
            const postsRef = ref(db, `/forum-posts/${categoryName}`);
            const topicQuery = query(postsRef, orderByChild('id'), equalTo(id_topic_name));
            const snapshot = await get(topicQuery);

            if (snapshot.exists()) {
                const topicKey = Object.keys(snapshot.val())[0];
                const topic = snapshot.val()[topicKey];

                if (!topic.comments || !topic.comments[commentToDelete]) {
                    console.error('Comment not found');
                    setShowConfirmDeleteModal(false);
                    return;
                }

                const commentRef = ref(db, `/forum-posts/${categoryName}/${topicKey}/comments/${commentToDelete}`);
                await remove(commentRef);

                var temp_comments = await GetComments(categoryName, id_topic_name);
                setComments(temp_comments);

                console.error('Comment deleted successfully');
                setShowConfirmDeleteModal(false);
            } else {
                console.error('Topic not found');
            }
        } catch (error) {
            console.error('Failed to delete comment', error);
            setShowConfirmDeleteModal(false);
        }
    };

    const handleEditComment = async () => {
        try {
            const id_topic_name = topicName.replace(/[^a-zA-Z -]/g, "").toLowerCase();
            const postsRef = ref(db, `/forum-posts/${categoryName}`);
            const topicQuery = query(postsRef, orderByChild('id'), equalTo(id_topic_name));
            const snapshot = await get(topicQuery);

            if (snapshot.exists()) {
                const topicKey = Object.keys(snapshot.val())[0];
                const topic = snapshot.val()[topicKey];

                if (!topic.comments || !topic.comments[commentToEdit]) {
                    console.error('Comment not found');
                    setShowEditModal(false);
                    return;
                }
                const commentRef = ref(db, `/forum-posts/${categoryName}/${topicKey}/comments/${commentToEdit}`);
                await update(commentRef, { text: editedCommentText });

                var temp_comments = await GetComments(categoryName, id_topic_name);
                setComments(temp_comments);
                setShowEditModal(false);
            } else {
                console.error('Topic not found');
            }
        } catch (error) {
            console.error('Failed to edit comment', error);
            setShowEditModal(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                var id_topic_name = topicName.replace(/[^a-zA-Z0-9 -]/g, "").toLowerCase();
                var temp_comments = await GetComments(categoryName, id_topic_name);
                console.log(id_topic_name);
                setComments(temp_comments);
                setLoading(false);
                if (currentUserDetails.userType === 'admin') {
                    setIsUserAdmin(true)
                }
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
                    {currentUser ? (<Button variant="secondary" type="submit" className="btn-center m-3" onClick={handleAddReply} >Add reply</Button>) : ""}
                </div>
            </div>
            <div className={styles['topic-container']}>
               
                {comments.map(([key, comment]) => (
                    <div key={key} className={styles['topic-row']}>
                        <div>
                            <div className={styles["user-avatar-and-name"]}>
                                <img src={comment.userAvatar} alt={`${comment.userName}'s avatar`} className={styles['user-avatar-icon']} />
                                <h4>{comment.userName}</h4>
                            </div>
                            <div className={styles['user-actions']}>
                            {comment.timeOfPosting}
                            {isUserAdmin || (currentUser && comment.userName == currentUser.email.split("@")[0]) ? (
                                <>
                                    <div>
                                        {comment.userName == currentUser.email.split("@")[0] ? (
                                            <OverlayTrigger
                                                placement="right"
                                                delay={{ show: 250, hide: 50 }}
                                                overlay={
                                                    <Tooltip id={`tooltip-right`} >
                                                        Edit comment
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="outline-warning" onClick={() => handleShowEditModal(key, comment.text)}>Edit</Button>
                                            </OverlayTrigger>
                                        ) : ""}
                                    </div>
                                    <div>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 50 }}
                                            overlay={
                                                <Tooltip id={`tooltip-right`} >
                                                    Delete comment
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant="outline-danger" onClick={() => handleShowDelModal(key)}>X</Button>
                                        </OverlayTrigger>
                                    </div>
                                </>
                            ) : ""}
                        </div>

                        </div>
                        <div className={['username-and-comment']}>
                            <p>{comment.text}</p>
                        </div>


                    </div>
                ))}
                <div>
                    {showModal && currentUser && (
                        <Offcanvas show={showModal} onHide={handleCloseModal} placement="bottom" name="bottom" scroll={true} backdrop={false} className={styles["reply-post-container"]}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Type your reply here</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <AddReply commentAdded={handleChildAction} />
                            </Offcanvas.Body>
                        </Offcanvas>
                    )}
                </div>
            </div>
            <div>
                <Modal show={showConfirmDeleteModal} onHide={handleCloseDelModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>You're about to delete your comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the comment?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleDeleteComment}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control type="text" value={editedCommentText} onChange={(e) => setEditedCommentText(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEditComment}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
