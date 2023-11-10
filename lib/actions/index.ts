"use server";

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  // check if it doesn't exist
  if (!productUrl) return;

  //   if do have a product
  try {
    // scraped product
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
  } catch (error: any) {
    throw new Error(`Failed to create/update product:${error.message}`);
  }
}
