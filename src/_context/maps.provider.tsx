"use client";

import { Loading } from "@/app/loading";
import { Center, Loader } from "@mantine/core";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode, Suspense } from "react";

// Define a list of libraries to load from the Google Maps API
const libraries: Libraries = ["places", "drawing", "geometry"];

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
    return (
      <p style={{ color: "red" }}>
        Error loading Google Maps API. Please try again later.
      </p>
    );
  }

  // Show a loading message or spinner while the API script is loading
  if (!scriptLoaded) {
    return (
      <Center h={"100vh"}>
        <Loader type="ring" />
      </Center>
    );
  }

  // Return the children prop wrapped by this MapProvider component
  return <>{children}</>;
}

// Optional: Wrap your MapProvider with Suspense for better error handling
export function MapProviderWithSuspense({ children }: MapProviderProps) {
  return (
    <Suspense fallback={<Loader type="ring" color="red" />}>
      <MapProvider>{children}</MapProvider>
    </Suspense>
  );
}
