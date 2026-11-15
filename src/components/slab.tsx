import type { CompanyId } from "@/lib/pricing/graded";

// Couleur d'étiquette par société, prise dans la palette du site (pas une copie des vraies étiquettes).
const LABEL: Record<CompanyId, string> = {
  psa: "bg-berry text-white",
  pca: "bg-ink text-white",
  cgc: "bg-[#129a93] text-white",
  bgs: "bg-[#e9b213] text-ink",
  ca: "bg-bezel text-white",
};

/**
 * Boîtier de gradation autour d'une carte. Sans note, la carte s'affiche seule ;
 * avec une note, elle recule dans le boîtier et l'étiquette apparaît.
 */
export function Slab({ company, companyId, grade, name, setName, children }: { company?: string; companyId?: CompanyId; grade?: string; name: string; setName: string; children: React.ReactNode }) {
  const on = !!(company && grade);
  return (
    <div className="slab" data-on={on}>
      <div className="slab-case" aria-hidden={!on}>
        <div className={`slab-label ${companyId ? LABEL[companyId] : ""}`}>
          <span className="min-w-0">
            <span className="block truncate text-[0.8125rem] font-bold leading-tight">{name}</span>
            <span className="block truncate text-xs opacity-85">{setName}</span>
          </span>
          <span className="text-right">
            <span className="pixel block text-2xl leading-none">{grade}</span>
            <span className="block text-[0.6875rem] font-bold uppercase tracking-wide">{company}</span>
          </span>
        </div>
      </div>
      <div className="slab-card">{children}</div>
    </div>
  );
}
