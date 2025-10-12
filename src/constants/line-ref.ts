export const LIVE_LINE_COLORS_MAP = {
  C: "#ffcc30",
  U: "#b6134c",
  K: "#9b9842",
  N: "#00b297",
  R: "#f49fb3",
  B: "#5091cb",
  L: "#c4a4cc",
  J: "#cec73d",
  P: "#f58f53",
  D: "#008b5b",
  A: "#eb2132",
  H: "#84653d",
  E: "#b94e9a",
};

export const getLineColor = (line: keyof typeof LIVE_LINE_COLORS_MAP) => {
  if (!line) return "#000000";
  return LIVE_LINE_COLORS_MAP[line] || "#000000";
};
