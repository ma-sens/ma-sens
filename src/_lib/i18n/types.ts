export interface ProcessStep {
  label: string;
  desc: string;
}

export interface ServiceEntry {
  slug: string;
  name: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
}

export interface Translations {
  siteTitle: string;
  siteDescription: string;

  nav: {
    home: string;
    kitchens: string;
    wardrobes: string;
    dressing: string;
    living: string;
    pricing: string;
    about: string;
    blog: string;
    faq: string;
    contact: string;
  };

  cta: {
    freeQuote: string;
    bookMeasure: string;
    checkCost: string;
    writeUs: string;
    leaveContact: string;
    sameDay: string;
  };

  hero: {
    tagline: string;
    subtitle: string;
    description: string;
    badge: string;
  };

  whyCustom: {
    title: string;
    intro: string;
    issues: readonly string[];
    conclusion: string;
  };

  howWe: {
    title: string;
    intro: string;
    steps: readonly string[];
    conclusion: string;
  };

  benefits: {
    title: string;
    list: readonly string[];
    ergoTitle: string;
    ergoList: readonly string[];
  };

  pricing: {
    title: string;
    intro: string;
    gotoweCosts: readonly string[];
    conclusion: string;
    summary: readonly string[];
  };

  process: {
    title: string;
    steps: readonly ProcessStep[];
  };

  portfolio: {
    title: string;
    categories: {
      all: string;
      kuchnia: string;
      garderoba: string;
      szafkaRTV: string;
      lazienka: string;
    };
  };

  services: {
    title: string;
    list: readonly ServiceEntry[];
  };

  summary: {
    title: string;
    desc: string;
    ctaTitle: string;
    ctaDesc: string;
  };

  servicePageShared: {
    whyTitle: string;
    gainTitle: string;
    priceTitle: string;
    priceSuffix: string;
    priceNote: string;
  };

  kitchens: {
    h1: string;
    intro: string;
    why: readonly string[];
    gain: readonly string[];
    meta: string;
  };

  wardrobes: {
    h1: string;
    intro: string;
    why: readonly string[];
    gain: readonly string[];
    meta: string;
  };

  dressing: {
    h1: string;
    intro: string;
    why: readonly string[];
    gain: readonly string[];
    meta: string;
  };

  living: {
    h1: string;
    intro: string;
    why: readonly string[];
    gain: readonly string[];
    meta: string;
  };

  pricingPage: {
    h1: string;
    intro: string;
    factors: readonly string[];
    whyTitle: string;
    whyDesc: string;
    meta: string;
  };

  about: {
    h1: string;
    intro: string;
    distincts: readonly string[];
    forWhoTitle: string;
    forWho: readonly string[];
    localTitle: string;
    localDesc: string;
    cities: readonly string[];
    meta: string;
  };

  faq: {
    h1: string;
    items: readonly FaqItem[];
    meta: string;
  };

  blog: {
    h1: string;
    meta: string;
    articles: readonly BlogArticle[];
  };

  contact: {
    h1: string;
    intro: string;
    phone: string;
    email: string;
    area: string;
    areaValue: string;
    meta: string;
  };

  footer: {
    tagline: string;
    rights: string;
    area: string;
  };
  partners: {
    title: string;
    subtitle: string;
  };
}
