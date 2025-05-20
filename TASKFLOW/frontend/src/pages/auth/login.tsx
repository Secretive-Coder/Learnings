import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { Route as RootRoute } from "../__root";

import Login from "@/components/common/login";

type User = {
  email: string;
  name: string;
  avatar: string;
};

type RootContext = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

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
    <div className="fixed inset-0 flex items-center bg-black bg-opacity-50">
      <Login
        onSubmit={handleLogin}
        onSwitchMode={() => navigate({ to: "/auth/signup" })}
      />
    </div>
  );
}
