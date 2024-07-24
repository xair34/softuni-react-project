import { db } from '../utils/firebase.js';
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

export default async function GetComments(categoryName, topicName){
    try{
        var comments = {};
        const postsRef = ref(db, `/forum-posts/${categoryName}`);
        const topicQuery = query(postsRef, orderByChild('id'), equalTo(topicName));
        const snapshot = await get(topicQuery);
        comments = Object.entries(snapshot.val()[0].comments);
        return comments;
    }
    catch(error){
        console.error('Failed to fetch comments:', error);
    }
}