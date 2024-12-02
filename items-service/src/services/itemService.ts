import { Item } from "../types.ts"

const items: Item[] = [
  {
    id: "101",
    name: "Elder Wand",
    description: "The most powerful wand in existence.",
    category: "Wands",
    price: 1000,
    approval_status: "Pending",
    image_url: "images/wands/imperial_grey_and_silver.webp",
    seller_id: 2,
  },
  {
    id: "102",
    name: "Polyjuice Potion",
    description: "Allows temporary transformation into another person.",
    category: "Potions",
    price: 300,
    approval_status: "Approved",
    image_url: "images/potions/edurus.webp",
    seller_id: 2,
  },
  {
    id: "103",
    name: "Advanced Spellbook",
    description: "Contains advanced spells for expert wizards.",
    category: "Books",
    price: 150,
    approval_status: "Rejected",
    image_url: "images/books/generic_book.webp",
    seller_id: 4,
  },
  {
    id: "104",
    name: "Dragon Egg",
    description: "A rare magical creature egg.",
    category: "Creatures",
    price: 500,
    approval_status: "Pending",
    image_url: "images/creatures/graphorn.webp",
    seller_id: 5,
  },
  {
    id: "105",
    name: "Invisibility Cloak",
    description: "Grants the wearer complete invisibility.",
    category: "Wands",
    price: 750,
    approval_status: "Approved",
    image_url: "images/wands/regal_black.webp",
    seller_id: 2,
  },
]

export const itemsService = {
  getAllItems: (): Item[] => items,
}