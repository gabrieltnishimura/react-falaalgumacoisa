import React, { useEffect } from 'react';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';

function LeaderboardPage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  useEffect(() => {
    setLoading(false);
  });

  return (
    <div>
      <h1>Ranking</h1>
    </div>
  );
}

export default LeaderboardPage;