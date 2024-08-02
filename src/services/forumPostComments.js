import { db } from '../utils/firebase.js';
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

export default async function GetComments(categoryName, topicName) {
    try {
        const id_topic_name = topicName.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
        const postsRef = ref(db, `/forum-posts/${categoryName}`);
        const topicQuery = query(postsRef, orderByChild('id'), equalTo(id_topic_name));
        const snapshot = await get(topicQuery);

        if (snapshot.exists()) {
            const topicData = snapshot.val();
            const topicKey = Object.keys(topicData)[0];
            const comments = topicData[topicKey]?.comments;

            if (comments) {
                return Object.entries(comments);
            } else {
                console.log('No comments found for this topic');
                return [];
            }
        } else {
            console.log('Topic not found');
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        return [];
    }
}
