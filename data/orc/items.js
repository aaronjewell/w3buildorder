export default [
  {
    id: "healingSalve",
    name: "Healing Salve",
    type: "item",
    gold: 100,
    lumber: 0,
    max: 2,
    replenish: 60,
    dependsOn: [],
    order: 1,
    image: "orc/healingsalve.png",
  },
  {
    id: "lesserClarityPotion",
    name: "Lesser Clarity Potion",
    type: "item",
    gold: 70,
    lumber: 0,
    max: 2,
    replenish: 30,
    dependsOn: [],
    ordeR: 2,
    image: "orc/lesserclaritypotion.png",
  },
  {
    id: "orbOfLightning",
    name: "Orb of Lightning",
    type: "item",
    gold: 375,
    lumber: 0,
    max: 1,
    replenish: 120,
    dependsOn: ["fortress"],
    order: 9,
    image: "orc/orboflightning.png",
  },
  {
    id: "potionOfHealing",
    name: "Potion of Healing",
    type: "item",
    gold: 150,
    lumber: 0,
    max: 3,
    replenish: 120,
    dependsOn: ["stronghold"],
    order: 5,
    image: "orc/potionofhealing.png",
  },
  {
    id: "potionOfMana",
    name: "Potion of Mana",
    type: "item",
    gold: 150,
    lumber: 0,
    max: 2,
    replenish: 120,
    dependsOn: ["stronghold"],
    order: 6,
    image: "orc/potionofmana.png",
  },
  {
    id: "scrollOfSpeed",
    name: "Scroll of Speed",
    type: "item",
    gold: 50,
    lumber: 0,
    max: 1,
    replenish: 60,
    dependsOn: [],
    order: 3,
    image: "orc/scrollofspeed.png",
  },
  {
    id: "scrollOfTownPortal",
    name: "Scroll of Town Portal",
    type: "item",
    gold: 350,
    lumber: 0,
    max: 2,
    replenish: 120,
    dependsOn: ["stronghold"],
    order: 7,
    image: "orc/scrolloftownportal.png",
  },
  {
    id: "tinyGreatHall",
    name: "Tiny Great Hall",
    type: "item",
    gold: 600,
    lumber: 185,
    max: 1,
    replenish: 120,
    dependsOn: ["fortress"],
    order: 10,
    image: "orc/greathall.png",
  },
]
