import { Link, useParams } from 'react-router-dom';
import styles from "./ForumCategoryPosts.module.css";

const dummyTopics = {
  "announcements": [
    { topicName: "Lore Hunt Event Start!", replies: 42, views: 58 },
    { topicName: "Happy Summer Solstice! The Light Before The Dark Race Event", replies: 35, views: 75 }
  ],
  "patch-notes": [
    { topicName: "Patch 1.1.0 Released", replies: 120, views: 300 },
    { topicName: "Hotfix 1.1.1 Notes", replies: 50, views: 150 }
  ],
  "general": [
    { topicName: "Welcome to the Community!", replies: 15, views: 60 },
    { topicName: "Share Your Favorite Moments", replies: 25, views: 100 }
  ],
  "off-topic": [
    { topicName: "Favorite TV Shows", replies: 20, views: 80 },
    { topicName: "Hobbies and Interests", replies: 30, views: 120 }
  ],
  "warrior": [
    { topicName: "New Warrior Builds Discussion", replies: 45, views: 200 },
    { topicName: "Warrior Skills Guide", replies: 60, views: 250 }
  ],
  "rogue": [
    { topicName: "Rogue Stealth Tactics Discussion", replies: 40, views: 180 },
    { topicName: "Top Rogue Weapons", replies: 55, views: 220 }
  ],
  "mage": [
    { topicName: "Mage Spells and Abilities Discussion", replies: 70, views: 300 },
    { topicName: "Mage Build Ideas", replies: 80, views: 350 }
  ],
  "customer-service": [
    { topicName: "How to Contact Support", replies: 5, views: 30 },
    { topicName: "Common Support Questions", replies: 10, views: 50 }
  ],
  "bug-reports": [
    { topicName: "Bug in Quest System", replies: 25, views: 100 },
    { topicName: "Graphics Glitch", replies: 30, views: 120 }
  ]
};

export default function ForumCategoryPosts() {
  const { categoryName } = useParams();
  const topics = dummyTopics[categoryName.toLowerCase().replace(/ /g, '-')];

  return (
    <>
      <div>
        <div><Link to={`/`}>Back to Main</Link></div>

        <h3 className='capitalize'>{categoryName}</h3>
        <table className={styles["forum-topics"]}>
          <thead>
            <tr>
              <td>Topic</td>
              <td>Replies</td>
              <td>Views</td>
            </tr>
          </thead>
          <tbody>
            {topics ? topics.map((topic, index) => (
              <tr key={index}>
                <td className="topic-name">
                  <Link to={`/${categoryName}/${topic.topicName.replace(/ /g, '-')}`}>{topic.topicName}</Link>
                </td>
                <td className="replies">{topic.replies}</td>
                <td className="views">{topic.views}</td>
              </tr>
            )) : <tr><td colSpan="3">No topics available</td></tr>}
          </tbody>
        </table>

      </div>

    </>
  );
}