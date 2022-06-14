export type RequestToForm<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? RequestToForm<T[K]> : T[K] | null;
};
