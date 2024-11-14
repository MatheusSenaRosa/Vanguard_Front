export const getInitalMaxItems = (type: "technologies" | "trails") => {
  if (type === "technologies") {
    if (window.innerWidth > 1220) return 3;

    if (window.innerWidth < 1220 && window.innerWidth > 960) return 2;

    if (window.innerWidth < 960 && window.innerWidth > 800) return 3;

    if (window.innerWidth < 800 && window.innerWidth > 600) return 2;

    return 1;
  }

  if (window.innerWidth > 800) return 2;

  return 1;
};
