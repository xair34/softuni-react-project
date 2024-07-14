import ForumTopic from "./ForumTopic";
import styles from "./ForumCategoryPosts.module.css"
export default function ForumCategoryPosts() {
    return (
        <>
            <table className={styles["forum-topics"]}>
                <thead>
                    <tr>
                        <td>Topic</td>
                        <td>Replies</td>
                        <td>Views</td>
                    </tr>
                </thead>
                <tbody>
                    <ForumTopic topicName={'Lore Hunt Event Start! '} replies={42} views={58}/>
                    <ForumTopic topicName={'Happy Summer Solstice! The Light Before The Dark Race Event'} replies={42} views={58}/>
                </tbody>
            </table>
        </>
    );
}