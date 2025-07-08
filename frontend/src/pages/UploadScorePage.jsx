import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScore } from '../store/slices/scoreSlice';

const UploadScorePage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ student: '', subject: '', score: '', feedback: '' });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addScore({ ...data, score: Number(data.score) }));
    setData({ student: '', subject: '', score: '', feedback: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload New Score</h2>
      <input
        name="student"
        placeholder="Student ID"
        value={data.student}
        onChange={handleChange}
        required
      />
      <input
        name="subject"
        placeholder="Subject"
        value={data.subject}
        onChange={handleChange}
        required
      />
      <input
        name="score"
        type="number"
        placeholder="Score"
        value={data.score}
        onChange={handleChange}
        required
      />
      <textarea
        name="feedback"
        placeholder="Feedback"
        value={data.feedback}
        onChange={handleChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadScorePage;