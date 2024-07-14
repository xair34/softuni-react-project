import React, { useEffect, useState } from 'react';
import ForumSection from './ForumSection';

const baseUrl = 'http://localhost:3030/jsonstore/advanced'


export default function ForumCategories() {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(baseUrl);
                const result = await response.json();

                setSections(Object.entries(result.sections));
            } catch (error) {
                console.error("Failed to fetch sections:", error);
            }
        })();
    }, []);

    console.log(sections);

    return (
        <div className="forum-sections-container">
            <div className="sections-list">
                {sections.map(([key, section]) => (
                    <ForumSection key={key} title={section.text} name={key} />
                ))}
            </div>
        </div>
    );
}
