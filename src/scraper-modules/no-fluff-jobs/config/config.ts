import { NoFluffJobsPayload } from '../model/data-model.ts';
/**
 * Modules fetching link, adjust it to narrow or widen
 * the amount of offers that are going to be scraped
 */
export const getNoFluffJobPage = (page: number | undefined) =>
  page
    ? `
    https://nofluffjobs.com/api/search/posting?pageTo=${page}&pageSize=20&salaryCurrency=PLN&salaryPeriod=month&region=pl`
    : undefined;

/**
 * This api requires arguments to be passed in body payload
 * feel free to adjust it here
 */
export const noFluffJobsRequestPayload: NoFluffJobsPayload = {
  pageSize: 100,
  rawSearch:
    'remote backend employment=b2b category=frontend,fullstack,mobile,embedded,testing,devops,architecture,security,game-dev,artificial-intelligence,data,sys-administrator,product-management,business-intelligence,business-analyst,erp',
};
