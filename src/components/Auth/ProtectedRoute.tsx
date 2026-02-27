import { Navigate } from 'react-router';
import { type ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isPublickey = sessionStorage.getItem('publickey');
  if (isPublickey == null) {
    return <Navigate to="/" />;
  } else {
    return <div>{children}</div>;
  }
};
