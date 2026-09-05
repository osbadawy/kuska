import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen bg-[#FAF7F5] px-8 pt-32">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-sm text-[#B87E74]">
          Dashboard
        </p>

        <h1 className="mt-3 font-serif text-5xl text-[#28211F]">
          Welcome, {session?.user.name}.
        </h1>

        <p className="mt-4 text-[#7A6C67]">
          {session?.user.email}
        </p>
      </div>
    </main>
  );
}