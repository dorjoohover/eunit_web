'use client';

import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode, Suspense } from 'react';

// Define a list of libraries to load from the Google Maps API
const libraries: Libraries = ['places', 'drawing', 'geometry'];

// Define a functional component called MapProvider
interface MapProviderProps {
  children: ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries,
  });

  // Handle errors while loading Google Maps API
  if (loadError) {
    return <p style={{ color: 'red' }}>Error loading Google Maps API. Please try again later.</p>;
  }

  // Show a loading message or spinner while the API script is loading
  if (!scriptLoaded) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Map script is loading...</p>
        {/* Optional: Add a spinner here for a better UX */}
      </div>
    );
  }

  // Return the children prop wrapped by this MapProvider component
  return <>{children}</>;
}

// Optional: Wrap your MapProvider with Suspense for better error handling
export function MapProviderWithSuspense({ children }: MapProviderProps) {
  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <MapProvider>{children}</MapProvider>
    </Suspense>
  );
}
