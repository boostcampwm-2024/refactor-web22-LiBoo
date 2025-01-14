import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

interface AsyncBoundaryProps {
  pendingFallback: React.ReactNode;
  rejectedFallback: (error: Error) => React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

const DEFAULT_DELAY = 1000;

export const AsyncBoundary = forwardRef<any, AsyncBoundaryProps>(
  ({ pendingFallback, rejectedFallback, children, delay = DEFAULT_DELAY }, ref) => {
    // error 추후에 작업예정
    const [showPendingFallback, setShowPendingFallback] = useState(delay === DEFAULT_DELAY);
    const [, setError] = useState<Error | null>(null);

    // Use `useImperativeHandle` to expose a `reset` method to parent component
    useImperativeHandle(ref, () => ({
      reset: () => setError(null)
    }));

    useEffect(() => {
      if (delay > DEFAULT_DELAY) {
        const timer = setTimeout(() => {
          setShowPendingFallback(true);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [delay]);

    const handleError = (error: Error) => {
      setError(error);
    };

    return (
      <ErrorBoundary
        FallbackComponent={({ error }) => rejectedFallback(error)}
        onError={handleError}
      >
        {showPendingFallback ? (
          <Suspense fallback={pendingFallback}>{children}</Suspense>
        ) : (
          <>{children}</>
        )}
      </ErrorBoundary>
    );
  }
);

AsyncBoundary.displayName = 'AsyncBoundary';
