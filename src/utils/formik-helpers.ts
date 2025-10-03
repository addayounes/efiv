export const flattenErrors = (obj: any, parentKey = ""): string[] => {
  let paths: string[] = [];
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];
    const path = Array.isArray(obj)
      ? `${parentKey}[${key}]`
      : parentKey
      ? `${parentKey}.${key}`
      : key;

    if (typeof value === "string") {
      paths.push(path);
    } else if (typeof value === "object" && value !== null) {
      paths = paths.concat(flattenErrors(value, path));
    }
  }
  return paths;
};

export const buildNestedTouched = (paths: string[]): any => {
  const touched: any = {};

  paths.forEach((path) => {
    const segments = path
      .replace(/\[(\d+)\]/g, ".$1") // convert [0] → .0
      .split(".");

    let current = touched;
    segments.forEach((seg, idx) => {
      if (idx === segments.length - 1) {
        current[seg] = true;
      } else {
        if (!(seg in current)) {
          // If next segment is a number → array
          current[seg] = /^\d+$/.test(segments[idx + 1]) ? [] : {};
        }
        current = current[seg];
      }
    });
  });

  return touched;
};
