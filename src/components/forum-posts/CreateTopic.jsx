import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../../utils/firebase';
import { ref, push } from 'firebase/database';
export default function CreateTopic({
    categoryName
}) {
    const [topicTitle, setTopicTitle] = useState('');
    const [topicText, setTopicText] = useState('');
    const handleTopicTitle = (e) => {
        setTopicTitle(e.currentTarget.value);
    }
    const handleTopicText = (e) => {
        setTopicText(e.currentTarget.value);
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const newTopicRef = ref(db, `forum-posts/${categoryName}`);
            await push(newTopicRef, {
                topicName,
                topicText,
                replies: 0,
                views: 0,
            })
            setTopicTitle('');
            setTopicText('');

        }
        catch (error) {
            console.error('Failed to create topic', error);
        }
    }

    return (
        <Form className="form register-form" >
            <Form.Group className="mb-3" controlId="topic-title">
                <Form.Label>What is the title of the topic</Form.Label>
                <Form.Control type="text" placeholder="Topic name" required onChange={handleTopicTitle} value={topicTitle} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="topic-name">
                <Form.Label>Topic text</Form.Label>
                <Form.Control type="text" placeholder="Topic text" required onChange={handleTopicText} value={topicText} />

            </Form.Group>
            <Button variant="secondary" type="submit" className="btn-center m-3" onClick={handleCreate}>
                Create
            </Button>
        </Form>
    );
}