import { Link, useParams } from "react-router-dom";
import styles from "./ForumTopic.module.css";
import { useAuth } from "../../../services/authContext";
import { useEffect, useState } from "react";
import GetComments from "../../../services/forumPostComments";
import { db } from "../../../utils/firebase";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";

export default function ForumTopic() {
    const { categoryName, topicName } = useParams();
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        (async () => {
            try {
                var id_topic_name = topicName.replace(/[^a-zA-Z -]/g, "").toLowerCase();
                var temp_comments = await GetComments(categoryName, id_topic_name);
                setComments(temp_comments);
                console.log(temp_comments)
                setLoading(false);
            }
            catch (error) {
                console.error('Unable to fetch comments at this time:', error);
            }

        })()
    }, [categoryName,topicName]);
    if (loading) {
        return <h3>Loading...</h3>
    }
    if (!comments) {
        return <h1>There are no posts yet</h1>
    }
    return (
        <div>
            <div>  <Link to={`/${categoryName}`} className='link-name'>Back to {categoryName}</Link></div>
            <h3>{topicName.replace(/-/g, ' ')}</h3>
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
                            time of posting
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
