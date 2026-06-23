"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { PhotoCategory, PhotoProject } from "../../_lib/photos";
import type { Translations } from "../../_lib/i18n";
import styles from "./PhotoGrid.module.css";

interface Props {
  projects: PhotoProject[];
  t: Translations;
  showFilter?: boolean;
}

const CATEGORIES: PhotoCategory[] = ["kuchnia", "garderoba", "szafka", "lazienka"];

export function PhotoGrid({ projects, t, showFilter = false }: Props) {
  const [active, setActive] = useState<PhotoCategory | "all">("all");
  const [activeProject, setActiveProject] = useState<PhotoProject | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  const handlePrev = useCallback(() => {
    if (!activeProject) return;
    setCurrentImgIndex((prev) =>
      prev === 0 ? activeProject.images.length - 1 : prev - 1
    );
  }, [activeProject]);

  const handleNext = useCallback(() => {
    if (!activeProject) return;
    setCurrentImgIndex((prev) =>
      prev === activeProject.images.length - 1 ? 0 : prev + 1
    );
  }, [activeProject]);

  // Keyboard navigation
  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "Left") {
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "Right") {
        handleNext();
      } else if (e.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, handlePrev, handleNext]);

  // Disable body scroll when lightbox is active
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  // Touch Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className={styles.root}>
      {showFilter && (
        <div className={styles.filters} role="tablist" aria-label="Filtruj kategorie">
          <button
            type="button"
            role="tab"
            aria-selected={active === "all"}
            className={`${styles.filter} ${active === "all" ? styles.filterActive : ""}`}
            onClick={() => setActive("all")}
          >
            {t.portfolio.categories.all}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              role="tab"
              aria-selected={active === cat}
              className={`${styles.filter} ${active === cat ? styles.filterActive : ""}`}
              onClick={() => setActive(cat)}
            >
              {t.portfolio.categories[cat]}
            </button>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        {filtered.map((project) =>
          project.images.slice(0, 1).map((src) => (
            <button
              type="button"
              key={src}
              className={styles.item}
              onClick={() => {
                setActiveProject(project);
                setCurrentImgIndex(0);
              }}
              aria-label={`Otwórz zdjęcie ${project.id}`}
            >
              <Image
                src={src}
                alt={`MA SENS – ${project.category} ${project.id}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.overlay} aria-hidden="true">
                <span className={styles.overlayIcon}>+</span>
              </div>
            </button>
          )),
        )}
      </div>

      {activeProject && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Powiększone zdjęcie"
          onClick={() => setActiveProject(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActiveProject(null)}
            aria-label="Zamknij"
          >
            ✕
          </button>

          {activeProject.images.length > 1 && (
            <>
              <button
                type="button"
                className={styles.lightboxPrev}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Poprzednie zdjęcie"
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.lightboxNext}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Następne zdjęcie"
              >
                ›
              </button>
            </>
          )}

          <div
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={activeProject.images[currentImgIndex]}
              alt={`Powiększone zdjęcie realizacji – ${currentImgIndex + 1} z ${activeProject.images.length}`}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {activeProject.images.length > 1 && (
            <div className={styles.lightboxCounter}>
              {currentImgIndex + 1} / {activeProject.images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

