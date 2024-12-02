import { ScanCommand,  GetItemCommand} from "dynamodb";
import { Mage, MageFromRequest } from "../types.ts";
import {
  toNewMageEntry,
  toUpdatedMageEntry,
} from "../validations/validations.ts";
import DynamodbClient from "../db/db.ts";
import { cleanItems, cleanItem } from "../utils/utils.ts";

const mages: Mage[] = [
  {
    id: "1",
    name: "Harry Potter",
    email: "harry.potter@hogwarts.com",
    roles: ["Buyer"],
    house: "Gryffindor",
    balance: 150,
    magic_level: 7,
  },
  {
    id: "2",
    name: "Draco Malfoy",
    email: "draco.malfoy@hogwarts.com",
    roles: ["Seller", "Buyer"],
    house: "Slytherin",
    balance: 200,
    magic_level: 6,
  },
  {
    id: "3",
    name: "Hermione Granger",
    email: "hermione.granger@hogwarts.com",
    roles: ["Administrator"],
    house: "Gryffindor",
    balance: 500,
    magic_level: 10,
  },
];

export const magesService = {
  getMages: async (): Promise<Mage[]> => {
    const command = new ScanCommand({
      TableName: "Mages",
    });
    const data = await DynamodbClient.send(command);
    return cleanItems(data.Items as Mage[]);
  },

  getMageById: async (id: string | undefined): Promise<Mage> =>{
    console.log(id)
    const command = new ScanCommand({
        TableName: "Mages",
        FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: id },
      },
      });
      const data = await DynamodbClient.send(command);

      return cleanItems(data.Items as Mage[])[0];

},

  createMage: (mage: MageFromRequest): Mage => {
    const newMage: Mage = {
      id: `${mages.length + 1}`,
      roles: [],
      balance: 100,
      magic_level: 1,
      ...toNewMageEntry(mage),
    };
    return newMage;
  },


  updateMageById: async (
    mageFromRequest: MageFromRequest,
    id: string | undefined,
  ): Promise<Mage> => {
    const mageById = await magesService.getMageById(id);
    if (!mageById) throw new Error(`No mage has been found by id:${id}`);
    const updatedMage = toUpdatedMageEntry(mageFromRequest, mageById);
    const index = mages.indexOf(mageById);
    mages.splice(index, 1);
    mages.push(updatedMage);
    return updatedMage;
  },
  deleteMageById: async (id: string | undefined) => {
    const mageById = await magesService.getMageById(id);
    if (!mageById) throw new Error(`No mage has been found by id:${id}`);
    const index = mages.indexOf(mageById);
    mages.splice(index, 1);
  },
};
