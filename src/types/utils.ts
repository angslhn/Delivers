export type PickNonNullable<T, K extends keyof T> = {
  [P in K]: NonNullable<T[P]>;
};

export type MakeNonNullable<T, K extends keyof T> = Omit<T, K> & PickNonNullable<T, K>;
