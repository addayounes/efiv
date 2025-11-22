export function alignArraysBy<T>(
  arr1: T[],
  arr2: T[],
  selector: (item: T) => any
) {
  const values1 = arr1.map(selector);
  const values2 = arr2.map(selector);

  // find first common value
  let firstCommon1 = -1;
  let firstCommon2 = -1;

  for (let i = 0; i < values1.length; i++) {
    let v = values1[i];
    let j = values2.indexOf(v);
    if (j !== -1) {
      firstCommon1 = i;
      firstCommon2 = j;
      break;
    }
  }

  // if no common values → simple align with nulls
  if (firstCommon1 === -1) {
    const maxLen = Math.max(arr1.length, arr2.length);
    return {
      arr1: [...arr1, ...Array(maxLen - arr1.length).fill(null)],
      arr2: [...arr2, ...Array(maxLen - arr2.length).fill(null)],
      merged: Array.from({ length: maxLen }, (_, index) => ({
        current: arr1[index] ?? null,
        toCouple: arr2[index] ?? null,
      })),
    };
  }

  // compute how much we need to shift
  const diff = firstCommon2 - firstCommon1;

  let final1: (T | null)[] = [...arr1];
  let final2: (T | null)[] = [...arr2];

  if (diff > 0) {
    // arr1 starts earlier → pad arr1 at start
    final1 = [...Array(diff).fill(null), ...final1];
  } else if (diff < 0) {
    // arr2 starts earlier → pad arr2 at start
    final2 = [...Array(-diff).fill(null), ...final2];
  }

  // normalize lengths
  const maxLen = Math.max(final1.length, final2.length);
  while (final1.length < maxLen) final1.push(null);
  while (final2.length < maxLen) final2.push(null);

  const merged = final1.map((item, index) => ({
    current: item,
    toCouple: final2[index],
  }));

  return { arr1: final1, arr2: final2, merged };
}
