
import styles from './ForumCategories.module.css'; 
export default function ForumCategories({
    title,
    description,
    icon }) {
    return (
        <div className={styles["forum-section"]}>
            <div className={styles['forum-section-icon']}><img src={icon} alt={`${title} section image`} /></div>
            <div className={styles['forum-section-content']}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            {/* Add links or buttons for each section if needed */}
        </div>
    );
}