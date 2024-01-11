import { wait } from './common.ts';

type ScrapePaginatedRangeProps<T extends object, B extends object> = {
  scrapeFirstUrl: string;
  scrapePayload?: any;
  scrapeMethod?: 'GET' | 'POST';
  delayMs: number;
  headers: HeadersInit;
  acc?: B[];
  scrapeTotalRecordsResolver: (dataPayload: T) => number;
  scrapeNextUrlResolver: (pageNumber: number) => string | undefined;
  resolveData: (dataPayload: T) => B[];
};

export const scrapePaginatedRange: <T extends object, B extends object>(
  props: ScrapePaginatedRangeProps<T, B>
) => Promise<B[]> = async ({
  scrapeFirstUrl,
  scrapeMethod = 'GET',
  scrapePayload,
  delayMs,
  headers,
  acc = [],
  scrapeTotalRecordsResolver,
  scrapeNextUrlResolver,
  resolveData,
}) => {
  const initialRequest = await fetch(scrapeFirstUrl, {
    method: scrapeMethod,
    headers,
    body: scrapePayload ? JSON.stringify(scrapePayload) : undefined,
  });
  const initialData = await initialRequest.json();

  const totalPages = scrapeTotalRecordsResolver(initialData);

  const pages = [...Array(totalPages).keys()]
    .map(v => scrapeNextUrlResolver(v + 1))
    .filter(v => v) as string[];

  for (const page of pages) {
    const request = await fetch(page, {
      method: scrapeMethod,
      headers,
      body: scrapePayload ? JSON.stringify(scrapePayload) : undefined,
    });
    const data = await request.json();
    acc.push(...resolveData(data));
    await wait(delayMs);
  }

  return acc;
};
