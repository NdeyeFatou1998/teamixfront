import { Lock, Server, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Isolation multi-tenant",
    description:
      "Chaque entreprise dispose de son espace isolé. Aucune fuite de données entre organisations.",
    color: "text-teamix-teal",
    bg: "bg-teamix-teal-light",
  },
  {
    icon: Lock,
    title: "Permissions granulaires",
    description:
      "Chaque action est contrôlée par des permissions explicites, configurables par rôle.",
    color: "text-teamix-blue",
    bg: "bg-teamix-blue-light",
  },
  {
    icon: Server,
    title: "Architecture sécurisée",
    description:
      "JWT, chiffrement des mots de passe, validation stricte et hébergement cloud fiable.",
    color: "text-teamix-green",
    bg: "bg-teamix-green-light",
  },
];

export function LandingSecurity() {
  return (
    <section id="securite" className="bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teamix-blue">
            Sécurité
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            La confiance au cœur du produit
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Teamix est conçu pour les entreprises qui ne transigent pas sur la
            protection de leurs données et de leurs équipes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {points.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
            >
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${bg}`}
              >
                <Icon className={`h-7 w-7 ${color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
