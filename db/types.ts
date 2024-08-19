import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Reports {
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
  createdAt: Generated<string | null>;
  id: Generated<number | null>;
  performanceScore: number | null;
  seoScore: number | null;
  url: string;
}

export interface DB {
  reports: Reports;
}
