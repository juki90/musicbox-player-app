import results from "./utils/ItemListMock";
import prepeareToPagination from "../utils/prepeareToPagination";

describe("prepeareToPagination test", () => {
  const itemList = results;
  const itemCountGreater = itemList.length + 5;
  const itemCountLess = 5;

  it("Should return object with resulting 1 PAGE if second parameter is greater than item list length", () => {
    const obj = prepeareToPagination(itemList, itemCountGreater);
    expect(obj.pages).toBe(1);
  });
  it("Should return object with resulting ARRAY with length of given array as parameter", () => {
    const obj = prepeareToPagination(itemList, itemCountGreater);
    expect(obj.results.length).toBe(itemList.length);
  });

  it("Should return object with resulting 2 or more PAGES if second parameter is less than item list length", () => {
    const obj = prepeareToPagination(itemList, itemCountLess);
    expect(obj.pages).toBeGreaterThan(1);
  });
  it("Should return object with resulting with ARRAY of arrays, where last has rest number of items", () => {
    const obj = prepeareToPagination(itemList, itemCountLess);
    const lastPageResults = obj.results[obj.pages - 1];
    expect((lastPageResults as Item[]).length).toBe(
      itemList.length % itemCountLess
    );
  });
});
