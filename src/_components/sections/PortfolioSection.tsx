import { SectionTitle } from "../ui/SectionTitle";
import { PhotoGrid } from "../portfolio/PhotoGrid";
import type { Translations } from "../../_lib/i18n";
import { photoProjects } from "../../_lib/photos";
import styles from "./PortfolioSection.module.css";

interface Props {
  t: Translations;
}

export function PortfolioSection({ t }: Props) {
  const featured = photoProjects.slice(0, 9);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle title={t.portfolio.title} align="center" />
        <div className={styles.gridWrapper}>
          <PhotoGrid projects={featured} t={t} showFilter={false} />
        </div>
      </div>
    </section>
  );
}
