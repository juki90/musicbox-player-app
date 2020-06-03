export const ADD_TO_COLLECTION = "ADD_TO_COLLECTION";
export const REMOVE_FROM_COLLECTION = "REMOVE_FROM_COLLECTION";

export const addToCollection: (item: Item) => { type: string; payload: any } = (
  item: Item
) => {
  return {
    type: ADD_TO_COLLECTION,
    payload: {
      item,
    },
  };
};

export const removeFromCollection: (
  link: string
) => { type: string; payload: any } = (link: string) => {
  return {
    type: REMOVE_FROM_COLLECTION,
    payload: {
      link,
    },
  };
};
