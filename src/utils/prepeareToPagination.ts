const prepeareToPagination: (
  what: Item[],
  resultsPerPage?: number
) => { results: Item[] | Item[][]; pages: number } = (
  what: Item[],
  resultsPerPage = 10
) => {
  let paginationPages = 0;

  if (what.length > resultsPerPage) {
    const paginatedSearchResults: Item[][] = [];

    paginationPages =
      what.length % resultsPerPage > 0
        ? Math.floor(what.length / resultsPerPage) + 1
        : Math.floor(what.length / resultsPerPage);
    (what as Item[]).forEach((it: Item, i: number) => {
      if (i >= paginationPages) {
        return it;
      }
      paginatedSearchResults.push(
        what.slice(i * resultsPerPage, (i + 1) * resultsPerPage)
      );
      return it;
    }, []);
    return { results: paginatedSearchResults, pages: paginationPages };
  }
  return { results: what, pages: 1 };
};

export default prepeareToPagination;
