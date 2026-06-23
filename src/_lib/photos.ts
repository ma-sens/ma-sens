export type PhotoCategory = "kuchnia" | "garderoba" | "szafka" | "lazienka";

export interface PhotoProject {
  id: string;
  category: PhotoCategory;
  images: string[];
}

export const photoProjects: PhotoProject[] = [
  {
    id: "kuchnia-1",
    category: "kuchnia",
    images: [
      "/photos/kuchnia1,1.jpg",
      "/photos/kuchnia1,2.jpg",
      "/photos/kuchnia1,3.jpg",
      "/photos/kuchnia1,4.jpg",
      "/photos/kuchnia1,5.jpg",
      "/photos/kuchnia1,6.jpg",
    ],
  },
  {
    id: "kuchnia-2",
    category: "kuchnia",
    images: [
      "/photos/kuchnia2,1.jpg",
      "/photos/kuchnia2,2.jpg",
      "/photos/kuchnia2,3.jpg",
    ],
  },
  {
    id: "kuchnia-3",
    category: "kuchnia",
    images: [
      "/photos/kuchnia3,1.jpg",
      "/photos/kuchnia3,2.jpg",
      "/photos/kuchnia3,3.jpg",
    ],
  },
  {
    id: "kuchnia-4",
    category: "kuchnia",
    images: [
      "/photos/kuchnia4,1.jpg",
      "/photos/kuchnia4,2.jpg",
      "/photos/kuchnia4,3.jpg",
    ],
  },
  {
    id: "kuchnia-5",
    category: "kuchnia",
    images: [
      "/photos/kuchnia5,1.jpg",
      "/photos/kuchnia5,2.jpg",
      "/photos/kuchnia5,3.jpg",
    ],
  },
  {
    id: "kuchnia-6",
    category: "kuchnia",
    images: ["/photos/kuchnia6,1.jpg", "/photos/kuchnia6,2.jpg"],
  },
  {
    id: "kuchnia-7",
    category: "kuchnia",
    images: [
      "/photos/kuchnia7,1.jpg",
      "/photos/kuchnia7,2.jpg",
      "/photos/kuchnia7,3.jpg",
      "/photos/kuchnia7,4.jpg",
      "/photos/kuchnia7,5.jpg",
      "/photos/kuchnia7,6.jpg",
    ],
  },
  {
    id: "kuchnia-8",
    category: "kuchnia",
    images: [
      "/photos/kuchnia8,1.jpg",
      "/photos/kuchnia8,2.jpg",
      "/photos/kuchnia8,3.jpg",
    ],
  },
  {
    id: "kuchnia-9",
    category: "kuchnia",
    images: [
      "/photos/kuchnia9,1.jpg",
      "/photos/kuchnia9,2.jpg",
      "/photos/kuchnia9,3.jpg",
    ],
  },
  {
    id: "garderoba-0",
    category: "garderoba",
    images: [
      "/photos/garderoba0,1.jpg",
      "/photos/garderoba0,2.jpg",
      "/photos/garderoba0,3.jpg",
    ],
  },
  {
    id: "garderoba-1",
    category: "garderoba",
    images: ["/photos/garderoba1.jpg"],
  },
  {
    id: "garderoba-2",
    category: "garderoba",
    images: ["/photos/garderoba2,1.jpg", "/photos/garderoba2,2.jpg"],
  },
  {
    id: "garderoba-3",
    category: "garderoba",
    images: ["/photos/garderoba3.jpg"],
  },
  {
    id: "garderoba-4",
    category: "garderoba",
    images: ["/photos/garderoba4,1.jpg", "/photos/garderoba4,2.jpg"],
  },
  {
    id: "garderoba-5",
    category: "garderoba",
    images: ["/photos/garderoba5.jpg"],
  },
  {
    id: "garderoba-6",
    category: "garderoba",
    images: ["/photos/garderoba6,1.jpg", "/photos/garderoba6,2.jpg"],
  },
  {
    id: "garderoba-7",
    category: "garderoba",
    images: [
      "/photos/garderoba7,1.jpg",
      "/photos/garderoba7,2.jpg",
      "/photos/garderoba7,3.jpg",
    ],
  },
  {
    id: "garderoba-8",
    category: "garderoba",
    images: ["/photos/garderoba8.jpg"],
  },
  {
    id: "garderoba-9",
    category: "garderoba",
    images: ["/photos/garderoba9.jpg"],
  },
  {
    id: "garderoba-10",
    category: "garderoba",
    images: ["/photos/garderoba10,1.jpg", "/photos/garderoba10,2.jpg"],
  },
  {
    id: "garderoba-11",
    category: "garderoba",
    images: ["/photos/garderoba11.jpg"],
  },
  {
    id: "szafka-1",
    category: "szafka",
    images: [
      "/photos/szafka1,1.jpg",
      "/photos/szafka1,2.jpg",
      "/photos/szafka1,3.jpg",
    ],
  },
  {
    id: "szafka-2",
    category: "szafka",
    images: ["/photos/szafka2,1.jpg", "/photos/szafka2,2.jpg"],
  },
  {
    id: "szafka-3",
    category: "szafka",
    images: ["/photos/szafka3.jpg"],
  },
  {
    id: "szafka-4",
    category: "szafka",
    images: [
      "/photos/szafka4,1.jpg",
      "/photos/szafka4,2.jpg",
      "/photos/szafka4,3.jpg",
    ],
  },
  {
    id: "szafka-5",
    category: "szafka",
    images: ["/photos/szafka5.jpg"],
  },
  {
    id: "lazienka-1",
    category: "lazienka",
    images: ["/photos/łazienka1,1.jpg", "/photos/łazienka1,2.jpg"],
  },
  {
    id: "lazienka-2",
    category: "lazienka",
    images: ["/photos/łazienka2,1.jpg", "/photos/łazienka2,2.jpg"],
  },
  {
    id: "lazienka-3",
    category: "lazienka",
    images: ["/photos/łazienka3.jpg"],
  },
  {
    id: "lazienka-4",
    category: "lazienka",
    images: ["/photos/łazienka4.jpg"],
  },
  {
    id: "lazienka-5",
    category: "lazienka",
    images: ["/photos/łazienka5.jpg"],
  },
  {
    id: "lazienka-6",
    category: "lazienka",
    images: [
      "/photos/łazienka6,1.jpg",
      "/photos/łazienka6,2.jpg",
      "/photos/łazienka6,3.jpg",
    ],
  },
  {
    id: "lazienka-7",
    category: "lazienka",
    images: [
      "/photos/łazienka7,1.jpg",
      "/photos/łazienka7,2.jpg",
      "/photos/łazienka7,3.jpg",
    ],
  },
  {
    id: "lazienka-8",
    category: "lazienka",
    images: ["/photos/łazienka8.jpg"],
  },
];

export function getProjectsByCategory(cat: PhotoCategory): PhotoProject[] {
  return photoProjects.filter((p) => p.category === cat);
}

export function getHeroPhotos(): string[] {
  return [
    "/photos/kuchnia1,1.jpg",
    "/photos/garderoba8.jpg",
    "/photos/szafka1,2.jpg",
    "/photos/łazienka1,1.jpg",
    "/photos/kuchnia7,1.jpg",
  ];
}
