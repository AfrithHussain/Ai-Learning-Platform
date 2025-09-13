// hooks/use-media-query.js
"use client";

import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for server-side rendering)
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Update state on initial check
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Create a listener for changes
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    // Cleanup the listener on component unmount
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}