export default {
  "v1.32.9": [
    {
      id: "stronghold",
      name: "Stronghold",
      type: "upgrade",
      gold: 700,
      lumber: 375,
      buildTime: 140,
      tier: 2,
      dependsOn: {
        buildings: ["greatHall"],
        upgrades: [],
      },
      order: 9,
      image: "orc/stronghold.png",
    },
    {
      id: "fortress",
      name: "Fortress",
      type: "upgrade",
      gold: 1025,
      lumber: 565,
      buildTime: 140,
      tier: 3,
      replaces: "stronghold",
      dependsOn: {
        buildings: ["greatHall"],
        upgrades: [],
      },
      order: 9,
      image: "orc/fortress.png",
    },
    {
      id: "spikedBarricades",
      name: "Spiked Barricades",
      type: "upgrade",
      gold: 25,
      lumber: 75,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 11,
      image: "orc/spikedbarricades.png",
    },
    {
      id: "improvedSpikedBarricades",
      name: "Improved Spiked Barricades",
      type: "upgrade",
      gold: 50,
      lumber: 100,
      buildTime: 60,
      replaces: "spikedBarricades",
      dependsOn: {
        buildings: [],
        upgrades: ["stronghold"],
      },
      order: 11,
      image: "orc/improvedspikedbarricades.png",
    },
    {
      id: "reinforcedDefenses",
      name: "Reinforced Defenses",
      type: "upgrade",
      gold: 75,
      lumber: 175,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: ["stronghold"],
      },
      order: 7,
      image: "orc/reinforceddefenses.png",
    },
    {
      id: "steelMeleeWeapons",
      name: "Steel Melee Weapons",
      type: "upgrade",
      gold: 100,
      lumber: 75,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 1,
      image: "orc/steelmeleeweapons.png",
    },
    {
      id: "thoriumMeleeWeapons",
      name: "Thorium Melee Weapons",
      type: "upgrade",
      gold: 150,
      lumber: 175,
      buildTime: 75,
      replaces: "steelMeleeWeapons",
      dependsOn: {
        buildings: [],
        upgrades: ["stronghold"],
      },
      order: 1,
      image: "orc/thoriummeleeweapons.png",
    },
    {
      id: "arcaniteMeleeWeapons",
      name: "Arcanite Melee Weapons",
      type: "upgrade",
      gold: 200,
      lumber: 275,
      buildTime: 90,
      replaces: "thoriumMeleeWeapons",
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 1,
      image: "orc/arcanitemeleeweapons.png",
    },
    {
      id: "steelRangedWeapons",
      name: "Steel Ranged Weapons",
      type: "upgrade",
      gold: 100,
      lumber: 100,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 2,
      image: "orc/steelrangedweapons.png",
    },
    {
      id: "thoriumRangedWeapons",
      name: "Thorium Ranged Weapons",
      type: "upgrade",
      gold: 150,
      lumber: 200,
      buildTime: 75,
      replaces: "steelRangedWeapons",
      dependsOn: {
        buildings: [],
        upgrades: ["stronghold"],
      },
      order: 2,
      image: "orc/thoriumrangedweapons.png",
    },
    {
      id: "arcaniteRangedWeapons",
      name: "Arcanite Ranged Weapons",
      type: "upgrade",
      gold: 200,
      lumber: 300,
      buildTime: 90,
      replaces: "thoriumRangedWeapons",
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 2,
      image: "orc/arcaniterangedweapons.png",
    },
    {
      id: "steelArmor",
      name: "Steel Armor",
      type: "upgrade",
      gold: 150,
      lumber: 75,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 5,
      image: "orc/steelarmor.png",
    },
    {
      id: "thoriumArmor",
      name: "Thorium Armor",
      type: "upgrade",
      gold: 225,
      lumber: 225,
      buildTime: 75,
      replaces: "steelArmor",
      dependsOn: {
        buildings: [],
        upgrades: ["stronghold"],
      },
      order: 5,
      image: "orc/thoriumarmor.png",
    },
    {
      id: "arcaniteArmor",
      name: "Arcanite Armor",
      type: "upgrade",
      gold: 300,
      lumber: 375,
      buildTime: 90,
      replaces: "thoriumArmor",
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 5,
      image: "orc/arcanitearmor.png",
    },
    {
      id: "shamanAdeptTraining",
      name: "Shaman Adept Training",
      type: "upgrade",
      gold: 100,
      lumber: 50,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 9,
      image: "orc/shamanadepttraining.png",
    },
    {
      id: "shamanMasterTraining",
      name: "Shaman Master Training",
      type: "upgrade",
      gold: 100,
      lumber: 150,
      buildTime: 75,
      replaces: "shamanAdeptTraining",
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 9,
      image: "orc/shamanmastertraining.png",
    },
    {
      id: "witchDoctorAdeptTraining",
      name: "Witch Doctor Adept Training",
      type: "upgrade",
      gold: 100,
      lumber: 50,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 10,
      image: "orc/witchdoctoradepttraining.png",
    },
    {
      id: "witchDoctorMasterTraining",
      name: "Witch Doctor Master Training",
      type: "upgrade",
      gold: 100,
      lumber: 150,
      buildTime: 75,
      replaces: "witchDoctorAdeptTraining",
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 10,
      image: "orc/witchdoctormastertraining.png",
    },
    {
      id: "spiritWalkerAdeptTraining",
      name: "Spirit Walker Adept Training",
      type: "upgrade",
      gold: 100,
      lumber: 100,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 9,
      image: "orc/spiritwalkeradepttraining.png",
    },
    {
      id: "spiritWalkerMasterTraining",
      name: "Spirit Walker Master Training",
      type: "upgrade",
      gold: 100,
      lumber: 150,
      buildTime: 75,
      replaces: "spiritWalkerAdeptTraining",
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 9,
      image: "orc/spiritwalkermastertraining.png",
    },
    {
      id: "pillage",
      name: "Pillage",
      type: "upgrade",
      gold: 75,
      lumber: 25,
      buildTime: 60,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 3,
      image: "orc/pillage.gif",
    },
    {
      id: "bruteStrength",
      name: "Brute Strength",
      type: "upgrade",
      gold: 50,
      lumber: 150,
      buildTime: 40,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 9,
      image: "orc/brutestrength.png",
    },
    {
      id: "unitInventory",
      name: "Unit Inventory",
      type: "upgrade",
      gold: 50,
      lumber: 25,
      buildTime: 20,
      dependsOn: {
        buildings: ["voodooLounge"],
        upgrades: [],
      },
      order: 4,
      image: "orc/unitinventory.png",
    },
    {
      id: "trollRegeneration",
      name: "Troll Regeneration",
      type: "upgrade",
      gold: 100,
      lumber: 100,
      buildTime: 60,
      dependsOn: {
        buildings: ["warMill"],
        upgrades: ["stronghold"],
      },
      order: 10,
      image: "orc/trollregeneration.png",
    },
    {
      id: "berserkerUpgrade",
      name: "Berserker Upgrade",
      type: "upgrade",
      gold: 75,
      lumber: 175,
      buildTime: 40,
      dependsOn: {
        buildings: ["warMill"],
        upgrades: ["fortress"],
      },
      order: 6,
      image: "orc/berserkerupgrade.png",
    },
    {
      id: "burningOil",
      name: "Burning Oil",
      type: "upgrade",
      gold: 50,
      lumber: 150,
      buildTime: 30,
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 7,
      image: "orc/burningoil.gif",
    },
    {
      id: "ensnare",
      name: "Ensnare",
      type: "upgrade",
      gold: 50,
      lumber: 75,
      buildTime: 40,
      dependsOn: {
        buildings: [],
        upgrades: [],
      },
      order: 9,
      image: "orc/ensnare.gif",
    },
    {
      id: "envenomedSpears",
      name: "Envenomed Spears",
      type: "upgrade",
      gold: 100,
      lumber: 150,
      buildTime: 40,
      dependsOn: {
        buildings: [],
        upgrades: ["fortress"],
      },
      order: 10,
      image: "orc/envenomedspears.gif",
    },
    {
      id: "warDrumsDamageIncrease",
      name: "War Drums Damage Increase",
      type: "upgrade",
      gold: 100,
      lumber: 150,
      buildTime: 40,
      dependsOn: {
        buildings: ["warMill"],
        upgrades: ["fortress"],
      },
      order: 11,
      image: "orc/wardrumsdamageincrease.png",
    },
    {
      id: "liquidFire",
      name: "Liquid Fire",
      type: "upgrade",
      gold: 75,
      lumber: 125,
      buildTime: 75,
      dependsOn: {
        buildings: ["voodooLounge"],
        upgrades: ["fortress"],
      },
      order: 7,
      image: "orc/liquidfire.gif",
    },
    {
      id: "pulverizeDamageIncrease",
      name: "Pulverize Damage Increase",
      type: "upgrade",
      gold: 100,
      lumber: 225,
      buildTime: 40,
      dependsOn: {
        buildings: ["warMill"],
        upgrades: ["fortress"],
      },
      order: 10,
      image: "orc/pulverizedamageincrease.png",
    },
  ],
}
