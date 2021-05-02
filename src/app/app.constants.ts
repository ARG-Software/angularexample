const INITIAL_PAGE = 0;
const ITENS_PER_PAGE = 5;
const TOTAL_RESULTS = 0;

export const DEFAULT_PAGING = {
    CurrentIndex: INITIAL_PAGE,
    HowManyPerPage: ITENS_PER_PAGE,
    PropertyToOrderBy: 'Name',
    Total: TOTAL_RESULTS,
    Ordered: true,
    IsDescending: true
};
