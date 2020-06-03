import { ADD_TO_COLLECTION, REMOVE_FROM_COLLECTION } from "../actions";

const initialState: StateProps = {
  collection: [],
};

function rootReducer(state: StateProps = initialState, action: any) {
  switch (action.type) {
    case ADD_TO_COLLECTION:
      let withAddedToCollection = [
        action.payload.item,
        ...state.collection,
      ].sort((a: Item, b: Item) => {
        return a.added.getTime() - b.added.getTime();
      });
      withAddedToCollection = withAddedToCollection.map(
        (c: Item, i: number) => {
          const cl = c;
          cl.id = i;
          return cl;
        }
      );
      return {
        ...state,
        collection: withAddedToCollection,
      };
    case REMOVE_FROM_COLLECTION:
      let withRemovedCollection = [...state.collection].filter((e) => {
        return e.link !== action.payload.link;
      });

      withRemovedCollection = withRemovedCollection.map(
        (c: Item, i: number) => {
          const cl = c;
          cl.id = i;
          return cl;
        }
      );
      return {
        ...state,
        collection: withRemovedCollection,
      };
  }

  return state;
}

export default rootReducer;
