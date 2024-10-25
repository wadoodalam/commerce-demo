import { Product } from "lib/shopify/types";
import OpenAI from "openai";
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const FilteredProductsSchema = z.object({
  filtered_products: z.array(z.string())
});


export async function getFilteredProducts(products: Product[], searchQuery: string | undefined): Promise<Product[]> {
  if (searchQuery === null) {
    return products;
  }
  
  const simplifiedProducts = products.map(product => ({
    id: product.id,
    title: product.title,
    description: product.description
  }));


  const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

  const chatCompetion = await openai.beta.chat.completions.parse({
    messages: [
      {role: "user", content: searchQuery ?? ""},
      {role: "system", content: `The input JSON is here: ${JSON.stringify(simplifiedProducts)}`},
      {role: "system", content: "You should act as a fashion designer. Based on the descriptions of the products, you should try to suggest pairing outfits based on the description and the user query. Return the result using the IDs from the JSON input."}
    ],
    model: "gpt-4o-mini",
    temperature: 0,
    response_format: zodResponseFormat(FilteredProductsSchema, "product_list") 
  });


  const results = FilteredProductsSchema.parse(chatCompetion.choices[0].message.parsed);
  const filteredProducts = results.filtered_products;

  return products.filter(product => filteredProducts.some(filteredProductId => filteredProductId === product.id));
}