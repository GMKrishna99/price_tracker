import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  // check url already exists
  if (!url) return;

  //  BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // extract the product title and other information
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    // Original price
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );
    // out of stock
    const outOfStock =
      $("#availability span").text().trim().toLocaleLowerCase() ===
      "currently unavailable";
    // get image
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    // currency
    const currency = extractCurrency($(".a-price-symbol"));
    // discount rate
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
    // image
    const imageUrls = Object.keys(JSON.parse(images));
    // construct data object with scrapper information
    const data = {
      url,
      currency: currency || "$",
      Image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: 0,
      stars: 4.5,
      isOutOFStock: outOfStock,
    };
    console.log(data);
  } catch (error: any) {
    throw new Error(`Failed to scrape product:${error.message}`);
  }
}
