"use server";

import { User } from "@/types";
import Product from "../models/Product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";
import { generateEmailBody } from "../nodemailer";

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
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      // modifying the product object

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product:${error.message}`);
  }
}

// get product by ID
export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

// get all products
export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}
// get similar products
export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);
    if (!currentProduct) return null;
    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);
    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);
    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );
    if (!userExists) {
      product.users.push({ email: userEmail });
      await product.save();

      const emailContent = generateEmailBody(product, "WELCOME");
    }
  } catch (error) {
    console.log(error);
  }
}
