import { Navigate } from 'react-router';
import { type ReactNode } from 'react';

export const HasKey = ({ children }: { children: ReactNode }) => {
  const key = localStorage.getItem('publickey');
  if (key) {
    return <Navigate to="/dashboard" />;
  } else {
    return <div>{children}</div>;
  }
};
