const prepeareToPagination = (what: Item[], resultsPerPage = 10) => {
  let paginatedSearchResults: Item[] = [];
  let paginationPages: number = 0;

  if (what.length > resultsPerPage) {
    paginationPages =
      what.length % resultsPerPage > 0
        ? Math.floor(what.length / resultsPerPage) + 1
        : Math.floor(what.length / resultsPerPage);
    paginatedSearchResults = (what as any).reduce(
      (a: any[], c: any, i: number, arr: any[]) => {
        if (i >= paginationPages) {
          return a;
        }
        a.push(arr.slice(i * 10, (i + 1) * 10));
        return a;
      },
      []
    );
    return { results: paginatedSearchResults, pages: paginationPages };
  }
  return { results: what, pages: 1 };
};

export default prepeareToPagination;
