import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const photo = (id:string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
const catalog = [
  {category:"Audio",items:[
    ["Sonic Pro Wireless Headphones","Immersive wireless sound with rich detail and adaptive noise cancellation.",12999,"photo-1505740420928-5e560c06d30e","BESTSELLER"],
    ["Studio One Over-Ear","Comfort-first over-ear headphones tuned for everyday listening.",8999,"photo-1546435770-a3e426bf472b","TOP RATED"],
    ["Pulse Mini Bluetooth Speaker","Big room-filling sound in a compact, carry-anywhere design.",5999,"photo-1608043152269-423dbba4e7e1",""],
    ["AirBeat True Wireless Earbuds","Pocket-sized earbuds with clear calls and all-day listening.",7999,"photo-1606220945770-b5b6c2c55bf1","NEW"],
    ["Wave ANC Earbuds","Find your quiet with active noise cancellation and a snug fit.",10999,"photo-1590658268037-6bf12165a8df",""],
    ["Retro Vinyl Bluetooth Turntable","A warm retro look with modern wireless convenience.",14999,"photo-1461360228754-6e81c478b882",""],
    ["USB-C Desktop Microphone","Crisp voice capture for streaming, meetings, and creative work.",6999,"photo-1590602847861-f357a9332bbc",""],
    ["Travel Sound Adapter","A compact audio companion for travel and everyday listening.",3499,"photo-1545454675-3531b543be5d",""],
    ["Open-Ear Sport Buds","Stay aware of your surroundings while moving to your soundtrack.",8999,"photo-1598331668826-20cecc596b86",""],
    ["Studio Monitor Headset","Balanced sound and plush ear cushions for focused sessions.",11999,"photo-1484704849700-f032a568e944",""]
  ]},
  {category:"Wearables",items:[
    ["Active Smartwatch S","Track activity, sleep, and notifications with a bright, clear display.",15999,"photo-1523275335684-37898b6baf30","BESTSELLER"],
    ["Minimal Time Watch","A clean everyday watch with a refined, lightweight finish.",6999,"photo-1524805444758-089113d48a6d",""],
    ["Fit Loop Activity Band","A lightweight band for steps, workouts, and daily movement.",5999,"photo-1575311373937-040b8e1fd5b6",""],
    ["Smart Ring Lite","A discreet wearable for daily activity and wellness insights.",12999,"photo-1617038220319-276d3cfab638","NEW"],
    ["Active GPS Watch","Workout-ready tracking with GPS and long-lasting battery.",22999,"photo-1508685096489-7aacd43bd3b1",""],
    ["Classic Smartwatch Strap Set","Refresh your everyday watch with comfortable interchangeable straps.",2499,"photo-1434493789847-2f02dc6ca35d",""],
    ["Wireless Sleep Buds","Small, comfortable earbuds designed for calm nighttime routines.",7499,"photo-1546435770-a3e426bf472b",""],
    ["Smart Glasses Case","A protective charging case for your connected eyewear.",3999,"photo-1511499767150-a48a237f0083",""],
    ["Sport Watch Pro","A rugged, clear-screen watch built for active days.",18999,"photo-1551816230-ef5deaed4a26",""],
    ["Everyday Fitness Tracker","Simple activity tracking in a comfortable, minimal design.",4999,"photo-1576243345690-4e4b79b63288",""]
  ]},
  {category:"Mobile",items:[
    ["Nova Smartphone Stand","A sturdy adjustable stand for hands-free calls and viewing.",1999,"photo-1511707171634-5f897ff02aa9",""],
    ["Magnetic Wireless Charger","Convenient magnetic charging for compatible devices.",3999,"photo-1586953208448-b95a79798f07","BESTSELLER"],
    ["65W GaN Fast Charger","Compact fast charging for phones, tablets, and compatible laptops.",4999,"photo-1609592806596-b43bada2f5f5",""],
    ["Braided USB-C Cable Duo","Durable fast-charge cables in a useful two-pack.",1499,"photo-1558618666-fcd25c85cd64",""],
    ["Power Bank 20K","Extra battery for long days, commutes, and travel.",6999,"photo-1609091839311-d5365f9ff1c5","TOP RATED"],
    ["Clear Impact Phone Case","Slim everyday protection with a clean transparent finish.",2499,"photo-1601593346740-925612772716",""],
    ["Pocket Tripod Grip","A pocket-sized grip and tripod for stable photos and video.",2999,"photo-1512499617640-c74ae3a79d37",""],
    ["Privacy Screen Protector","A protective screen layer designed for more private viewing.",1799,"photo-1580910051074-3eb694886505",""],
    ["MagSafe Wallet Stand","A slim magnetic wallet with a fold-out viewing stand.",3499,"photo-1609252925148-3a2d4b7c0c3c","NEW"],
    ["Travel SIM Storage Kit","Keep tiny essentials organized with this compact travel kit.",999,"photo-1512941937669-90a1b58e7e9c",""]
  ]},
  {category:"Computing",items:[
    ["AirLite Laptop 14","A sleek everyday laptop concept for work, study, and creativity.",89999,"photo-1496181133206-80ce9b88a853","FEATURED"],
    ["Mechanical Keyboard 75","Tactile typing, a compact layout, and a satisfying sound.",8999,"photo-1595225476474-87563907a212","BESTSELLER"],
    ["Precision Wireless Mouse","Comfortable shape and precise wireless tracking for every task.",3999,"photo-1527814050087-3793815479db",""],
    ["USB-C Hub 8-in-1","Connect displays, storage, and accessories through one hub.",6999,"photo-1625842268584-8f3296236761",""],
    ["Laptop Riser Stand","Raise your screen to a more comfortable desk height.",4999,"photo-1527864550417-7fd91fc51a46",""],
    ["4K Webcam Pro","A crisp video upgrade for calls, classes, and streaming.",9999,"photo-1587829741301-dc798b83add3","NEW"],
    ["Portable SSD 1TB","Fast, pocketable storage for projects, photos, and backups.",14999,"photo-1531492746076-161ca9bcad58",""],
    ["27-inch 4K Monitor","A spacious high-resolution display for work and entertainment.",49999,"photo-1527443224154-c4a3942d3acf",""],
    ["Ergonomic Desk Mat","A smooth, generous surface to bring your desk setup together.",2999,"photo-1524758631624-e2822e304c36",""],
    ["Laptop Sleeve 14-inch","Soft-lined protection for your everyday carry.",2499,"photo-1496181133206-80ce9b88a853",""]
  ]},
  {category:"Gaming",items:[
    ["Nova Wireless Controller","Responsive wireless controls for relaxed and competitive play.",6999,"photo-1600080972464-8e5f35f63d08","BESTSELLER"],
    ["RGB Gaming Headset","Immersive audio and a clear mic for your squad.",8999,"photo-1593305841991-05c297ba4575",""],
    ["Compact Gaming Keyboard","A compact keyboard with customizable lighting and responsive keys.",7999,"photo-1618384887929-16ec33fab9ef",""],
    ["Precision Gaming Mouse","Lightweight, accurate tracking with customizable controls.",4999,"photo-1527814050087-3793815479db",""],
    ["Extended Desk Mouse Pad","A generous, smooth surface for keyboard and mouse movement.",1999,"photo-1612287230202-1ff1d85d1bdf",""],
    ["Console Cooling Stand","Keep your gaming area organized with a practical console stand.",4499,"photo-1592840496694-26d035b52b48",""],
    ["Handheld Game Case","Protective storage for your portable gaming setup.",2499,"photo-1606144042614-b2417e99c4e3",""],
    ["Streaming Light Bar","Adjustable lighting for streaming, calls, and late-night play.",3999,"photo-1598550476439-6847785fcea6","NEW"],
    ["USB Gaming Microphone","A plug-and-play microphone for clear team chat and streaming.",5999,"photo-1590602847861-f357a9332bbc",""],
    ["Gaming Headset Stand","A clean home for your headset with a small desk footprint.",1999,"photo-1612287230202-1ff1d85d1bdf",""]
  ]},
  {category:"Home Tech",items:[
    ["Smart Ambient Lamp","Set the mood with soft ambient light for work or winding down.",4999,"photo-1507473885765-e6ed057f782c","BESTSELLER"],
    ["Mini Smart Projector","Bring movie nights to a bigger screen with a compact projector.",29999,"photo-1535016120720-40c646be5580",""],
    ["Smart Plug Twin Pack","Add convenient app-controlled switching to compatible devices.",2499,"photo-1558089687-f282ffcbc126",""],
    ["Air Quality Monitor","Keep an eye on indoor air readings with a simple display.",7999,"photo-1585771724684-38269d6639fd",""],
    ["Robot Vacuum Mini","A compact automated helper for everyday floor cleaning.",24999,"photo-1558317374-067fb5f30001",""],
    ["Smart LED Bulb Set","Tune your room's light and atmosphere with connected bulbs.",2999,"photo-1507473885765-e6ed057f782c",""],
    ["Digital Weather Station","A clear desktop display for your home's everyday conditions.",3499,"photo-1504608524841-42fe6f032b4b",""],
    ["Wireless Doorbell Kit","A convenient wireless chime for everyday arrivals.",3999,"photo-1558002038-1055907df827",""],
    ["Desk Cable Organizer","Keep charging cables and small accessories tidy and close by.",1299,"photo-1524758631624-e2822e304c36",""],
    ["Smart Sensor Starter Kit","Simple sensors to explore a more connected home setup.",8999,"photo-1558002038-1055907df827","NEW"]
  ]}
];

async function main() {
  let index = 0;
  for (const group of catalog) {
    for (const [name,description,price,image,badge] of group.items as [string,string,number,string,string][]) {
      index++;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
      const compareAt = index % 3 === 0 ? Math.round(price * 1.18) : null;
      await prisma.product.upsert({
        where:{slug},
        update:{name,description,category:group.category,price,compareAt,image:photo(image),badge:badge||null,featured:index<=12,rating:Number((4.4+(index%6)*0.1).toFixed(1)),stock:15+(index%45)},
        create:{slug,name,description,category:group.category,price,compareAt,image:photo(image),badge:badge||null,featured:index<=12,rating:Number((4.4+(index%6)*0.1).toFixed(1)),stock:15+(index%45)}
      });
    }
  }
  console.log(`Seeded ${index} Volt products across ${catalog.length} categories.`);
}
main().finally(()=>prisma.$disconnect());
