'use client';
import { useEffect } from 'react';

const ExternalRedirectPage = () => {
  useEffect(() => {
    // Redirect to the external page
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }, []);

  // Render nothing or a loading message while redirecting
  return null;
};

export default ExternalRedirectPage;

