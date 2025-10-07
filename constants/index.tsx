export const subcategories: { [key: string]: string[] } = {
  
    "Sofas & Seating": [
      "Sectional Sofas",
      "Loveseats & Armchairs",
      "Recliners & Lounge Chairs",
      "Sofa Beds & Futons",
      "Bar Stools & Ottomans",
    ],
    "Bedroom Furniture": [
      "Beds & Headboards",
      "Wardrobes & Closets",
      "Dressers & Chests",
      "Nightstands",
      "Mirrors",
    ],
    "Dining & Kitchen": [
      "Dining Tables",
      "Dining Chairs & Benches",
      "Bar Tables & Stools",
      "Cabinets & Buffets",
      "Coffee & Side Tables",
    ],
    "Office Furniture": [
      "Office Desks",
      "Office Chairs",
      "Storage Cabinets & Bookshelves",
      "Conference Tables",
      "Cubicles & Workstations",
    ],
    "Living Room Essentials": [
      "TV Stands & Media Units",
      "Coffee Tables",
      "Console Tables",
      "Shelving Units",
      "Accent Chairs",
    ],
    "Space-Saving & Multifunctional": [
      "Foldable Beds & Sofa Beds",
      "Extendable Dining Tables",
      "Storage Ottomans",
      "Modular Shelving",
      "Convertible Desks",
    ],
    "Custom & Dope Designs": [
      "Made-to-Order Sofas",
      "Customized Wardrobes",
      "Unique Coffee Tables",
      "Special Collaborations",
    ],
    "Outdoor Furniture": [
      "Patio Sets",
      "Outdoor Sofas & Chairs",
      "Pergolas & Gazebos",
      "Garden Tables & Benches",
    ],
    "Accessories & Decor": [
      "Rugs & Carpets",
      "Lighting Fixtures",
      "Wall Art & Frames",
      "Cushions & Throws",
      "Planters & Stands",
    ],
    "Statement Furniture Pieces": [

    ]
};


export const categories = [
  { name: "Sofas", imageUrl: "https://d1wc69nzx5ojwh.cloudfront.net/media/catalog/product/cache/2c7fa294d57090ee456930df120451a9/1/0/107180253_ai.webp",  
    fullname: "Sofas & Seating" },
  { name: "Bedroom", imageUrl: "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2023/09/Indulge-In-Opulence-50-Luxurious-Bedroom-Decor-Ideas-1-1024x788.jpg",
      fullname: "Bedroom Furniture" },
  { name: "Dining/Kitchen", imageUrl:"https://vitafoamng.com/wp-content/uploads/2021/12/Elegant-Dining-Set-Main.jpg",  
    fullname: "Dining & Kitchen" },
  { name: "Living Room", imageUrl: "https://nobili-design.com/storage/gallery/3188/lg/8936modern_living_rooms_with_the_right_furniture.jpg", 
    fullname: "Living Room Essentials" },
  { name: "Space-Saving", imageUrl:"https://picketandrail.com/cdn/shop/articles/multifunctional-furniture-for-singapore-homes-909803.jpg?v=1686388612",
      fullname: "Space-Saving & Multifunctional" },
  { name: "Custom Designs", imageUrl:"https://firebasestorage.googleapis.com/v0/b/wood-crest.firebasestorage.app/o/products%2FBedroom%20Furniture%2Fd6bc3671-17c7-4fae-b049-23b3a10f76aa-custom%20traveling%20bag.jpg?alt=media&token=730d83fd-0384-46f3-b465-812a0e687852",  
    fullname: "Custom & Dope Designs" },
  { name: "Outdoor", imageUrl:"https://www.jensenoutdoor.com/wp-content/uploads/2024/09/PlumeVelo-2x1Aspect-Shot1.jpg", 
    fullname: "Outdoor Furniture" },
  { name: "Office", imageUrl:"https://www.eunicon.com.ng/cdn/shop/products/rosewood-executive-desk-with-metal-legs_1028x.jpg?v=1617895155",
     fullname: "Office Furniture" },
  { name: "Accessories", imageUrl:"https://www.tradegully.com/wp-content/uploads/2024/04/modern-living-room-furniture.jpg",  fullname: "Accessories & Decor" },
  {name: "Statement Furniture", imageUrl: "https://firebasestorage.googleapis.com/v0/b/wood-crest.firebasestorage.app/o/products%2FBedroom%20Furniture%2Fd6bc3671-17c7-4fae-b049-23b3a10f76aa-custom%20traveling%20bag.jpg?alt=media&token=730d83fd-0384-46f3-b465-812a0e687852", fullname:"Statement Furniture Pieces"}
];

export const filterOptions = [
  { value: 'name', label: 'All' },
  { value: 'price ascending', label: 'Price: Low to High' },
  { value: 'price descending', label: 'Price: High to Low' },
  { value: 'new', label: 'New Arrivals' },
];