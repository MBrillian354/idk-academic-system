import React from 'react';

const ScoreItem = ({ score }) => (
  <div className="score-item">
    <h4>{score.subject}: {score.score}</h4>
    <p>{score.feedback}</p>
    <small>{new Date(score.createdAt).toLocaleDateString()}</small>
  </div>
);

export default ScoreItem;