import {
  BarChart3,
  Briefcase,
  FolderLock,
  FolderTree,
  Palmtree,
  Users,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Reporting",
    description:
      "Rapports hebdomadaires et mensuels centralisés pour vos équipes et managers.",
    color: "text-teamix-teal",
    bg: "bg-teamix-teal-light",
    border: "border-teamix-teal/20",
  },
  {
    icon: Briefcase,
    title: "Projets & tâches",
    description:
      "Affectez vos employés aux projets, suivez l'avancement et les livrables.",
    color: "text-teamix-blue",
    bg: "bg-teamix-blue-light",
    border: "border-teamix-blue/20",
  },
  {
    icon: Palmtree,
    title: "Congés & télétravail",
    description:
      "Demandes de congés et jours de télétravail avec circuit d'approbation.",
    color: "text-teamix-orange",
    bg: "bg-teamix-orange-light",
    border: "border-teamix-orange/20",
  },
  {
    icon: FolderLock,
    title: "Coffre-fort",
    description:
      "Secrets et fichiers sensibles partagés avec contrôle de visibilité fin.",
    color: "text-teamix-green",
    bg: "bg-teamix-green-light",
    border: "border-teamix-green/20",
  },
  {
    icon: FolderTree,
    title: "Départements",
    description:
      "Structurez votre organisation par équipes avec managers et hiérarchie.",
    color: "text-teamix-blue",
    bg: "bg-teamix-blue-light",
    border: "border-teamix-blue/20",
  },
  {
    icon: Users,
    title: "Employés",
    description:
      "Profils employés, affectations et permissions adaptées à chaque rôle.",
    color: "text-teamix-teal",
    bg: "bg-teamix-teal-light",
    border: "border-teamix-teal/20",
  },
];

export function LandingFeatures() {
  return (
    <section id="fonctionnalites" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teamix-teal">
            Fonctionnalités
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Tout ce dont votre entreprise a besoin
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Teamix évolue module par module. Les fondations sont déjà en place :
            authentification, organisations, départements et employés.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, color, bg, border }) => (
            <div
              key={title}
              className={`group rounded-2xl border ${border} bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color}`}
              >
                <Icon className="h-5 w-5" />
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
