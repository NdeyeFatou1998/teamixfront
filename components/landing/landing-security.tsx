import { Lock, Server, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Isolation multi-tenant",
    description:
      "Chaque entreprise dispose de son espace isolé. Aucune fuite de données entre organisations.",
  },
  {
    icon: Lock,
    title: "Permissions granulaires",
    description:
      "Chaque action est contrôlée par des permissions explicites, configurables par rôle.",
  },
  {
    icon: Server,
    title: "Architecture sécurisée",
    description:
      "JWT, chiffrement des mots de passe, validation stricte et hébergement cloud fiable.",
  },
];

export function LandingSecurity() {
  return (
    <section id="securite" className="border-t border-slate-800/80 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-sky-400">
            Sécurité
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            La confiance au cœur du produit
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Teamix est conçu pour les entreprises qui ne transigent pas sur la
            protection de leurs données et de leurs équipes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {points.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-400/10">
                <Icon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
