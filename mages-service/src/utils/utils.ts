// deno-lint-ignore-file no-explicit-any
import { unmarshall } from "dynamodbUtil";

export const cleanItems = (items: any) =>
  items.map((item: any) => unmarshall(item));
