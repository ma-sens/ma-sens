"use client";

import { useEffect } from "react";

interface Props {
  lang: string;
}

export function LangSetter({ lang }: Props) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
