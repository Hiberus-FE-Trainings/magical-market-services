import { Mage, MageFromRequest } from "../types.ts";
import { toNewMageEntry, toUpdatedMageEntry } from "../validations/validations.ts";

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
  getMages: (): Mage[] => mages,

  getMageById: (id: string | undefined): Mage | undefined => mages.find((mage) => mage.id === id),

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
  updateMageById: (mageFromRequest: MageFromRequest, id: string | undefined): Mage => {
    const mageById = magesService.getMageById(id);
    if (!mageById) throw new Error(`No mage has been found by id:${id}`);
    const updatedMage = toUpdatedMageEntry(mageFromRequest, mageById);
    const index = mages.indexOf(mageById);
    mages.splice(index, 1);
    mages.push(updatedMage);
    return updatedMage;
  },
};
