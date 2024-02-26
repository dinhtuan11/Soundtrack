import { useEffect } from 'react';


export function useOnClickOutside(
    ref ,
    exclusionRef,
    handler
) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                exclusionRef.current !== event.target
              ) {
                handler(event);
              }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        // Unbind the event listener on cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, handler, exclusionRef]);
}

export default useOnClickOutside;
