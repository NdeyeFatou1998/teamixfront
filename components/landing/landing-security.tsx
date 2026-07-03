import { Lock, Server, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Isolation multi-tenant",
    description:
      "Données strictement séparées par entreprise, sans exposition croisée entre clients.",
    accent: "border-teamix-teal bg-teamix-teal-light/50",
    iconBg: "bento-teal text-white",
  },
  {
    icon: Lock,
    title: "Gouvernance des accès",
    description:
      "Rôles, permissions et exceptions configurables — chaque action est tracée et contrôlée.",
    accent: "border-teamix-blue bg-teamix-blue-light/50",
    iconBg: "bento-blue text-white",
  },
  {
    icon: Server,
    title: "Infrastructure fiable",
    description:
      "Authentification robuste, chiffrement des secrets et hébergement cloud scalable.",
    accent: "border-teamix-green bg-teamix-green-light/50",
    iconBg: "bento-green text-white",
  },
];

export function LandingSecurity() {
  return (
    <section id="securite" className="teamix-mesh-dark relative overflow-hidden px-6 py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-teamix-teal to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-teamix-orange via-teamix-blue to-teamix-green" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-teamix-teal">
            Sécurité & conformité
          </p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Une protection alignée sur vos enjeux
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Teamix applique les mêmes standards de rigueur à la sécurité qu&apos;à
            l&apos;expérience produit.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {points.map(({ icon: Icon, title, description, accent, iconBg }) => (
            <div
              key={title}
              className={`rounded-3xl border-2 p-8 backdrop-blur-sm transition hover:-translate-y-1 ${accent}`}
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${iconBg}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            { label: "Authentification", color: "bg-teamix-teal" },
            { label: "API sécurisée", color: "bg-teamix-blue" },
            { label: "Traçabilité", color: "bg-teamix-orange" },
            { label: "Coffre-fort", color: "bg-teamix-green" },
          ].map((pill) => (
            <span
              key={pill.label}
              className={`rounded-full ${pill.color} px-5 py-2 text-xs font-bold text-white shadow-lg`}
            >
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
