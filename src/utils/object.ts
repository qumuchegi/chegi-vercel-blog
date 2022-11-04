export const entriesToObj = (
  entriesStr: string,
  splitChar?: string,
  convertValue?: (value: any) => any
) => {
  return entriesStr.split(splitChar ?? "&").reduce((obj, entry) => {
    const [k, v] = entry.split("=");
    return {
      ...obj,
      [k.trim()]: convertValue ? convertValue(v) : v,
    };
  }, {});
};
