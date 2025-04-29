import requests
from bs4 import BeautifulSoup
import time
import random
from fake_useragent import UserAgent
import json

def get_amazon_products(pages=2):
    base_url = "https://www.amazon.in/s?k=groceries+vegetables+and+fruits&crid=NNXNSCYSXO13&sprefix=groceries+vegetables+and+fruits%2Caps%2C231&ref=nb_sb_noss_2"
    ua = UserAgent()
    
    headers = {
        'User-Agent': ua.random,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Referer': 'https://www.google.com/'
    }
    
    all_products = []
    
    for page in range(1, pages + 1):
        url = f"{base_url}&page={page}" if page > 1 else base_url
        
        try:
            time.sleep(random.uniform(3, 6))
            response = requests.get(url, headers=headers, timeout=15)
            
            if response.status_code != 200:
                print(f"Failed to fetch page {page}. Status code: {response.status_code}")
                continue
                
            soup = BeautifulSoup(response.content, 'html.parser')
            product_containers = soup.select('div[data-component-type="s-search-result"]')
            
            print(f"Page {page} - Found {len(product_containers)} potential product containers")
            
            for i, product in enumerate(product_containers, 1):
                try:
                    title_selectors = [
                        'h2.a-size-mini a span',
                        'span.a-text-normal',
                        'h2 span',
                        'div.s-title-instructions span',
                        'a.a-link-normal span'
                    ]
                    
                    title = None
                    for selector in title_selectors:
                        title_elem = product.select_one(selector)
                        if title_elem and title_elem.text.strip():
                            title = title_elem.text.strip()
                            print(f"Page {page} - Product {i}: Title found with selector '{selector}': {title}")
                            break
                    
                    if not title:
                        print(f"Page {page} - Product {i}: No title found. Product HTML:")
                        print(product.prettify()[:500])
                        continue
                    
                    # Price extraction with multiple fallbacks
                    price_selectors = [
                        'span.a-price > span.a-offscreen',
                        'span.a-price-whole',
                        'span.a-color-price'
                    ]
                    price = 'N/A'
                    for selector in price_selectors:
                        price_elem = product.select_one(selector)
                        if price_elem and price_elem.text.strip():
                            price = price_elem.text.strip()
                            break
                    
                    rating_elem = product.select_one('span.a-icon-alt')
                    rating = rating_elem.text.strip() if rating_elem else 'N/A'
                    
                    reviews_elem = product.select_one('span.a-size-base.s-underline-text')
                    reviews = reviews_elem.text.strip() if reviews_elem else 'N/A'
                    
                    link_elem = product.select_one('a.a-link-normal.s-no-outline')
                    url = 'https://www.amazon.in' + link_elem['href'] if link_elem else 'N/A'
                    
                    image_selectors = [
                        'img.s-image',  
                        'div.s-product-image-container img',
                        'img.a-dynamic-image'
                    ]
                    image_url = 'N/A'
                    for selector in image_selectors:
                        image_elem = product.select_one(selector)
                        if image_elem and image_elem.get('src'):
                            image_url = image_elem['src']
                            print(f"Page {page} - Product {i}: Image found with selector '{selector}': {image_url}")
                            break
                    
                    product_data = {
                        'title': title,
                        'price': price,
                        'rating': rating,
                        'reviews': reviews,
                        'url': url,
                        'image_url': image_url
                    }
                    all_products.append(product_data)
                    print(f"Page {page} - Product {i}: Added product: {title}")
                    
                except Exception as e:
                    print(f"Page {page} - Product {i}: Error parsing: {e}")
                    continue
                    
            print(f"Scraped page {page}: {len(product_containers)} items found")
            
        except Exception as e:
            print(f"Error fetching page {page}: {e}")
            continue
    
    with open('amazon_milk_products.json', 'w', encoding='utf-8') as f:
        json.dump(all_products, f, ensure_ascii=False, indent=4)
    
    print(f"Total products scraped: {len(all_products)}")
    return all_products

def main():
    products = get_amazon_products(pages=3)
    
    for i, product in enumerate(products[:5], 1):
        print(f"\nProduct {i}:")
        print(f"Title: {product['title']}")
        print(f"Price: {product['price']}")
        print(f"Rating: {product['rating']}")
        print(f"Reviews: {product['reviews']}")
        print(f"URL: {product['url']}")
        print(f"Image URL: {product['image_url']}")

if __name__ == "__main__":
    main()