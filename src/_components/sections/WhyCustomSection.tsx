import type { Translations } from "../../_lib/i18n";
import { SectionTitle } from "../ui/SectionTitle";
import styles from "./WhyCustomSection.module.css";

interface Props {
  t: Translations;
}

export function WhyCustomSection({ t }: Props) {
  const { whyCustom, howWe } = t;

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.card}>
            <SectionTitle title={whyCustom.title} />
            <p className={styles.intro}>{whyCustom.intro}</p>
            <ul className={styles.list}>
              {whyCustom.issues.map((issue) => (
                <li key={issue} className={styles.listItem}>
                  <span className={styles.dash}>—</span>
                  {issue}
                </li>
              ))}
            </ul>
            <p className={styles.conclusion}>{whyCustom.conclusion}</p>
          </div>

          <div className={`${styles.card} ${styles.cardAccent}`}>
            <SectionTitle title={howWe.title} />
            <p className={styles.intro}>{howWe.intro}</p>
            <ul className={styles.list}>
              {howWe.steps.map((step, i) => (
                <li key={step} className={styles.listItemNum}>
                  <span className={styles.num}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
            <p className={styles.conclusion}>{howWe.conclusion}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
