export type Category = {
  id: string;
  description: string;
  name: string;
};

export type ContextWithParams = {
  params: { [key: string]: string | undefined };
};
