import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  id?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  id,
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} id={id}>
      {children}
    </button>
  );
}
