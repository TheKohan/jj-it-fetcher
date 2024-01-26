import { wait } from './common.ts';

type ScrapePaginatedDeepProps<T extends object, B extends object> = {
  scrapeUrl: string;
  scrapePayload?: any;
  scrapeMethod?: 'GET' | 'POST';
  delayMs: number;
  headers: Record<string, string>;
  acc?: B[];
  resolveNextLink: (dataPayload: T) => string | undefined;
  resolveData: (dataPayload: T) => B[];
};

/**
 *  Function that recursively scrapes pages that
 *  have explicit next url in their payload (or can be implicitly calculated)
 */
export const scrapePaginatedDeep: <T extends object, B extends object>(
  props: ScrapePaginatedDeepProps<T, B>
) => Promise<B[]> = async ({
  scrapeUrl,
  scrapeMethod = 'GET',
  scrapePayload,
  delayMs,
  headers,
  acc = [],
  resolveNextLink,
  resolveData,
}) => {
  console.log('Started Scraping url:', scrapeUrl);

  const request = await fetch(scrapeUrl, {
    method: scrapeMethod,
    headers,
    body: scrapePayload ? JSON.stringify(scrapePayload) : undefined,
  });
  const data = await request.json();
  const resolvedBody = resolveData(data);
  const nextUrl = resolveNextLink(data);
  acc.push(...resolvedBody);

  await wait(delayMs);

  if (nextUrl) {
    return await scrapePaginatedDeep({
      scrapeUrl: nextUrl,
      resolveNextLink,
      resolveData,
      delayMs,
      headers,
      acc,
    });
  } else {
    return acc;
  }
};
