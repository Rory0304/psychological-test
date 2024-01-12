import React from 'react';

const useIntersection = <Target extends HTMLElement>() => {
  const ref = React.useRef<Target>(null);
  const [isIntersect, setIsIntersect] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          console.log(entry.intersectionRatio, entry.isIntersecting);
          setIsIntersect(entry.isIntersecting);
        });
      },
      { threshold: [0] }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref.current]);

  return { ref, isIntersect };
};

export default useIntersection;
