import type { Translations } from "../../_lib/i18n";
import { SectionTitle } from "../ui/SectionTitle";
import styles from "./ProcessSection.module.css";

interface Props {
  t: Translations;
}

export function ProcessSection({ t }: Props) {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title={t.process.title} align="center" />
        <ol className={styles.steps}>
          {t.process.steps.map((step, i) => (
            <li key={step.label} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div className={styles.connector} aria-hidden="true" />
              <div className={styles.stepContent}>
                <p className={styles.stepLabel}>{step.label}</p>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
