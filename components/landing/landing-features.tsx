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
    description: "Rapports hebdo & mensuels, visibilité manager instantanée.",
    bento: "bento-teal",
    span: "md:col-span-4 md:row-span-2",
    large: true,
  },
  {
    icon: Briefcase,
    title: "Projets",
    description: "Tâches, rôles, livrables.",
    bento: "bento-blue",
    span: "md:col-span-4",
    large: false,
  },
  {
    icon: Palmtree,
    title: "Congés",
    description: "Demandes & approbations fluides.",
    bento: "bento-orange",
    span: "md:col-span-4",
    large: false,
  },
  {
    icon: FolderLock,
    title: "Vault",
    description: "Secrets & fichiers sensibles.",
    bento: "bento-green",
    span: "md:col-span-4",
    large: false,
  },
  {
    icon: FolderTree,
    title: "Départements",
    description: "Hiérarchie & org chart.",
    bento: "bento-blue",
    span: "md:col-span-4",
    large: false,
  },
  {
    icon: Users,
    title: "Employés",
    description: "Profils, affectations, permissions.",
    bento: "bento-orange",
    span: "md:col-span-4",
    large: false,
  },
];

export function LandingFeatures() {
  return (
    <section id="fonctionnalites" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div id="experience" className="mb-14 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] teamix-rainbow-text">
            Modules Teamix
          </p>
          <h2 className="mt-3 text-4xl font-black text-gray-900 md:text-5xl">
            Chaque module, un levier concret
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Des outils qui s&apos;enrichissent au fil de votre croissance, réunis
            dans une expérience claire et connectée.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(140px,auto)] gap-4 md:grid-cols-12">
          {features.map(({ icon: Icon, title, description, bento, span, large }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-3xl p-6 text-white shadow-xl transition hover:scale-[1.02] hover:shadow-2xl ${bento} ${span}`}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl transition group-hover:bg-white/25" />
              <Icon className={`relative z-10 ${large ? "h-10 w-10" : "h-7 w-7"} opacity-90`} />
              <div className={`relative z-10 ${large ? "mt-8" : "mt-4"}`}>
                <h3 className={`font-black ${large ? "text-3xl" : "text-xl"}`}>{title}</h3>
                <p className={`mt-2 text-white/85 ${large ? "text-base max-w-xs" : "text-sm"}`}>
                  {description}
                </p>
              </div>
              {large && (
                <div className="relative z-10 mt-8 flex gap-2">
                  {["Reporting", "KPIs", "Exports"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
