
import React from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!localStorage.getItem("sb-access-token")) {
    window.location.href = "/auth";
  }

  return children;
}
