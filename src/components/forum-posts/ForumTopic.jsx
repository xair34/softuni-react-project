import { Link, useParams } from "react-router-dom";
import styles from "./ForumTopic.module.css";

export default function ForumTopic() {
    const { categoryName, topicName } = useParams();
    const dummyComments = [
        { username: 'xair34', comment: 'asfklasdkljghjlkajsdgasdg', avatarIcon: 'https://forum.lastepoch.com/uploads/default/original/1X/d160f95b987020dfc973fa21bd48f4fa884552f0.png' },
        { username: '123aqsfdsdf', comment: 'zxcvzxcbzcxbvzxcb', avatarIcon: 'https://forum.lastepoch.com/uploads/default/original/1X/d160f95b987020dfc973fa21bd48f4fa884552f0.png' },
        { username: 'xai1231', comment: 'zxcvzxcvzxcvzxcvzx', avatarIcon: 'https://forum.lastepoch.com/uploads/default/original/1X/d160f95b987020dfc973fa21bd48f4fa884552f0.png' }
    ];

    return (
        <>
            <div>
                <div>  <Link to={`/${categoryName}`} className='link-name'>Back to {categoryName}</Link></div>
                <h3>{topicName.replace(/-/g, ' ')}</h3>
                <div className={styles['topic-container']}>
                    {dummyComments.map((comment, index) => (
                        <div key={index} className={styles['topic-row']}>
                            <img src={comment.avatarIcon} alt={`${comment.username}'s avatar`} className={styles['user-avatar-icon']} />
                            <div className={['username-and-comment']}>
                                <h4>{comment.username}</h4>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
