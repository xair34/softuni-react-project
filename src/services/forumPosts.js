import { db } from '../utils/firebase.js';
import { ref, get } from "firebase/database";

export default async function getSectionPosts(sectionPost) {
  try {
    var sectionPosts = {};
    const snapshot = await get(ref(db, `/forum-posts/${sectionPost}`));

    if(snapshot.exists()){
      sectionPosts = Object.entries(snapshot.val());
    }
    return sectionPosts ;
  }
  catch (error) {
    console.error('Failed to fetch forum posts:', error);
  }
}
