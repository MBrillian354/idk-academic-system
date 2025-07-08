import React from 'react';
export default ({ s }) => (
  <div>
    <h4>{s.subject}: {s.score}</h4>
    <p>{s.feedback}</p>
    <small>{new Date(s.createdAt).toLocaleDateString()}</small>
  </div>
);