type HealthResponse = {
  status: string;
  timestamp: string;
  uptime?: number;
};

export const dynamic = "force-dynamic";

async function getApiHealth(): Promise<{
  ok: boolean;
  data?: HealthResponse;
  error?: string;
}> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return { ok: false, error: "NEXT_PUBLIC_API_URL non configurée" };
  }

  try {
    const response = await fetch(`${apiUrl}/health`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return { ok: false, error: `API HTTP ${response.status}` };
    }

    const data = (await response.json()) as HealthResponse;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "API inaccessible" };
  }
}

export default async function Home() {
  const apiHealth = await getApiHealth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-sky-400">
            Teamix
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Plateforme entreprise
          </h1>
          <p className="text-lg text-slate-400">
            Déploiement web actif. Le backend et le front sont prêts pour
            Railway.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-400">
            Statut API
          </h2>
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${
                apiHealth.ok ? "bg-emerald-400" : "bg-rose-400"
              }`}
            />
            <p className="text-base">
              {apiHealth.ok
                ? `Connecté — ${apiHealth.data?.status ?? "ok"}`
                : `Hors ligne — ${apiHealth.error}`}
            </p>
          </div>
          {apiHealth.data?.timestamp ? (
            <p className="mt-2 text-sm text-slate-500">
              Dernière réponse : {apiHealth.data.timestamp}
            </p>
          ) : null}
          <p className="mt-4 text-sm text-slate-500">
            URL API : {process.env.NEXT_PUBLIC_API_URL ?? "non définie"}
          </p>
        </section>

        <p className="text-sm text-slate-500">
          Prochaine étape : associer votre nom de domaine au service web sur
          Railway.
        </p>
      </main>
    </div>
  );
}
