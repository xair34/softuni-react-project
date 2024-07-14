export default function ForumTopic({
    topicName,
    replies,
    views
}) {
    return (
        <tr className="topic-row">
            <td className="topic-name">{topicName}</td>
            <td className="replies">{replies}</td>
            <td className="views">{views}</td>
        </tr>
    );
}