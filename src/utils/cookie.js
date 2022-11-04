import { entriesToObj } from "./object";

export const appendCookie = (entryies = []) => {
  let cookie = document.cookie;
  cookie +=
    ";" +
    entryies.map(({ key, value }) => {
      return `${key}=${value}`;
    });
  document.cookie = cookie;
};

export const readCookie = () => {
  return entriesToObj(document.cookie, ";");
};
