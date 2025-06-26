import Layout from "@/components/common/layout";
import { createFileRoute, redirect  } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: () => {
    throw redirect({ to: "/auth/login" });
  },
});

function RouteComponent() {
  return (
    <div>
      <Layout
        user={null}
        onLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
