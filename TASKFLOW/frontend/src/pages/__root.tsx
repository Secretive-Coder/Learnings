import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 p-2"></div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
