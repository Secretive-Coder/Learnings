import Layout from "@/components/common/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Welcome to Taskflow!
      <Layout user={null} onLogout={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
}
