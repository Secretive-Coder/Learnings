import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { Route as RootRoute } from "../__root";
import Login from "@/components/common/login";
import type { RootContext } from "@/config/types";

export const Route = createFileRoute("/auth/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const { setCurrentUser } = useRouteContext({
    from: RootRoute.id,
  }) as RootContext;

  const handleLogin = (data: { email: string; name?: string }) => {
    const user = {
      email: data.email,
      name: data.name || "User",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || "User")}&background=random`,
    };
    setCurrentUser(user);
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Login
        onSubmit={handleLogin}
        onSwitchMode={() => navigate({ to: "/auth/signup" })}
      />
    </div>
  );
}
