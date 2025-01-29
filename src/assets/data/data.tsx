import livingroom from "../category/livingroom.webp";
import bedroom from "../category/bedroom (1).webp";
import diningroom from "../category/dinning room.webp";
import office from "../category/ofiice.webp";
import outdoor from "../category/outdoor (3).webp";
import decor from "../category/decor.webp";
import armchaira from "../products/armchair-a.webp";
import armchairb from "../products/armchair-b.webp";
import armchairc from "../products/armchair-c.png";
import beda from "../products/bed-a.webp";
import bedb from "../products/bed-b.webp";
import bedc from "../products/bed-c.webp";
import coffeetablea from "../products/coffeetable-a.webp";
import coffeetableb from "../products/coffeetable-b.webp";
import coffeetablec from "../products/coffeetable-c.webp";
import deska from "../products/desk-a.webp";
import deskb from "../products/desk-b.webp";
import deskc from "../products/desk-c.webp";
import dinninga from "../products/dinning-a.webp";
import dinningb from "../products/dinning-b.webp";
import dinningc from "../products/dinning-c.webp";
import sofaa from "../products/sofa-a.jpg";
import sofab from "../products/sofa-b.jpg";
import sofac from "../products/sofa-c.png";
import loungechaira from "../products/loungechair-a (1).webp";
import loungechairb from "../products/loungechair-b.webp";
import loungechairc from "../products/loungechair-c.png";
import nightstanda from "../products/nightstand-a.png";
import nightstandb from "../products/nightstand-b.png";
import nightstandc from "../products/nightstand-c.png";
import outdoordinninga from "../products/outdoordinning-a.png";
import outdoordinningb from "../products/outdoordinning-b.png";
import outdoordinningc from "../products/outdoordinning-c.png";
import bookshelfa from "../products/bookshelf-a.webp";
import bookshelfb from "../products/bookshelf-b.png";
import bookshelfc from "../products/bookshelf-c.png";
import floorlampa from "../products/floorlamp-a.png";
import floorlampb from "../products/floorlamp-b.png";
import floorlampc from "../products/floorlamp-c.png";

