import { unmarshall } from "dynamodbUtil";

export const cleanItems = <T>(items: Array<T>) =>
  items.map((item: T) => unmarshall(item));

export const cleanItem = <T>(item: T) => unmarshall(item);
