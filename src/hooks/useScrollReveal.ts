import { useEffect, useRef } from "react";

export function useScrollReveal(
  selector: string = ".reveal, .reveal-left, .reveal-right, .reveal-scale",
  threshold: number = 0.15
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [selector, threshold]);
}