export const data = {
  storeDetails: {
    name: "Home of Design",
    description: "Premium furniture designs crafted for comfort and elegance."
  },
  categories: [
    {
      id: 1,
      image: livingroom,
      name: "Living Room",
      description: "Stylish sofas, coffee tables, and entertainment units."
    },
    {
      id: 2,
      image: bedroom,
      name: "Bedroom",
      description: "Comfortable beds, nightstands, and wardrobes."
    },
    {
      id: 3,
      image: diningroom,
      name: "Dining Room",
      description: "Elegant dining tables, chairs, and cabinets."
    },
    {
      id: 4,
      image: office,
      name: "Office",
      description: "Modern desks, ergonomic chairs, and storage units."
    },
    {
      id: 5,
      image: outdoor,
      name: "Outdoor",
      description: "Durable and stylish patio furniture for outdoor spaces."
    },
    {
      id: 6,
      image: decor,
      name: "Decor & Accessories",
      description: "Lamps, rugs, wall art, and other decorative elements."
    }
  ],
  products: [
    {
      id: 101,
      name: "Luxury Leather Sofa",
      category: "Living Room",
      price: {
        oldPrice: 1500.0,
        newPrice: 1200.0,
        currency: "USD"
      },
      rating: 4,
      tags: ["luxury", "leather", "sofa"],
      features: ["Premium leather", "Plush cushions", "Durable frame"],
      description:
        "A premium leather sofa with plush cushions and sleek design.",
      mainImage: sofaa,
      images: [sofab, sofac],
      inStock: true,
      featured: true,
      recommended: true,
      bestSelling: true,
      topProduct: false,
      additionalInformation: {
        dimensions: "85 x 35 x 30 inches",
        material: "100% genuine leather",
        colorOptions: ["Black", "Brown"],
        warranty: "5 years on frame and cushions"
      },
      reviews: [
        {
          user: "John Doe",
          rating: 5,
          comment: "Beautiful design and super comfortable.",
          image: "https://www.furnistyle.com/reviews/johndoe.jpg"
        },
        {
          user: "Jane Smith",
          rating: 4,
          comment: "Great quality, but delivery was slow.",
          image: "https://www.furnistyle.com/reviews/janesmith.jpg"
        }
      ]
    },
    {
      id: 102,
      name: "Elegant Velvet Armchair",
      category: "Living Room",
      rating: 5,
      price: {
        oldPrice: 700.0,
        newPrice: 550.0,
        currency: "USD"
      },
      tags: ["velvet", "armchair", "modern"],
      features: [
        "Soft velvet upholstery",
        "Stylish design",
        "Durable wooden frame"
      ],
      description:
        "Elegant velvet armchair that brings comfort and sophistication to your living room.",
      mainImage: armchaira,
      images: [armchairb, armchairc],
      inStock: true,
      recommended: false,
      bestSelling: true,
      topProduct: false,
      featured: true,
      additionalInformation: {
        dimensions: "32 x 30 x 38 inches",
        material: "Velvet fabric, wooden legs",
        colorOptions: ["Emerald Green", "Royal Blue", "Gray"],
        warranty: "3 years upholstery warranty"
      },
      reviews: [
        {
          user: "Michael Brown",
          rating: 5,
          comment: "Perfect size and great quality.",
          image: "https://www.furnistyle.com/reviews/michaelbrown.jpg"
        }
      ]
    },
    {
      id: 103,
      name: "Wooden Dining Table Set",
      category: "Dining Room",
      rating: 4,
      price: {
        oldPrice: 1100.0,
        newPrice: 950.0,
        currency: "USD"
      },
      tags: ["wood", "dining", "table set"],
      features: ["Solid wood", "Seats six", "Scratch-resistant finish"],
      description: "Solid wood dining table with six matching chairs.",
      mainImage: dinninga,
      images: [dinningb, dinningc],
      inStock: true,
      recommended: true,
      bestSelling: false,
      topProduct: false,
      featured: true,
      additionalInformation: {
        dimensions: "72 x 38 x 30 inches",
        material: "High-quality oak wood",
        colorOptions: ["Natural Wood", "Dark Walnut"],
        warranty: "3 years against manufacturing defects"
      },
      reviews: [
        {
          user: "Alice Brown",
          rating: 5,
          comment: "Perfect for family dinners!",
          image: "https://www.furnistyle.com/reviews/alicebrown.jpg"
        }
      ]
    },
    {
      id: 104,
      name: "Modern Coffee Table",
      rating: 4,
      category: "Living Room",
      price: {
        oldPrice: 400.0,
        newPrice: 350.0,
        currency: "USD"
      },
      tags: ["coffee table", "modern", "minimalist"],
      features: ["Tempered glass top", "Stainless steel legs", "Easy to clean"],
      description:
        "A stylish coffee table with a tempered glass top and sleek design.",
      mainImage: coffeetablea,
      images: [coffeetableb, coffeetablec],
      inStock: true,
      recommended: false,
      featured: true,
      bestSelling: true,
      topProduct: false,
      additionalInformation: {
        dimensions: "40 x 20 x 18 inches",
        material: "Tempered glass, stainless steel",
        colorOptions: ["Transparent", "Black"],
        warranty: "2 years on manufacturing defects"
      },
      reviews: [
        {
          user: "Sandra Lee",
          rating: 4,
          comment: "Looks great in my living room.",
          image: "https://www.furnistyle.com/reviews/sandralee.jpg"
        }
      ]
    },
    {
      id: 105,
      name: "Queen Size Platform Bed",
      category: "Bedroom",
      rating: 4,
      price: {
        oldPrice: 1300.0,
        newPrice: 1150.0,
        currency: "USD"
      },
      tags: ["bed", "platform", "modern"],
      features: ["Sturdy frame", "Upholstered headboard", "Easy assembly"],
      description:
        "Modern queen-sized platform bed with a comfortable upholstered headboard.",
      mainImage: beda,
      images: [bedb, bedc],
      inStock: true,
      recommended: true,
      featured: false,
      bestSelling: true,
      topProduct: true,
      additionalInformation: {
        dimensions: "80 x 60 x 45 inches",
        material: "Wood, fabric upholstery",
        colorOptions: ["Gray", "Beige"],
        warranty: "5 years structural warranty"
      },
      reviews: [
        {
          user: "Kevin Adams",
          rating: 5,
          comment: "Sturdy and comfortable. Highly recommended!",
          image: "https://www.furnistyle.com/reviews/kevinadams.jpg"
        }
      ]
    },
    {
      id: 106,
      name: "Minimalist Study Desk",
      category: "Office",
      rating: 5,
      price: {
        oldPrice: 600.0,
        newPrice: 520.0,
        currency: "USD"
      },
      tags: ["desk", "study", "minimalist"],
      features: ["Spacious workspace", "Durable frame", "Cable management"],
      description: "A minimalist desk designed for productive work sessions.",
      mainImage: deska,
      images: [deskb, deskc],
      inStock: true,
      recommended: true,
      featured: false,
      bestSelling: false,
      topProduct: true,
      additionalInformation: {
        dimensions: "48 x 24 x 30 inches",
        material: "MDF, metal frame",
        colorOptions: ["White", "Walnut"],
        warranty: "2 years on structural defects"
      },
      reviews: [
        {
          user: "Emily Johnson",
          rating: 5,
          comment: "Perfect for my small home office.",
          image: "https://www.furnistyle.com/reviews/emilyjohnson.jpg"
        }
      ]
    },
    {
      id: 107,
      name: "Patio Lounge Chair",
      category: "Outdoor",
      rating: 4,
      price: {
        oldPrice: 300.0,
        newPrice: 250.0,
        currency: "USD"
      },
      tags: ["outdoor", "lounge chair", "patio"],
      features: [
        "Weather-resistant",
        "Adjustable reclining position",
        "Comfortable cushions"
      ],
      description:
        "Relax in style with this weather-resistant patio lounge chair.",
      mainImage: loungechaira,
      images: [loungechairb, loungechairc],
      inStock: true,
      featured: false,
      recommended: true,
      bestSelling: true,
      topProduct: true,
      additionalInformation: {
        dimensions: "72 x 30 x 32 inches",
        material: "Aluminum frame, weather-resistant fabric",
        colorOptions: ["Gray", "Blue"],
        warranty: "1 year on fabric and frame"
      },
      reviews: [
        {
          user: "Chris Taylor",
          rating: 5,
          comment: "Super comfortable and durable.",
          image: "https://www.furnistyle.com/reviews/christaylor.jpg"
        }
      ]
    },
    {
      id: 108,
      name: "Classic Nightstand",
      rating: 4,
      category: "Bedroom",
      price: {
        oldPrice: 250.0,
        newPrice: 200.0,
        currency: "USD"
      },
      tags: ["nightstand", "bedroom", "storage"],
      features: ["Two drawers", "Solid wood construction", "Minimalist design"],
      description:
        "A versatile and stylish nightstand with ample storage space.",
      mainImage: nightstanda,
      images: [nightstandb, nightstandc],
      inStock: true,
      recommended: false,
      featured: false,
      bestSelling: true,
      topProduct: false,
      additionalInformation: {
        dimensions: "24 x 18 x 26 inches",
        material: "Solid oak wood",
        colorOptions: ["Natural Wood", "White"],
        warranty: "2 years structural warranty"
      },
      reviews: [
        {
          user: "Grace White",
          rating: 4,
          comment: "Compact and functional. Works perfectly in my bedroom.",
          image: "https://www.furnistyle.com/reviews/gracewhite.jpg"
        }
      ]
    },
    {
      id: 109,
      rating: 3,
      name: "Rustic Wooden Bookshelf",
      category: "Office",
      price: {
        oldPrice: 800.0,
        newPrice: 650.0,
        currency: "USD"
      },
      tags: ["bookshelf", "rustic", "wood"],
      features: ["5-tier shelving", "Durable build", "Rustic finish"],
      description:
        "A rustic wooden bookshelf with ample storage for books and decor items.",
      mainImage: bookshelfa,
      images: [bookshelfb, bookshelfc],
      inStock: true,
      featured: false,
      recommended: true,
      bestSelling: true,
      topProduct: false,
      additionalInformation: {
        dimensions: "72 x 36 x 15 inches",
        material: "Reclaimed wood",
        colorOptions: ["Walnut Brown"],
        warranty: "3 years warranty on wood defects"
      },
      reviews: [
        {
          user: "Liam King",
          rating: 5,
          comment: "Love the rustic charm! Holds all my books perfectly.",
          image: "https://www.furnistyle.com/reviews/liamking.jpg"
        }
      ]
    },
    {
      id: 110,
      name: "Outdoor Dining Set",
      category: "Outdoor",
      price: {
        oldPrice: 1400.0,
        newPrice: 1200.0,
        currency: "USD"
      },
      tags: ["outdoor", "dining set", "patio"],
      features: ["Weatherproof materials", "Seats six", "Stylish design"],
      description:
        "A complete dining set perfect for outdoor meals and gatherings.",
      mainImage: outdoordinninga,
      images: [outdoordinningb, outdoordinningc],
      inStock: false,
      featured: false,
      recommended: true,
      bestSelling: false,
      topProduct: true,
      additionalInformation: {
        dimensions: "78 x 40 x 30 inches",
        material: "Aluminum frame, tempered glass top",
        colorOptions: ["Black", "Beige"],
        warranty: "2 years frame warranty"
      },
      reviews: [
        {
          user: "Sophia Green",
          rating: 5,
          comment: "Sturdy and weatherproof. Perfect for my patio!",
          image: "https://www.furnistyle.com/reviews/sophiagreen.jpg"
        }
      ]
    },
    {
      id: 111,
      name: "Contemporary Floor Lamp",
      category: "Decor & Accessories",
      rating: 4,
      price: {
        oldPrice: 350.0,
        newPrice: 299.0,
        currency: "USD"
      },
      tags: ["floor lamp", "lighting", "contemporary"],
      features: ["Energy-saving LED", "Modern design", "Adjustable height"],
      description:
        "A sleek contemporary floor lamp that adds elegance and light to any space.",
      mainImage: floorlampa,
      images: [floorlampb, floorlampc],
      inStock: true,
      featured: false,
      recommended: true,
      bestSelling: false,
      topProduct: false,
      additionalInformation: {
        dimensions: "68 inches tall",
        material: "Metal frame, fabric shade",
        colorOptions: ["Black", "White"],
        warranty: "2 years electrical warranty"
      },
      reviews: [
        {
          user: "David Blue",
          rating: 4,
          comment: "Stylish and provides great lighting.",
          image: "https://www.furnistyle.com/reviews/davidblue.jpg"
        }
      ]
    }
  ]
};
