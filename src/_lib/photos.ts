export type PhotoCategory =
  | "kuchnia"
  | "garderoba"
  | "szafkaRTV"
  | "lazienka";

export interface PhotoProject {
  id: string;
  category: PhotoCategory;
  images: string[];
}

export const photoProjects: PhotoProject[] = [
  // ── Kuchnie ──────────────────────────────────────────────────────────────
  {
    id: "kuchnia-1",
    category: "kuchnia",
    images: [
      "/photos/kuchnia1,1.webp",
      "/photos/kuchnia1,2.webp",
      "/photos/kuchnia1,3.webp",
      "/photos/kuchnia1,4.webp",
      "/photos/kuchnia1,5.webp",
      "/photos/kuchnia1,6.webp",
    ],
  },
  {
    id: "kuchnia-2",
    category: "kuchnia",
    images: ["/photos/kuchnia2,1.webp", "/photos/kuchnia2,2.webp"],
  },
  {
    id: "kuchnia-3",
    category: "kuchnia",
    images: [
      "/photos/kuchnia3,1.webp",
      "/photos/kuchnia3,2.webp",
      "/photos/kuchnia3,3.webp",
    ],
  },
  {
    id: "kuchnia-4",
    category: "kuchnia",
    images: [
      "/photos/kuchnia4,1.webp",
      "/photos/kuchnia4,2.webp",
      "/photos/kuchnia4,3.webp",
      "/photos/kuchnia4,4.webp",
    ],
  },
  {
    id: "kuchnia-5",
    category: "kuchnia",
    images: [
      "/photos/kuchnia5,1.webp",
      "/photos/kuchnia5,2.webp",
      "/photos/kuchnia5,3.webp",
    ],
  },
  {
    id: "kuchnia-6",
    category: "kuchnia",
    images: ["/photos/kuchnia6,1.webp", "/photos/kuchnia6,2.webp"],
  },
  {
    id: "kuchnia-7",
    category: "kuchnia",
    images: [
      "/photos/kuchnia7,1.webp",
      "/photos/kuchnia7,2.webp",
      "/photos/kuchnia7,3.webp",
      "/photos/kuchnia7,4.webp",
      "/photos/kuchnia7,5.webp",
      "/photos/kuchnia7,6.webp",
    ],
  },
  {
    id: "kuchnia-8",
    category: "kuchnia",
    images: [
      "/photos/kuchnia8,1.webp",
      "/photos/kuchnia8,2.webp",
      "/photos/kuchnia8,3.webp",
    ],
  },
  {
    id: "kuchnia-9",
    category: "kuchnia",
    images: [
      "/photos/kuchnia9,1.webp",
      "/photos/kuchnia9,2.webp",
      "/photos/kuchnia9,3.webp",
    ],
  },

  // ── Garderoby ─────────────────────────────────────────────────────────────
  {
    id: "garderoba-0",
    category: "garderoba",
    images: [
      "/photos/garderoba0,1.webp",
      "/photos/garderoba0,2.webp",
      "/photos/garderoba0,3.webp",
    ],
  },
  {
    id: "garderoba-1",
    category: "garderoba",
    images: [
      "/photos/garderoba1,1.webp",
      "/photos/garderoba1,2.webp",
      "/photos/garderoba1,3.webp",
      "/photos/garderoba1,4.webp",
      "/photos/garderoba1,5.webp",
      "/photos/garderoba1,6.webp",
    ],
  },
  {
    id: "garderoba-2",
    category: "garderoba",
    images: ["/photos/garderoba2,1.webp", "/photos/garderoba2,2.webp"],
  },
  {
    id: "garderoba-4",
    category: "garderoba",
    images: [
      "/photos/garderoba4,1.webp",
      "/photos/garderoba4,2.webp",
      "/photos/garderoba4,3.webp",
    ],
  },
  {
    id: "garderoba-6",
    category: "garderoba",
    images: ["/photos/garderoba6,1.webp", "/photos/garderoba6,2.webp"],
  },
  {
    id: "garderoba-7",
    category: "garderoba",
    images: [
      "/photos/garderoba7,1.webp",
      "/photos/garderoba7,2.webp",
      "/photos/garderoba7,3.webp",
    ],
  },
  {
    id: "garderoba-10",
    category: "garderoba",
    images: ["/photos/garderoba10,1.webp", "/photos/garderoba10,2.webp"],
  },

  // ── Szafki RTV ───────────────────────────────────────────────────────────
  {
    id: "szafkaRTV-1",
    category: "szafkaRTV",
    images: [
      "/photos/szafkaRTV1,1.webp",
      "/photos/szafkaRTV1,2.webp",
      "/photos/szafkaRTV1,3.webp",
    ],
  },
  {
    id: "szafkaRTV-2",
    category: "szafkaRTV",
    images: ["/photos/szafkaRTV2,1.webp", "/photos/szafkaRTV2,2.webp"],
  },
  {
    id: "szafkaRTV-3",
    category: "szafkaRTV",
    images: ["/photos/szafkaRTV3.webp"],
  },
  {
    id: "szafkaRTV-4",
    category: "szafkaRTV",
    images: [
      "/photos/szafkaRTV4,1.webp",
      "/photos/szafkaRTV4,2.webp",
      "/photos/szafkaRTV4,3.webp",
    ],
  },

  // ── Łazienki ─────────────────────────────────────────────────────────────
  {
    id: "lazienka-1",
    category: "lazienka",
    images: ["/photos/łazienka1,1.webp", "/photos/łazienka1,2.webp"],
  },
  {
    id: "lazienka-2",
    category: "lazienka",
    images: ["/photos/łazienka2,1.webp", "/photos/łazienka2,2.webp"],
  },
  {
    id: "lazienka-3",
    category: "lazienka",
    images: [
      "/photos/łazienka3,1.webp",
      "/photos/łazienka3,2.webp",
      "/photos/łazienka3,3.webp",
      "/photos/łazienka3,4.webp",
    ],
  },
  {
    id: "lazienka-5",
    category: "lazienka",
    images: [
      "/photos/łazienka5,1.webp",
      "/photos/łazienka5,2.webp",
      "/photos/łazienka5,3.webp",
    ],
  },
  {
    id: "lazienka-6",
    category: "lazienka",
    images: [
      "/photos/łazienka6,1.webp",
      "/photos/łazienka6,2.webp",
      "/photos/łazienka6,3.webp",
    ],
  },
];

export function getProjectsByCategory(cat: PhotoCategory): PhotoProject[] {
  return photoProjects.filter((p) => p.category === cat);
}

export function getHeroPhotos(): string[] {
  return [
    "/photos/kuchnia1,1.webp",
    "/photos/garderoba1,1.webp",
    "/photos/szafkaRTV1,2.webp",
    "/photos/łazienka1,1.webp",
    "/photos/kuchnia7,1.webp",
  ];
}
