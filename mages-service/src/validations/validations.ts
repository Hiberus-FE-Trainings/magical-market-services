import {
  House,
  HousesKeys,
  Mage,
  MageFromRequest,
  NewMageEntry,
} from "../types.ts";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isString = (param: string): boolean => typeof param === "string";

const isValidEmail = (email: string): boolean => emailRegex.test(email);

const isHouseName = (houseNameFromRequest: string): boolean =>
  Object.values(HousesKeys).includes(houseNameFromRequest as House);

const parseString = (stringParam: string, param: string): string => {
  if (!isString(stringParam)) throw new Error(`Incorrect or missing ${param}`);
  return stringParam as string;
};

const parseEmail = (emailParam: string): string => {
  if (!isValidEmail(emailParam)) {
    throw new Error("Incorrect or missing email");
  }
  return emailParam as string;
};

const parseHouseName = (houseNameFromRequest: string): House => {
  if (!isHouseName(houseNameFromRequest)) {
    throw new Error("Incorrect or missing house");
  }
  return houseNameFromRequest as House;
};

export const toNewMageEntry = (mageFromRequest: MageFromRequest) => {
  const newMage: NewMageEntry = {
    name: parseString(mageFromRequest.name, "name"),
    email: parseEmail(mageFromRequest.email),
    house: parseHouseName(mageFromRequest.house),
  };

  return newMage;
};

export const toUpdatedMageEntry = (
  mageFromRequest: Partial<MageFromRequest>,
  mageToBeUpdated: Mage,
) => {
  const { name, email, house } = mageFromRequest;
  const updatedMage: Mage = {
    ...mageToBeUpdated,
    name: name ? parseString(name, "name") : mageToBeUpdated.name,
    email: email ? parseEmail(email) : mageToBeUpdated.email,
    house: house ? parseHouseName(house) : mageToBeUpdated.house,
  };
  return updatedMage;
};
