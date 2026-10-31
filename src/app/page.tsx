import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-16 text-slate-50">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-400">SPENDLY</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight">A smarter weekly budget, built around your habits.</h1>
        <p className="mt-5 text-lg text-slate-300">
          Track budgets, currencies, and recurring expenses from a single dashboard.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-violet-500 px-5 py-3 font-medium text-white transition hover:bg-violet-400"
          >
            Go to login
          </Link>
          <Link href="/dashboard" className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800">
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
