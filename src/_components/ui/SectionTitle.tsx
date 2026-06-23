import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
}

export function SectionTitle({
  title,
  subtitle,
  align = "left",
  size = "md",
}: SectionTitleProps) {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      <h2 className={`${styles.title} ${styles[size]}`}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
