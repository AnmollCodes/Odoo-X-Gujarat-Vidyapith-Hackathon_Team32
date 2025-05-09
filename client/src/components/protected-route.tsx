import { useAuth } from "@/hooks/use-auth";
import { Redirect, Route, RouteProps } from "wouter";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {(params) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading...</span>
            </div>
          );
        }

        if (!user) {
          return <Redirect to="/sign-in" />;
        }

        return <Component {...params} />;
      }}
    </Route>
  );
}