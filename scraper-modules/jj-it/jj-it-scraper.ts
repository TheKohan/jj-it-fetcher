import { type PrismaClient } from '../../generated/client/index.d.ts';
import { Prisma } from '../../generated/client/index.d.ts';
import { scrapePaginatedDeep } from '../../utils/index.ts';
import { getJJITPageLink } from './config/config.ts';
import { JustJoinItDataModel, Offers } from './model/index.ts';

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
  const data = await scrapePaginatedDeep<JustJoinItDataModel, Offers>({
    scrapeUrl: getJJITPageLink(1) as string,
    resolveNextLink: data => getJJITPageLink(data?.meta?.nextPage),
    resolveData: data => data?.data,
    delayMs: 500,
    headers,
  });

  const offers = {
    data:
      data?.map(o => ({
        city: o.city,
        companyName: o.companyName,
        fromPln: Number(o.employmentTypes[0]?.from_pln) ?? 0,
        requiredSkills: o.requiredSkills.join(','),
        slug: o.slug,
        title: o.title,
        toPln: Number(o.employmentTypes[0]?.to_pln) ?? 0,
        url: 'https://justjoin.it/offers/' + o.slug,
      })) ?? [],
  };

  await client.b2BOffer.createMany(offers);

  return offers;
};
