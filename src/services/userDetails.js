import { get, ref, child } from "firebase/database";
import { db } from "../utils/firebase"; 

export default async function getUserDetails(userEmail) {
    try {
        const dbRef = ref(db);

        const ordinarySnapshot = await get(child(dbRef, 'users/ordinary'));
        const ordinaryUsers = ordinarySnapshot.exists() ? ordinarySnapshot.val() : {};

        for (const key in ordinaryUsers) {
            if (ordinaryUsers[key].email === userEmail) {
                return ordinaryUsers[key];
            }
        }


        const adminSnapshot = await get(child(dbRef, 'users/admins'));
        const adminUsers = adminSnapshot.exists() ? adminSnapshot.val() : {};


        for (const key in adminUsers) {
            if (adminUsers[key].email === userEmail) {
                return adminUsers[key];
            }
        }

        return null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}
