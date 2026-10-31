"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function DashboardShell() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-10 text-center text-slate-300">Loading your dashboard…</p>;
  }

  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400">Dashboard</p>
            <h1 className="mt-2 text-4xl font-semibold">Welcome, {session?.user?.name ?? session?.user?.email ?? "friend"}</h1>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Monthly budget</p>
            <p className="mt-3 text-3xl font-semibold">$12,000</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Spent</p>
            <p className="mt-3 text-3xl font-semibold">$7,450</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Available</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-400">$4,550</p>
          </div>
        </div>
      </div>
    </main>
  );
}
