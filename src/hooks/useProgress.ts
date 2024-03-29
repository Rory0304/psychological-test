import React from 'react';

interface UseProgressProps {
  total: number;
  count: number;
}

const useProgress = ({ count, total }: UseProgressProps) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (count > 0) {
      setProgress(Math.floor(count * (100 / total)));
    }
  }, [count, total]);

  return { progress };
};

export default useProgress;
