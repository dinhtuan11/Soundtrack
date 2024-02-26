import { useEffect } from 'react';

const useTitle = (newTitle) => {
  useEffect(() => {
    document.title = newTitle;
  }, [newTitle]);
};

export default useTitle;