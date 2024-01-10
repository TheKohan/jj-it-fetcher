import { type PrismaClient } from '../../generated/client/index.d.ts';
import { JustJoinItDataModel, Offers } from './model/data-model.ts';
import { Prisma } from '../../generated/client/index.d.ts';
const getJJITPageLink = (page: number | undefined) =>
  page
    ? `
    https://api.justjoin.it/v2/user-panel/offers?employmentTypes[]=b2b&remote=true&withSalary=true&page=${page}&sortBy=published&orderBy=DESC&perPage=100&salaryCurrencies=PLN`
    : undefined;

const headers: HeadersInit = {
  Accept: 'application/json, text/plain, */*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-US,en;q=0.9,pl;q=0.8,de;q=0.7',
  'Cache-Control': 'no-cache',
  Origin: 'https://justjoin.it',
  Pragma: 'no-cache',
  Referer: 'https://justjoin.it`/',
  'Sec-Ch-Ua':
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"macOS"',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Version: '2',
  Dnt: '1',
  Cookie:
    'userUid=70821d89-adb3-42bc-ac59-2839b0c0efca; Expires=Tue, 19 Jan 2038 03:14:07 GMT; Domain=justjoin.it; Path=/;',
};

export const scrapeJJIt = async (client: PrismaClient) => {
  const data = await scrapePaginatedDeep<JustJoinItDataModel, Offers>(
    getJJITPageLink(1) as string,
    data => getJJITPageLink(data?.meta?.nextPage),
    data => data?.data,
    500
  );

  const offers: Prisma.B2BOfferCreateManyArgs = {
    data:
      data?.map(o => ({
        city: o.city,
        companyName: o.companyName,
        fromPln: Number(o.employmentTypes[0]?.from_pln) ?? 0,
        requiredSkills: JSON.stringify(o.requiredSkills),
        slug: o.slug,
        title: o.title,
        toPln: Number(o.employmentTypes[0]?.to_pln) ?? 0,
        url: 'https://justjoin.it/offers/' + o.slug,
      })) ?? [],
  };

  await client.b2BOffer.createMany(offers);

  // await Deno.writeTextFile('./scraped/jjit.json', JSON.stringify(offers), {
  //   createNew: true,
  //   append: true,
  // });

  return offers;
};

const scrapePaginatedDeep: <T extends object, B extends object>(
  scrapeUrl: string,
  resolveMetaNext: (dataPayload: T) => string | undefined,
  resolveData: (dataPayload: T) => B[],
  delayMs: number,
  acc?: B[]
) => Promise<B[]> = async (
  scrapeUrl,
  resolveMetaNext,
  resolveData,
  delayMs,
  acc = []
) => {
  console.log('Started Scraping url:', scrapeUrl);
  const request = await fetch(scrapeUrl, { headers });
  const data = await request.json();
  const resolvedBody = resolveData(data);
  const nextUrl = resolveMetaNext(data);
  acc.push(...resolvedBody);

  await wait(delayMs);

  if (nextUrl) {
    return await scrapePaginatedDeep(
      nextUrl,
      resolveMetaNext,
      resolveData,
      delayMs,
      acc
    );
  } else {
    return acc;
  }
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
