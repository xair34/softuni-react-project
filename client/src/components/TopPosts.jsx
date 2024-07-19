import React from 'react';

const topPosts = [
  { id: 1, title: 'Top Post 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, title: 'Top Post 2', content: 'Praesent non magna et neque aliquet elementum.' },
  { id: 3, title: 'Top Post 3', content: 'Nullam nec velit ut ex pretium venenatis.' }
];

export default function TopPosts() {
  return (
    <div className="top-posts-container">
      <h2>Top Posts</h2>
      <ul className="top-posts-list">
        {topPosts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
