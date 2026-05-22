let gsapModule = null;

export async function getGsap() {
  if (!gsapModule) {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    gsap.registerPlugin(ScrollTrigger);
    gsapModule = { gsap, ScrollTrigger };
  }
  return gsapModule;
}
