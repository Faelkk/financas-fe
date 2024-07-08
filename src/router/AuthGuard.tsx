import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
  children: ReactNode;
}

export function AuthGuard({ isPrivate, children }: AuthGuardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { signedIn } = useAuth() as any;

  if (!signedIn && isPrivate) {
    return <Navigate to="/signin" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return children;
}
