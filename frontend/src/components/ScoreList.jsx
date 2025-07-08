import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScores } from '../store/slices/scoreSlice';
import ScoreItem from './ScoreItem';

const ScoreList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.scores);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchScores({ page, limit: 5 }));
  }, [dispatch, page]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {list.map(score => <ScoreItem key={score._id} score={score} />)}
      <button onClick={() => setPage(prev => prev + 1)}>Load More</button>
    </div>
  );
};

export default ScoreList;