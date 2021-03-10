export default [
  {
    id: "goblinMerchant",
    name: "Goblin Merchant",
    type: "building",
    units: [],
    items: [
      "circletOfNobility",
      "periaptOfVitality",
      "bootsOfSpeed",
      "dustOfAppearance",
      "scrollOfHealing",
      "scrollOfProtection",
      "scrollOfTownPortalNeutral",
      "potionOfInvisibility",
      "tomeOfRetraining",
      "staffOfTeleportation",
      "potionOfLesserInvulnerability",
    ],
    image: "neutral/goblinmerchant.png",
  },
  {
    id: "goblinLaboratory",
    name: "Goblin Laboratory",
    type: "building",
    units: ["goblinSapper", "goblinZeppelin", "goblinShredder"],
    items: [],
    image: "neutral/goblinlaboratory.png",
  },
  {
    id: "tavern",
    name: "Tavern",
    type: "building",
    units: [
      "nagaSeaWitch",
      "darkRanger",
      "pandarenBrewmaster",
      "firelord",
      "beastmaster",
      "pitLord",
      "goblinTinker",
      "goblinAlchemist",
    ],
    items: [],
    image: "neutral/tavern.png",
  },
  {
    id: "mercenaryCamp",
    name: "Mercenary Camp",
    type: "building",
    units: [
      "forestTrollShadowPriest",
      "forestTrollBerserker",
      "mudGolem",
      "ogreMauler",
    ],
    items: [],
    image: "neutral/mercenarycamp.png",
  },
]
