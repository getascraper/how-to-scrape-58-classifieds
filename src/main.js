import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

Actor.main(async () => {
  const input = await Actor.getInput();
  const { city = 'bj', category = 'ershoufang', maxItems = 100 } = input;
  
  console.log(`Starting 58.com scraper for ${city} ${category}`);
  
  const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: maxItems,
    async requestHandler({ page, request, pushData }) {
      const title = await page.title();
      console.log(`Processing: ${title}`);
      
      await pushData({
        url: request.url,
        title,
        scrapedAt: new Date().toISOString(),
      });
    },
  });
  
  await crawler.run([`https://${city}.58.com/${category}/`]);
  console.log('58.com scraper finished');
});
