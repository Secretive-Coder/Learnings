import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RootContext, User } from "@/config/types";
import { useState } from "react";

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootComponent,
});

export function RootComponent() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
