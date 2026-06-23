"use client";

import { useState } from "react";
import type { Translations } from "../../../_lib/i18n";
import styles from "./FaqAccordion.module.css";

interface Props {
  items: Translations["faq"]["items"];
}

export function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <div key={item.q} className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}>
          <button
            type="button"
            className={styles.question}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            id={`faq-q-${i}`}
          >
            <span>{item.q}</span>
            <span className={styles.icon} aria-hidden="true">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className={styles.answer} role="region" aria-labelledby={`faq-q-${i}`}>
              <p>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
