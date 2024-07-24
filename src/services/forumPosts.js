import { db } from '../utils/firebase.js';
import { ref, get } from "firebase/database";

export default async function GetSectionPosts(sectionPost) {
  try {
    var sectionPosts = {};
    const snapshot = await get(ref(db, `/forum-posts/${sectionPost}`));
    sectionPosts = Object.entries(snapshot.val());
  } 
  catch (error) {
    console.error('Failed to fetch forum posts:', error);
  }
}
