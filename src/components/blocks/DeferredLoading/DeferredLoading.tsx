import React from 'react';

interface DeferredLoadingProps {
  timedOut: number;
  children: React.ReactNode;
}

const DeferredLoading: React.FC<DeferredLoadingProps> = ({
  timedOut,
  children,
}) => {
  const [isDeferred, setIsDeferred] = React.useState(false);

  // timedOut 시간 지난 이후, 컴포넌트 로딩
  React.useEffect(() => {
    const checkTimeOut = setTimeout(() => {
      setIsDeferred(true);
    }, timedOut);

    return () => clearTimeout(checkTimeOut);
  }, []);

  if (!isDeferred) return null;
  return <>{children}</>;
};

export default DeferredLoading;
