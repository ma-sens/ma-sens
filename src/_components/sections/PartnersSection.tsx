import Image from "next/image";
import blancoLogo from "@/app/partners/blanco-logo.svg";
import blumLogo from "@/app/partners/blum-logo.svg";
import eggerLogo from "@/app/partners/egger-logo.svg";
import frankeLogo from "@/app/partners/franke-logo.svg";
import gtvLogo from "@/app/partners/gtv-logo.svg";
import haefeleLogo from "@/app/partners/haefele-logo.png";
import hettichLogo from "@/app/partners/hettich-logo.svg";
import rejsLogo from "@/app/partners/rejs-logo.svg";
import swissKronoLogo from "@/app/partners/swiss-krono-logo.svg";
import type { Translations } from "../../_lib/i18n";
import { SectionTitle } from "../ui/SectionTitle";
import styles from "./PartnersSection.module.css";

const PARTNERS = [
  { name: "Blanco", logo: blancoLogo },
  { name: "Blum", logo: blumLogo },
  { name: "Egger", logo: eggerLogo },
  { name: "Franke", logo: frankeLogo },
  { name: "GTV", logo: gtvLogo },
  { name: "Häfele", logo: haefeleLogo },
  { name: "Hettich", logo: hettichLogo },
  { name: "Rejs", logo: rejsLogo },
  { name: "Swiss Krono", logo: swissKronoLogo },
];

interface Props {
  t: Translations;
}

export function PartnersSection({ t }: Props) {
  const partners = t.partners;

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <SectionTitle
          title={partners.title}
          align="center"
        />
        <div className={styles.grid}>
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className={styles.logoWrapper}
              title={partner.name}
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 12vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
