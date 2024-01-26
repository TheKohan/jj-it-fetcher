/**
 * Modules fetching link, adjust it to narrow or widen
 * the amount of offers that are going to be scraped
 */
export const getJJITPageLink = (page: number | undefined) =>
  page
    ? `
    https://api.justjoin.it/v2/user-panel/offers?employmentTypes[]=b2b&remote=true&withSalary=true&page=${page}&sortBy=published&orderBy=DESC&perPage=100&salaryCurrencies=PLN`
    : undefined;
