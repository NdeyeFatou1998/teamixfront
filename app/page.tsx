import { TeamixLogo } from "@/components/brand/teamix-logo";
import Link from "next/link";
import { getApiUrl } from "@/lib/utils";

type HealthResponse = {
  status: string;
  timestamp: string;
};

export const dynamic = "force-dynamic";

async function getApiHealth(): Promise<{ ok: boolean; data?: HealthResponse; error?: string }> {
  try {
    const response = await fetch(`${getApiUrl()}/health`, { next: { revalidate: 30 } });
    if (!response.ok) return { ok: false, error: `HTTP ${response.status}` };
    const data = (await response.json()) as HealthResponse;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "API inaccessible" };
  }
}

export default async function Home() {
  const apiHealth = await getApiHealth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent" />
      <main className="relative mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-10 px-6 py-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <TeamixLogo variant="with-name" width={200} height={64} priority className="rounded-2xl shadow-lg" />
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-widest text-sky-400">Teamix</p>
            <h1 className="text-4xl font-bold tracking-tight">Votre entreprise, centralisée</h1>
            <p className="max-w-xl text-lg text-slate-400">
              Reporting, projets, congés et coffre-fort — une plateforme sécurisée
              multi-tenant pour vos équipes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex h-11 items-center rounded-lg bg-sky-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Se connecter
          </Link>
          <span className="inline-flex h-11 items-center rounded-lg border border-slate-700 px-6 text-sm text-slate-400">
            {apiHealth.ok ? "API en ligne" : "API hors ligne"}
          </span>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Sécurisé", desc: "JWT, permissions granulaires, isolation tenant" },
            { title: "Multi-tenant", desc: "Une org par entreprise, données isolées" },
            { title: "Évolutif", desc: "Architecture modulaire, prête à grandir" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <h2 className="font-semibold text-white">{item.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
