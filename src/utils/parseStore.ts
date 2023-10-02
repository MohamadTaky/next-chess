import { StoreStates } from "@/store/types";

export default function parseStore(store: string) {
  const parsedStore = JSON.parse(store) as StoreStates;
  parsedStore.validAttacks = new Map(Object.entries(parsedStore.validAttacks));
  parsedStore.validMoves = new Map(Object.entries(parsedStore.validMoves));
  parsedStore.validPromotions = new Map(Object.entries(parsedStore.validPromotions));
  parsedStore.specialMoves = new Map(Object.entries(parsedStore.specialMoves));
  return parsedStore;
}
