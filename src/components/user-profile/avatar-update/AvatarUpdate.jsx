import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../../services/authContext';
import { uploadBytes, ref as sRef, list, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../utils/firebase';
import { set, ref } from 'firebase/database';


export default function AvatarUpdate({
    onAvatarUpdate
}) {
    const { currentUserDetails } = useAuth();
    const handleFileAdded = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            const uploadLocation = `${currentUserDetails.username}/${e.target.files[0].name}`
            const userAvatarRef = sRef(storage, uploadLocation);
            const upload = await uploadBytes(userAvatarRef, file);
            const newAvatarLink = await getDownloadURL(sRef(storage,uploadLocation))

            const userRefLocation = currentUserDetails.userType == 'admin' ? `/users/admins/${currentUserDetails.id}` : `/users/ordinary/${currentUserDetails.id}`;
            const userRef = ref(db, userRefLocation);
            const newUserDetails = currentUserDetails;
            newUserDetails.userAvatar = newAvatarLink;

            await set(userRef, newUserDetails)
            onAvatarUpdate(newAvatarLink);
            
        }
        catch (error) {
            console.error(error);
        }
    }
   
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Upload new image</Form.Label>
                <Form.Control type='file' onChange={handleFileAdded} accept='image/*' />
                <Button variant='outline-primary'>Upload</Button>
            </Form.Group>

        </>
    );
}