import { wait } from './common.ts';

type ScrapePaginatedDeepProps<T extends object, B extends object> = {
  scrapeUrl: string;
  resolveMetaNext: (dataPayload: T) => string | undefined;
  resolveData: (dataPayload: T) => B[];
  delayMs: number;
  headers: HeadersInit;
  acc?: B[];
};

export const scrapePaginatedDeep: <T extends object, B extends object>(
  props: ScrapePaginatedDeepProps<T, B>
) => Promise<B[]> = async ({
  scrapeUrl,
  resolveMetaNext,
  resolveData,
  delayMs,
  headers,
  acc = [],
}) => {
  console.log('Started Scraping url:', scrapeUrl);

  const request = await fetch(scrapeUrl, { headers });
  const data = await request.json();
  const resolvedBody = resolveData(data);
  const nextUrl = resolveMetaNext(data);
  acc.push(...resolvedBody);

  await wait(delayMs);

  if (nextUrl) {
    return await scrapePaginatedDeep({
      scrapeUrl: nextUrl,
      resolveMetaNext,
      resolveData,
      delayMs,
      headers,
      acc,
    });
  } else {
    return acc;
  }
};
