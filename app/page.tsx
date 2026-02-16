import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { TaskDashboard } from "@/features/tasks/components/TaskDashboard";
import { getTasksAction } from "@/features/tasks/actions";
import { AppHeader } from "@/components/AppHeader";
import { ClientSessionGuard } from "@/components/ClientSessionGuard";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const tasks = await getTasksAction();

  return (
    <ClientSessionGuard>
      <main className="container mx-auto p-4 max-w-4xl sm:my-10 my-4">
        <AppHeader />
        <TaskDashboard tasks={tasks} />
      </main>
    </ClientSessionGuard>
  );
}
