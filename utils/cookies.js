export const getCookie = (name) => {
  if (typeof document === "undefined") return null; // server safety

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";")[0]);
  }

  return null;
};
