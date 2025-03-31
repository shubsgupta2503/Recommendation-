import { 
  Apple, 
  Carrot, 
  Milk,
  Drumstick, 
  Fish, 
  Croissant,
  Cherry,
  Beef,
  Coffee,
  Egg
} from "lucide-react";

// Import React for JSX elements
import React from 'react';

export const data = {
  categories: [
    {
      name: "Fresh Fruits",
      icon: React.createElement(Apple, { className: "text-primary text-xl" }),
      bgColor: "bg-primary/10"
    },
    {
      name: "Vegetables",
      icon: React.createElement(Carrot, { className: "text-secondary text-xl" }),
      bgColor: "bg-secondary/10"
    },
    {
      name: "Dairy Products",
      icon: React.createElement(Milk, { className: "text-accent text-xl" }),
      bgColor: "bg-accent/10"
    },
    {
      name: "Pulses & Lentils",
      icon: React.createElement(Coffee, { className: "text-red-500 text-xl" }),
      bgColor: "bg-red-100"
    },
    {
      name: "Rice & Grains",
      icon: React.createElement(Cherry, { className: "text-blue-500 text-xl" }),
      bgColor: "bg-blue-100"
    },
    {
      name: "Spices & Masalas",
      icon: React.createElement(Egg, { className: "text-yellow-500 text-xl" }),
      bgColor: "bg-yellow-100"
    }
  ],
  bestDeals: [
    {
      id: 1,
      name: "Toor Dal (Arhar)",
      description: "1 kg, Premium Quality",
      image: "https://images.unsplash.com/photo-1613758235402-745466bb7efe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
      badge: {
        text: "SAVE 15%",
        type: "sale"
      },
      price: "₹149",
      stores: [
        {
          name: "BigBasket",
          logo: "https://logo.clearbit.com/bigbasket.com",
          price: "₹175"
        },
        {
          name: "JioMart",
          logo: "https://logo.clearbit.com/jiomart.com",
          price: "₹179",
          originalPrice: "₹199"
        }
      ]
    },
    {
      id: 2,
      name: "Basmati Rice",
      description: "5 kg, Aged Premium",
      image: "https://images.unsplash.com/photo-1594064424123-5bed17316625?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
      badge: {
        text: "BEST PRICE",
        type: "best-price"
      },
      price: "₹499",
      stores: [
        {
          name: "Amazon Fresh",
          logo: "https://logo.clearbit.com/amazon.in",
          price: "₹499"
        },
        {
          name: "Flipkart Grocery",
          logo: "https://logo.clearbit.com/flipkart.com",
          price: "₹549"
        }
      ]
    },
    {
      id: 3,
      name: "Chakki Atta (Whole Wheat)",
      description: "10 kg, Fresh Stone Ground",
      image: "https://images.unsplash.com/photo-1603046891744-17c593545f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
      badge: {
        text: "TRENDING",
        type: "trending"
      },
      price: "₹349",
      stores: [
        {
          name: "DMart",
          logo: "https://logo.clearbit.com/dmartindia.com",
          price: "₹349"
        },
        {
          name: "Blinkit",
          logo: "https://logo.clearbit.com/blinkit.com",
          price: "₹389"
        }
      ]
    },
    {
      id: 4,
      name: "Garam Masala",
      description: "100g, Organic Spice Mix",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd0d65?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
      badge: {
        text: "SAVE 25%",
        type: "sale"
      },
      price: "₹89",
      stores: [
        {
          name: "Zepto",
          logo: "https://logo.clearbit.com/zepto.co",
          price: "₹99"
        },
        {
          name: "Grofers",
          logo: "https://logo.clearbit.com/grofers.com",
          price: "₹119",
          originalPrice: "₹129"
        }
      ]
    }
  ],
  shoppingLists: [
    {
      id: 1,
      name: "Monthly Essentials",
      itemCount: 15,
      lastUpdated: "2 days ago",
      items: [
        {
          name: "Amul Milk (1 liter)",
          price: "₹68",
          completed: true
        },
        {
          name: "Moong Dal (1 kg)",
          price: "₹139",
          completed: false
        },
        {
          name: "Paneer (200g)",
          price: "₹80",
          completed: false
        }
      ],
      total: "₹1,893"
    },
    {
      id: 2,
      name: "Diwali Shopping",
      itemCount: 8,
      lastUpdated: "1 week ago",
      items: [
        {
          name: "Dry Fruits Mix (500g)",
          price: "₹399",
          completed: true
        },
        {
          name: "Ghee (1 liter)",
          price: "₹549",
          completed: true
        },
        {
          name: "Besan (1 kg)",
          price: "₹109",
          completed: false
        }
      ],
      total: "₹2,650"
    },
    {
      id: 3,
      name: "Healthy Diet Plan",
      itemCount: 12,
      lastUpdated: "Created today",
      items: [
        {
          name: "Brown Rice (2 kg)",
          price: "₹180",
          completed: false
        },
        {
          name: "Palak/Spinach (500g)",
          price: "₹49",
          completed: false
        },
        {
          name: "Flax Seeds (250g)",
          price: "₹129",
          completed: false
        }
      ],
      total: "₹1,425"
    }
  ],
  priceComparison: [
    {
      name: "BigBasket",
      logo: "https://logo.clearbit.com/bigbasket.com",
      distance: "4.5",
      price: "₹59",
      isLowest: true,
      difference: "₹0"
    },
    {
      name: "JioMart",
      logo: "https://logo.clearbit.com/jiomart.com",
      distance: "3.2",
      price: "₹65",
      isLowest: false,
      difference: "₹6"
    },
    {
      name: "Amazon Fresh",
      logo: "https://logo.clearbit.com/amazon.in",
      distance: "5.1",
      price: "₹79",
      isLowest: false,
      difference: "₹20"
    }
  ],
  relatedProducts: [
    {
      name: "Muesli with Nuts",
      image: "https://images.unsplash.com/photo-1589827577276-3eafa9627989?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      price: "₹249",
      storeName: "BigBasket",
      storeLogo: "https://logo.clearbit.com/bigbasket.com"
    },
    {
      name: "Real Fruit Juice",
      image: "https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      price: "₹99",
      storeName: "Blinkit",
      storeLogo: "https://logo.clearbit.com/blinkit.com"
    },
    {
      name: "Maggi Noodles (Pack of 5)",
      image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      price: "₹95",
      storeName: "JioMart",
      storeLogo: "https://logo.clearbit.com/jiomart.com"
    },
    {
      name: "Red Label Tea",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      price: "₹245",
      storeName: "DMart",
      storeLogo: "https://logo.clearbit.com/dmartindia.com"
    },
    {
      name: "Amul Dahi (Yogurt)",
      image: "https://images.unsplash.com/photo-1571212515416-fca973c5d67f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      price: "₹35",
      storeName: "Flipkart Grocery",
      storeLogo: "https://logo.clearbit.com/flipkart.com"
    },
    {
      name: "Dabur Organic Honey",
      image: "https://images.unsplash.com/photo-1596451190630-186aff535bf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      price: "₹225",
      storeName: "Amazon Fresh",
      storeLogo: "https://logo.clearbit.com/amazon.in"
    }
  ]
};