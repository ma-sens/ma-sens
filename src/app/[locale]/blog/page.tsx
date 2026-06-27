import type { Metadata } from "next";
import type { Locale } from "../../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../../_lib/i18n/config";
import { getTranslations } from "../../../_lib/i18n";
import { CtaSection } from "../../../_components/sections/CtaSection";
import styles from "./page.module.css";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  return {
    title: t.blog.h1,
    description: t.blog.meta,
    openGraph: { title: t.blog.h1, description: t.blog.meta },
    twitter: { title: t.blog.h1, description: t.blog.meta },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.h1}>{t.blog.h1}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {t.blog.articles.map((article) => (
              <article key={article.slug} className={styles.card}>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaSection locale={locale} t={t} variant="light" />
    </>
  );
}
