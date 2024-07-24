import { db } from '.././utils/firebase.js';
import { ref, set, onValue, get } from "firebase/database";


export default async function GetSections() {
    try {
        var sections = {};
        const snapshot = await get(ref(db, '/sections'));
        sections = Object.entries(snapshot.val()).sort((a, b) => a[1].displayOrder - b[1].displayOrder);
        return sections;
    } catch (error) {
        console.error("Failed to fetch sections:", error);
    }
}
