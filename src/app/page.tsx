"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";

import Image from "next/image";

import firstBanner from "@/assets/images/banner_1.jpg";
import { price, sold, title } from "@/helpers/product";

import type { JSONProduct, Product } from "@/types/global";

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<[Product]>();

  useEffect(() => {
    async function getProduct(): Promise<void> {
      const response: Response = await fetch("https://dummyjson.com/products");

      const data: JSONProduct = await response.json();

      return setProducts(data.products);
    }

    getProduct();
  }, []);

  return (
    <main className="w-full column-left gap-2 mt-2 mb-19">
      <div className="row-center h-[8.75rem] w-full px-3 overflow-hidden">
        <Image className="rounded-md" src={firstBanner} alt="banner" height={140} width={425} />
      </div>
      <div className="w-full row-evenly flex-wrap">
        {products?.slice(0, 14).map((product, index) => (
          <div
            key={product.id}
            className={`${index > 1 && "mt-3"} border-[0.025rem] border-steel-night/5 h-52 w-40 rounded-md shadow shadow-steel-night/5`}
          >
            <Image className="h-[8rem] w-full" src={product.images[0]} alt={product.title} height={128} width={160} />
            <div className="flex flex-col gap-1 mx-2">
              <span className="h-7 leading-3.5 my-auto text-[0.8rem] text-steel-night">{title(product.title)}</span>
              <span className="text-[0.85rem] font-semibold text-steel-night">{price(product.price, 16738)}</span>
              <div className="w-full row-left gap-1">
                <div className="row-center gap-1">
                  <svg className="w-3 fill-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                  <span className="text-xs mt-0.5 text-steel-night/70">{product.rating}</span>
                </div>
                <span className="text-xs text-steel-night/60">●</span>
                <span className="text-xs text-steel-night/70">{sold()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
