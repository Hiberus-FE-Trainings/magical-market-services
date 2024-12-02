export type Mage = {
    id: number;
    name: string;
    email: string,
    roles: string[],
    house: string,
    balance: number,
    magic_level: number
  }
  
  export type ContextWithParams =  {
    params: { [key: string]: string | undefined };
  }
  