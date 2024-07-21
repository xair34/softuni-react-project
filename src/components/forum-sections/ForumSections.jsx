import React, { useEffect, useState } from 'react';
import ForumSection from './ForumSection';
import GetSections from '../../services/sectionService.js';
export default function ForumCategories() {
    const [sections, setSections] = useState([]);
    useEffect(() => {
        (async ()=>{
            var temp = await GetSections();
            setSections(temp);
        })()
    },[])
    return (
        <div className="forum-sections-container">
            <div className="sections-list">
                {sections.map(([key, section]) => (
                    <ForumSection key={key} title={section.name} name={key} subsections={section.subsections} />
                ))}
            </div>
        </div>
    );
}
