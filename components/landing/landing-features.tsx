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
  },
  {
    icon: Briefcase,
    title: "Projets & tâches",
    description:
      "Affectez vos employés aux projets, suivez l'avancement et les livrables.",
  },
  {
    icon: Palmtree,
    title: "Congés & télétravail",
    description:
      "Demandes de congés et jours de télétravail avec circuit d'approbation.",
  },
  {
    icon: FolderLock,
    title: "Coffre-fort",
    description:
      "Secrets et fichiers sensibles partagés avec contrôle de visibilité fin.",
  },
  {
    icon: FolderTree,
    title: "Départements",
    description:
      "Structurez votre organisation par équipes avec managers et hiérarchie.",
  },
  {
    icon: Users,
    title: "Employés",
    description:
      "Profils employés, affectations et permissions adaptées à chaque rôle.",
  },
];

export function LandingFeatures() {
  return (
    <section id="fonctionnalites" className="border-t border-slate-800/80 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-sky-400">
            Fonctionnalités
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Tout ce dont votre entreprise a besoin
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Teamix évolue module par module. Les fondations sont déjà en place :
            authentification, organisations, départements et employés.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-sky-400/30 hover:bg-slate-900/70"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400 transition group-hover:bg-sky-400/20">
                <Icon className="h-5 w-5" />
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
