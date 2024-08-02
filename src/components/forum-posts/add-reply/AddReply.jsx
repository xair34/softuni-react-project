import { useState } from "react";
import { useAuth } from "../../../services/authContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import { db } from '../../../utils/firebase';
import { ref, orderByChild, equalTo, query, get, update } from 'firebase/database';
import {getCurrentFormattedDate} from '../../../utils/dateFormatter';


export default function AddReply({
    commentAdded
}) {
    const [reply, setReply] = useState('');
    const {currentUser} = useAuth();
    const {categoryName, topicName} = useParams();
    const currentDate = getCurrentFormattedDate();
    const handleReplyText = (e) =>{
        setReply(e.currentTarget.value);
    }
    
    const handleReplySubmit = async (e) =>{
        e.preventDefault();
        try{
            const id_topic_name = topicName.replace(/[^a-zA-Z -]/g, "").toLowerCase();
            const postsRef = ref(db, `/forum-posts/${categoryName}`);
            const topicQuery = query(postsRef, orderByChild('id'), equalTo(id_topic_name));

            const snapshot = await get(topicQuery);

            if(snapshot.exists()){
                const topicKey = Object.keys(snapshot.val())[0];
                const topic = snapshot.val()[topicKey];
                const current_user_username = currentUser.email.split("@")[0];
                const current_user_comment = {
                    text: reply,
                    timeOfPosting: currentDate,
                    userAvatar: "https://forum.lastepoch.com/uploads/default/original/1X/d160f95b987020dfc973fa21bd48f4fa884552f0.png",
                    userName: current_user_username
                }
                if(!topic.comments){
                    topic.comments = [];
                }
                topic.comments.push(current_user_comment)
                const topicRef = ref(db, `/forum-posts/${categoryName}/${topicKey}`)

                await update(topicRef,{comments: topic.comments});
                commentAdded(Object.entries(topic.comments));
                setReply('');
            }
            
        }
        catch(error){
            console.error("Failed to post comment", error);
        }
    }



    
    return (
        <Form className="form reply-form" >
            <Form.Group className="mb-3" controlId="">
                <Form.Control type="text" placeholder="Start typing here" required onChange={handleReplyText} value={reply}/>
            </Form.Group>
            
            <Button variant="secondary" type="submit" className="btn-center m-3" onClick={handleReplySubmit}>
                Reply
            </Button>
        </Form>
    );
}