"use server";

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  // check if it doesn't exist
  if (!productUrl) return;

  //   if do have a product
  try {
    // scraped product
    // connect Data Base
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;
    // const existingProduct = await Product
  } catch (error: any) {
    throw new Error(`Failed to create/update product:${error.message}`);
  }
}
