import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { Route as RootRoute } from "../__root";

import SignUp from "@/components/common/signup";
import type { RootContext } from "@/config/types";


export type SignUpProps = {
  onSwitchMode?: () => void;
  onSubmit?: (data: { email: string; name?: string }) => void;
};

export const Route = createFileRoute("/auth/signup")({
  component: SignupComponent,
});

export default function SignupComponent() {
  const navigate = useNavigate();
  const { setCurrentUser } = useRouteContext({
    from: RootRoute.id,
  }) as RootContext;

  const handleSignup = (data: { email: string; name?: string }) => {
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
      <SignUp
        onSubmit={handleSignup}
        onSwitchMode={() => navigate({ to: "/auth/login" })}
      />
    </div>
  );
}
