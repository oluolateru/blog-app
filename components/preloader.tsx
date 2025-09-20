"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide preloader after content loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated logo/spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin border-t-primary"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-accent opacity-20"></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Blog App
          </h2>
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading amazing content...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <p className="text-xs text-muted-foreground font-mono">
          {Math.round(Math.min(progress, 100))}%
        </p>
      </div>
    </div>
  );
}
