import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../../services/authContext';
import { uploadBytes, ref as sRef, list, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../utils/firebase';
import { set, ref, get, update } from 'firebase/database';
import { useState } from 'react';


export default function AvatarUpdate({
    onAvatarUpdate
}) {
    const { currentUserDetails } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange =(e)=>{
        setSelectedFile(e.target.files[0]);
    }

    const handleFileAdded = async (e) => {
        e.preventDefault();
        try {
            const uploadLocation = `${currentUserDetails.username}/${selectedFile.name}`
            const userAvatarRef = sRef(storage, uploadLocation);
            await uploadBytes(userAvatarRef, selectedFile);
            const newAvatarLink = await getDownloadURL(sRef(storage,uploadLocation))

            const userRefLocation = currentUserDetails.userType == 'admin' ? `/users/admins/${currentUserDetails.id}` : `/users/ordinary/${currentUserDetails.id}`;
            const userRef = ref(db, userRefLocation);
            await update(userRef, {userAvatar: newAvatarLink});
            
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
                <Form.Control type='file' accept='image/*' onChange={handleFileChange} />
                <Button variant='outline-primary' onClick={handleFileAdded} disabled={!selectedFile}>Upload</Button>
            </Form.Group>

        </>
    );
}