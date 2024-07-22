import { db } from '../utils/firebase.js';
import { ref, get } from "firebase/database";

export default async function GetSectionPosts(sectionPost) {
  try {
    const snapshot = await get(ref(db, `/forum-posts/${sectionPost}`));
    if (snapshot.exists()) {
      return Object.entries(snapshot.val());
    } else {
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch forum posts:', error);
    return [];
  }
}
