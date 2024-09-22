// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isError = (e: any): e is Error => {
  return (
    e &&
    e.stack &&
    e.message &&
    typeof e.stack === "string" &&
    typeof e.message === "string"
  );
};

export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};
