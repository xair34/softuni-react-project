import React from 'react';
import ForumCategories from './ForumCategories';
import styles from './ForumSection.module.css'; 
export default function ForumSection({
    name,
    title
}) {
    const categoryDetails = {
        dev: [
            { title: 'Announcments', description: 'Read official updates for War in the Chaos Realm, including game news, upcoming events and developer messages.', icon: 'https://forum.lastepoch.com/uploads/default/original/1X/dd8782b11cf2a0f9b50efa0a7025b39f3619ef77.png' },
            { title: 'News', description: 'Read the lastes news for War in the Chaos Realm, including upcoming game updates and developer messages', icon: 'https://forum.lastepoch.com/uploads/default/original/2X/f/f126f9d24836c2a6edd6c370a3d35acfb42cbea6.png' }
        ],
        community: [
            { title: 'General', description: 'For discussion about Last Epoch and Eleventh Hour Games.', icon: 'https://forum.lastepoch.com/uploads/default/original/1X/8f23217716fcdb92c8d66087d43c9d874e4edcac.png' }
        ],
        classes: [
            { title: 'Warrior', description: 'For discussing the warrior classes, its mastery classes with the community. Please post feedback in Feedback and Suggestions.', icon: 'https://forum.lastepoch.com/uploads/default/original/1X/d160f95b987020dfc973fa21bd48f4fa884552f0.png' }
        ],
        support: [
            { title: 'Customer Service', description: 'Please use this section for Customer Service issues.', icon: 'https://forum.lastepoch.com/uploads/default/original/1X/ae4931b44e04d656f709a8eb68c6d31b0f58349a.png' }
        ]
    }[name];

    return (
        <div className={styles['forum-section']}>
            <h3>{title}</h3>
            <div className={styles['categories-list']}>
                {categoryDetails.map(category => (
                    <ForumCategories
                        key={category.title}
                        {...category}
                    />
                ))}
            </div>
        </div>
    );
}
