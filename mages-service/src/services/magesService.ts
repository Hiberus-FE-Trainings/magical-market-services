


import { Mage } from "../types.ts";


const mages: Mage[] = [
    {
        id: 1,
        name: "Harry Potter",
        email: "harry.potter@hogwarts.com",
        roles: ["Buyer"],
        house: "Gryffindor",
        balance: 150,
        magic_level: 7
    },
    {
        id: 2,
        name: "Draco Malfoy",
        email: "draco.malfoy@hogwarts.com",
        roles: ["Seller", "Buyer"],
        house: "Slytherin",
        balance: 200,
        magic_level: 6
    },
    {
        id: 3,
        name: "Hermione Granger",
        email: "hermione.granger@hogwarts.com",
        roles: ["Administrator"],
        house: "Gryffindor",
        balance: 500,
        magic_level: 10
    }
];


export const magesService = {

  getMages: (): Mage[] => mages,

  getMageById: (id: number): Mage | undefined => mages.find((mage) => mage.id === id),
};
