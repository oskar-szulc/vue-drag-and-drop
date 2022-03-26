export const save = (key: string, obj: object) => {
  localStorage.setItem(key, JSON.stringify(obj));
}

export const load = (key: string): object | null => {
  const raw = localStorage.getItem(key);
  if(raw) {
    return JSON.parse(raw);
  }

  return null;
}
