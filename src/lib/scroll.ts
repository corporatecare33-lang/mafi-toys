export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");
    const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
}
