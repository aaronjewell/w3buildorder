export default [
  {
    id: "altarOfStorms",
    name: "Altar of Storms",
    gold: 180,
    lumber: 50,
    buildTime: 60,
    startQty: 0,
    dependsOn: [],
    units: [],
  },
  {
    id: "beastiary",
    name: "Beastiary",
    gold: 145,
    lumber: 140,
    buildTime: 60,
    startQty: 0,
    dependsOn: ["stronghold"],
    units: [],
  },
  {
    id: "fortress",
    name: "Fortress",
    gold: 1025,
    lumber: 565,
    buildTime: 140,
    startQty: 0,
    dependsOn: ["stronghold"],
    units: [],
  },
  {
    id: "greatHall",
    name: "Great Hall",
    gold: 385,
    lumber: 185,
    buildTime: 150,
    startQty: 1,
    dependsOn: [],
    units: ["peon"],
  },
  {
    id: "orcBurrow",
    name: "Orc Burrow",
    gold: 160,
    lumber: 40,
    buildTime: 50,
    startQty: 0,
    dependsOn: [],
    units: [],
  },
  {
    id: "spiritLodge",
    name: "Spirit Lodge",
    gold: 150,
    lumber: 135,
    buildTime: 70,
    startQty: 0,
    dependsOn: ["stronghold"],
    units: [],
  },
  {
    id: "stronghold",
    name: "Stronghold",
    gold: 700,
    lumber: 375,
    buildTime: 140,
    startQty: 0,
    dependsOn: ["greatHall"],
    units: [],
  },
  {
    id: "taurenTotem",
    name: "Tauren Totem",
    gold: 135,
    lumber: 155,
    buildTime: 70,
    startQty: 0,
    dependsOn: ["warMill", "fortress"],
    units: [],
  },
  {
    id: "voodooLounge",
    name: "Voodoo Lounge",
    gold: 130,
    lumber: 30,
    buildTime: 60,
    startQty: 0,
    dependsOn: [],
    units: [],
  },
  {
    id: "warMill",
    name: "War Mill",
    gold: 205,
    lumber: 0,
    buildTime: 70,
    startQty: 0,
    dependsOn: [],
    units: [],
  },
  {
    id: "watchTower",
    name: "Watch Tower",
    gold: 110,
    lumber: 80,
    buildTime: 60,
    startQty: 0,
    dependsOn: ["warMill"],
    units: [],
  },
];