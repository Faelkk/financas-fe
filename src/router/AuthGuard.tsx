import { Navigate } from "react-router-dom";
// import { useAuth } from "../app/hooks/useAuth";
import { ReactNode } from "react";

interface AuthGuardProps {
  isPrivate: boolean;
  children: ReactNode;
}

export function AuthGuard({ isPrivate, children }: AuthGuardProps) {
  //   const { signedIn } = useAuth();
  const signedIn = true;

  if (!signedIn && isPrivate) {
    return <Navigate to="/signin" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return children;
}
