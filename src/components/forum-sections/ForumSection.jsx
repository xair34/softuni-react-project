import React from 'react';
import ForumCategories from './ForumCategories';
import styles from './ForumSection.module.css';

export default function ForumSection({
  name,
  title,
  subsections
}) {
  return (
    <div className={styles['forum-section']}>
      <h3>{title}</h3>
      <div className={styles['categories-list']}>
        {subsections.map(subsection => (
          <ForumCategories
            key={subsection.name}
            icon={subsection.icon}
            description={subsection.description}
            title={subsection.name}
          />
        ))}
      </div>
    </div>
  );
}
