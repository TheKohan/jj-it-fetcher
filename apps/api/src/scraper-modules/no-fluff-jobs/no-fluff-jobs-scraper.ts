import type { PrismaClient } from "@prisma-client";
import {
  getNoFluffJobPage,
  noFluffJobsRequestPayload,
} from "./config/index.ts";

import { scrapePaginatedRange } from "../utils/scrape-paginated-range.ts";
import type { NoFluffJobs, Posting } from "./model/data-model.ts";

const headers = {
  Accept: "application/json, text/plain, */*",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  "Cache-Control": "no-cache",
  "Content-Length": "46",
  "Content-Type": "application/infiniteSearch+json",
  Cookie:
    "AMP_MKTG_53ff6cd964=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnd3dy5nb29nbGUuY29tJTJGJTIyJTJDJTIycmVmZXJyaW5nX2RvbWFpbiUyMiUzQSUyMnd3dy5nb29nbGUuY29tJTIyJTdE; OptanonAlertBoxClosed=2023-10-20T11:18:28.978Z; nfj_consents={%22consent_initialized%22:true%2C%22consent_analytics_storage%22:true%2C%22prev_consent_analytics_storage%22:false%2C%22consent_analytics_storage_date%22:%222023-04-17T08:47:22.577Z%22%2C%22prev_consent_analytics_storage_date%22:%222023-04-17T08:46:30.190Z%22%2C%22consent_ad_storage%22:true%2C%22prev_consent_ad_storage%22:false%2C%22consent_ad_storage_date%22:%222023-04-17T08:47:22.577Z%22%2C%22prev_consent_ad_storage_date%22:%222023-04-17T08:46:30.190Z%22%2C%22consent_functionality_storage%22:true%2C%22prev_consent_functionality_storage%22:false%2C%22consent_functionality_storage_date%22:%222023-04-17T08:47:22.577Z%22%2C%22prev_consent_functionality_storage_date%22:%222023-04-17T08:46:30.190Z%22%2C%22first_consent_selection%22:false%2C%22selection_variant%22:%22Banner%20Accept%20Cookies%22%2C%22onetrust_consent_id%22:%22ec8429cc-fb68-4623-aa4c-5b99038196b2%22%2C%22consent_selection_date%22:%222023-04-17T08:47:22.577Z%22%2C%22prev_consent_selection_date%22:%222023-04-17T08:46:30.190Z%22%2C%22onetrust_geolocation%22:%22PL%22}; nfj_new_user=true; nfj_abt=pageload%2C0%2C2; nfj_user_id=142956e8-a090-4601-9368-7e67d3d1b24f; nfj_session_id=434c5d11-3884-4080-bda3-6ab4881dd0de.1704977539327; nfj_visited_pl=true; _dcid=142956e8-a090-4601-9368-7e67d3d1b24f; lastSearches=true; country_iso=undefined; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jan+11+2024+13%3A53%3A10+GMT%2B0100+(Central+European+Standard+Time)&version=202310.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=ec8429cc-fb68-4623-aa4c-5b99038196b2&interactionCount=2&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&geolocation=PL%3B02&AwaitingReconsent=false; AMP_53ff6cd964=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjIxNDI5NTZlOC1hMDkwLTQ2MDEtOTM2OC03ZTY3ZDNkMWIyNGYlMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzA0OTc3NTM5MzI3JTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlN0Q=; nfj_last=1704977590531; _dd_s=rum=2&id=3aa62ff8-d26d-40f2-a82c-9354e56d1e1e&created=1704977539522&expire=1704978528921",
  Dnt: "1",
  "Nfj-Global-Context":
    '{"region":"PL","lang":"pl","global_is_employer_logged_in":false,"global_is_candidate_logged_in":false,"global_internal_traffic":false,"global_partnerId":null,"global_partnerInternalTraffic":false,"global_url":"https://nofluffjobs.com/pl/?criteria=employment%3Db2b&page=3","global_windowResolution":"681x1310","global_pixelRatio":1,"global_screenWidth":3440,"global_screenHeight":1330,"global_deviceCategory":"desktop","global_deviceFamily":"Mac OS","global_userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36","global_company_domain":null}',
  Origin: "https://nofluffjobs.com",
  Pragma: "no-cache",
  Referer: "https://nofluffjobs.com/pl/?criteria=employment%3Db2b&page=3",
  "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "X-Datadog-Origin": "rum",
  "X-Datadog-Parent-Id": "4818800802830297234",
  "X-Datadog-Sampling-Priority": "1",
  "X-Datadog-Trace-Id": "1966225189010830863",
};

export const scrapeNoFluffJobs = async (client: PrismaClient) => {
  const data = await scrapePaginatedRange<NoFluffJobs, Posting>({
    scrapeFirstUrl: getNoFluffJobPage(1) as string,
    scrapeMethod: "POST",
    scrapePayload: noFluffJobsRequestPayload,
    scrapeTotalRecordsResolver: data => data.totalPages,
    scrapeNextUrlResolver: pageNumber => getNoFluffJobPage(pageNumber),
    resolveData: data => data?.postings,
    delayMs: 500,
    headers,
  });

  const offers = {
    data:
      data?.map(o => ({
        city: o.location.places[0].city ?? "null",
        fromPln: Number(o.salary.from) ?? 0,
        companyName: o.name,
        requiredSkills: o.tiles.values.map(t => t.value).join(","),
        slug: o.url,
        title: o.title,
        toPln: Number(o.salary.to) ?? 0,
        url: `https://nofluffjobs.com/pl/job/${o.url}`,
        publishedAt: new Date(o.posted),
      })) ?? [],
  };

  await client.$transaction(
    offers.data.map(offer =>
      client.b2BOffer.upsert({
        where: { url: offer.url },
        update: offer,
        create: offer,
      })
    )
  )

  return offers.data;
};
