// deno-lint-ignore-file no-explicit-any
import { unmarshall } from "util-dynamodb";

export const unmarshallDataFromDB = (data: any) => {
  if (data.Items) {
    // Convierte los datos con unmarshall
    const cleanData = data.Items.map((item: any) => unmarshall(item));
    return cleanData;
  } else {
    console.log("No se encontraron elementos.");
  }
};
