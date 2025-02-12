import clonedeep from "lodash.clonedeep"

import Action from "./Action"
import Building from "./Building"
import EventsProcessor from "./EventsProcessor"
import Orc from "./Orc"
import ResourceList from "./ResourceList"
import TickEvents from "./TickEvents"
import Unit from "./Unit"

import orcBuildings from "../data/orc/buildings"
import orcItems from "../data/orc/items"
import orcUnits from "../data/orc/units"
import orcUpgrades from "../data/orc/upgrades"
import Upgrade from "./Upgrade"

describe("EventsProcessor", () => {
  describe("processAction", () => {
    it("should process build events", () => {
      const tick = 0
      const burrowData = orcBuildings.find(b => b.id === "orcBurrow")
      const processor = new EventsProcessor()

      const resources = clonedeep(Orc.startingResources)

      const [peon, ...rest] = resources.value.units

      const action = Action.build(tick, burrowData, peon)

      const [lossEvent, gainEvent] = processor.processAction(action, resources)

      expect(lossEvent.tick).toEqual(tick)
      expect(lossEvent.resourceLoss.value.gold).toEqual(burrowData.gold)
      expect(lossEvent.resourceLoss.value.lumber).toEqual(burrowData.lumber)
      expect(lossEvent.resourceLoss.value.units.length).toEqual(1)
      expect(lossEvent.resourceLoss.value.units[0]._id).toEqual(peon._id)

      expect(gainEvent.tick).toEqual(tick + burrowData.buildTime)
      expect(gainEvent.resourceGain.value.buildings.length).toEqual(1)
      expect(gainEvent.resourceGain.value.buildings[0].id).toEqual(
        burrowData.id,
      )
      expect(gainEvent.resourceGain.value.units.length).toEqual(1)
      expect(gainEvent.resourceGain.value.units[0]).toEqual(peon)
    })

    it("should process train events", () => {
      const tick = 0
      const greatHall = orcBuildings.find(b => b.id === "greatHall")
      const peon = orcUnits.find(u => u.id === "peon")
      const building = new Building(greatHall)
      const processor = new EventsProcessor()

      const action = new Action({
        type: "train",
        start: tick,
        duration: peon.buildTime,
        valid: true,
        meta: { unit: peon, building },
      })

      const resources = clonedeep(Orc.startingResources)

      const [lossEvent, gainEvent] = processor.processAction(action, resources)

      expect(lossEvent.tick).toEqual(tick)
      expect(lossEvent.resourceLoss.value.gold).toEqual(peon.gold)
      expect(lossEvent.resourceLoss.value.lumber).toEqual(peon.lumber)
      expect(lossEvent.resourceLoss.value.buildings.length).toEqual(1)
      expect(lossEvent.resourceLoss.value.buildings[0]._id).toEqual(
        building._id,
      )

      expect(gainEvent.tick).toEqual(tick + peon.buildTime)
      expect(gainEvent.resourceGain.value.units.length).toEqual(1)
      expect(gainEvent.resourceGain.value.units[0].id).toEqual(peon.id)
    })

    it("should process upgrade events", () => {
      const tick = 0
      const pillageData = orcUpgrades.find(u => u.id === "pillage")
      const greatHallData = orcBuildings.find(b => b.id === "greatHall")
      const peonData = orcUnits.find(u => u.id === "peon")

      const greatHall = new Building(greatHallData)

      const processor = new EventsProcessor()

      const action = new Action({
        type: "upgrade",
        start: tick,
        duration: pillageData.buildTime,
        valid: true,
        meta: { building: greatHall, upgrade: pillageData },
      })

      const resources = clonedeep(Orc.startingResources)

      const [lossEvent, gainEvent] = processor.processAction(action, resources)

      expect(lossEvent.tick).toEqual(tick)
      expect(lossEvent.resourceLoss.value.gold).toEqual(pillageData.gold)
      expect(lossEvent.resourceLoss.value.lumber).toEqual(pillageData.lumber)
      expect(lossEvent.resourceLoss.value.buildings.length).toEqual(1)
      expect(lossEvent.resourceLoss.value.buildings[0]._id).toEqual(
        greatHall._id,
      )

      expect(gainEvent.tick).toEqual(tick + pillageData.buildTime)
      expect(gainEvent.resourceGain.value.upgrades.length).toEqual(1)
      expect(gainEvent.resourceGain.value.upgrades[0].id).toEqual(
        pillageData.id,
      )
    })

    it("should process assignToGold events", () => {
      const tick = 0

      const processor = new EventsProcessor()

      const resources = clonedeep(Orc.startingResources)

      const [peon, ...rest] = resources.value.units

      const action = Action.assignToGold(tick, peon)

      const [gainEvent, lossEvent] = processor.processAction(action, resources)

      expect(lossEvent.tick).toEqual(tick)
      expect(lossEvent.resourceLoss.value.units.length).toEqual(1)
      expect(lossEvent.resourceLoss.value.units[0]).toEqual(peon)

      expect(gainEvent.tick).toEqual(tick)
      expect(gainEvent.resourceGain.value.miningWorkers.length).toEqual(1)
      expect(gainEvent.resourceGain.value.miningWorkers[0]).toEqual(peon)
    })

    it("should process assignToLumber events", () => {
      const tick = 0

      const processor = new EventsProcessor()

      const resources = clonedeep(Orc.startingResources)

      const [peon, ...rest] = resources.value.units

      const action = Action.assignToLumber(tick, peon)

      const [gainEvent, lossEvent] = processor.processAction(action, resources)

      expect(lossEvent.tick).toEqual(tick)
      expect(lossEvent.resourceLoss.value.units.length).toEqual(1)
      expect(lossEvent.resourceLoss.value.units[0]).toEqual(peon)

      expect(gainEvent.tick).toEqual(tick)
      expect(gainEvent.resourceGain.value.harvestingWorkers.length).toEqual(1)
      expect(gainEvent.resourceGain.value.harvestingWorkers[0]).toEqual(peon)
    })

    it("should process removeFromGold events", () => {
      const tick = 0

      const processor = new EventsProcessor()

      const resources = clonedeep(Orc.startingResources)

      const [peon, ...rest] = resources.value.units
      resources.value.units = rest
      resources.value.miningWorkers = [peon]

      const action = Action.removeFromGold(tick, peon)

      const [gainEvent, lossEvent] = processor.processAction(action, resources)

      expect(lossEvent.tick).toEqual(tick)
      expect(lossEvent.resourceLoss.value.miningWorkers.length).toEqual(1)
      expect(lossEvent.resourceLoss.value.miningWorkers[0]).toEqual(peon)

      expect(gainEvent.tick).toEqual(tick)
      expect(gainEvent.resourceGain.value.units.length).toEqual(1)
      expect(gainEvent.resourceGain.value.units[0]).toEqual(peon)
    })

    it("should process removeFromLumber events", () => {
      const tick = 0

      const processor = new EventsProcessor()

      const resources = clonedeep(Orc.startingResources)

      const [peon, ...rest] = resources.value.units
      resources.value.units = rest
      resources.value.harvestingWorkers = [peon]

      const action = Action.removeFromLumber(tick, peon)

      const [gainEvent, lossEvent] = processor.processAction(action, resources)

      expect(lossEvent.tick).toEqual(tick)
      expect(lossEvent.resourceLoss.value.harvestingWorkers.length).toEqual(1)
      expect(lossEvent.resourceLoss.value.harvestingWorkers[0]).toEqual(peon)

      expect(gainEvent.tick).toEqual(tick)
      expect(gainEvent.resourceGain.value.units.length).toEqual(1)
      expect(gainEvent.resourceGain.value.units[0]).toEqual(peon)
    })
  })

  describe("validateActions", () => {
    it("should mark train actions invalid if resources are not met", () => {
      const tick = 0
      const greatHall = orcBuildings.find(b => b.id === "greatHall")
      const peon = orcUnits.find(u => u.id === "peon")
      const building = new Building(greatHall)
      const processor = new EventsProcessor()

      const actions = [
        new Action({
          type: "train",
          start: tick,
          duration: peon.buildTime,
          valid: true,
          meta: { unit: peon, building },
        }),
      ]

      const resources = new ResourceList({
        buildings: [building],
        gold: peon.gold - 1,
        lumber: peon.lumber - 1,
        supply: peon.supply - 1,
      })
      expect(actions[0].valid).toEqual(true)

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark a train action invalid if the unit limit is exceeded", () => {
      const tick = 0
      const altar = orcBuildings.find(b => b.id === "altarOfStorms")
      const bladeMaster = orcUnits.find(u => u.id === "bladeMaster")
      const building = new Building(altar)
      const processor = new EventsProcessor()

      const actions = [
        new Action({
          type: "train",
          start: tick,
          duration: bladeMaster.buildTime,
          valid: true,
          meta: { unit: bladeMaster, building },
        }),
      ]

      const resources = clonedeep(Orc.startingResources)
      resources.addValues(
        new ResourceList({
          buildings: [building],
          gold: bladeMaster.gold,
          lumber: bladeMaster.lumber,
          supply: bladeMaster.supply,
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(true)

      actions.push(
        new Action({
          type: "train",
          start: tick,
          duration: bladeMaster.buildTime,
          valid: true,
          meta: { unit: bladeMaster, building },
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(true)
      expect(actions[1].valid).toEqual(false)
    })

    it("should mark an train action invalid if the buildings build action is removed", () => {
      const tick = 0
      const altarData = orcBuildings.find(b => b.id === "altarOfStorms")
      const bladeMasterData = orcUnits.find(u => u.id === "bladeMaster")
      const peonData = orcUnits.find(u => u.id === "peon")
      const altar = new Building(altarData)
      const peon = new Unit(peonData)
      const processor = new EventsProcessor()

      const actions = [
        Action.build(tick, altarData, peon),
        Action.train(tick + altarData.buildTime, bladeMasterData, altar),
      ]

      const resources = clonedeep(Orc.startingResources)
      resources.addValues(
        new ResourceList({
          units: [peon],
          buildings: [altar],
          gold: bladeMasterData.gold + altarData.gold,
          lumber: bladeMasterData.lumber + altarData.lumber,
          supply: bladeMasterData.supply,
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(true)
      expect(actions[1].valid).toEqual(true)

      actions.splice(0, 1)
      resources.removeValues({
        buildings: [altar],
      })

      processor.validateActions(actions, resources)

      expect(resources.value.buildings.length).toEqual(1)
      expect(resources.value.buildings[0].id).toEqual("greatHall")
      expect(actions.length).toEqual(1)
      expect(actions[0].valid).toEqual(false)
    })

    it("should mark build actions invalid if not enough gold", () => {
      const tick = 0
      const orcBurrowData = orcBuildings.find(u => u.id === "orcBurrow")
      const peonData = orcUnits.find(u => u.id === "peon")
      const peon = new Unit(peonData)
      const processor = new EventsProcessor()

      const actions = [Action.build(tick, orcBurrowData, peon)]

      const resources = clonedeep(Orc.startingResources)
      resources.removeValues({
        gold: Orc.startingResources.value.gold,
        lumber: Orc.startingResources.value.lumber,
      })
      resources.addValues({
        units: [peon],
        gold: orcBurrowData.gold,
        lumber: orcBurrowData.lumber,
      })
      expect(actions[0].valid).toEqual(true)

      resources.removeValues({
        gold: 1,
      })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark build actions invalid if not enough gold", () => {
      const tick = 0
      const orcBurrowData = orcBuildings.find(u => u.id === "orcBurrow")
      const peonData = orcUnits.find(u => u.id === "peon")
      const peon = new Unit(peonData)
      const processor = new EventsProcessor()

      const actions = [Action.build(tick, orcBurrowData, peon)]

      const resources = clonedeep(Orc.startingResources)
      resources.removeValues({
        gold: Orc.startingResources.value.gold,
        lumber: Orc.startingResources.value.lumber,
      })
      resources.addValues({
        units: [peon],
        gold: orcBurrowData.gold,
        lumber: orcBurrowData.lumber,
      })
      expect(actions[0].valid).toEqual(true)

      resources.removeValues({
        lumber: 1,
      })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark build actions invalid if builder doesnt exist", () => {
      const tick = 0
      const orcBurrowData = orcBuildings.find(u => u.id === "orcBurrow")
      const peonData = orcUnits.find(u => u.id === "peon")
      const peon = new Unit(peonData)
      const processor = new EventsProcessor()

      const actions = [Action.build(tick, orcBurrowData, peon)]

      const resources = clonedeep(Orc.startingResources)
      resources.removeValues({
        gold: Orc.startingResources.value.gold,
        lumber: Orc.startingResources.value.lumber,
      })
      resources.addValues({
        units: [peon],
        gold: orcBurrowData.gold,
        lumber: orcBurrowData.lumber,
      })
      expect(actions[0].valid).toEqual(true)

      resources.removeValues({
        units: [peon],
      })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark assign to gold action invalid if miner no longer exists", () => {
      const tick = 0
      const peonData = orcUnits.find(u => u.id === "peon")
      const peon = new Unit(peonData)
      const processor = new EventsProcessor()

      const actions = [Action.assignToGold(tick, peon)]

      const resources = clonedeep(Orc.startingResources)
      resources.addValues({
        units: [peon],
      })
      expect(actions[0].valid).toEqual(true)

      resources.removeValues({
        units: [peon],
      })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark assign to lumber action invalid if harvester no longer exists", () => {
      const tick = 0
      const peonData = orcUnits.find(u => u.id === "peon")
      const peon = new Unit(peonData)
      const processor = new EventsProcessor()

      const actions = [Action.assignToLumber(tick, peon)]

      const resources = clonedeep(Orc.startingResources)
      resources.addValues({
        units: [peon],
      })
      expect(actions[0].valid).toEqual(true)

      resources.removeValues({
        units: [peon],
      })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark an upgrade action invalid if the upgrades previous version are not met", () => {
      const tick = 0
      const strongholdData = orcUpgrades.find(b => b.id === "stronghold")
      const steelMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "steelMeleeWeapons",
      )
      const thoriumMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "thoriumMeleeWeapons",
      )
      const greatHallData = orcBuildings.find(b => b.id === "greatHall")
      const warMillData = orcBuildings.find(b => b.id === "warMill")

      const greatHall = new Building(greatHallData)
      const warMill = new Building(warMillData)
      const stronghold = new Upgrade(strongholdData)
      const steelMeleeWeapons = new Upgrade(steelMeleeWeaponsData)
      const thoriumMeleeWeapons = new Upgrade(thoriumMeleeWeaponsData)

      const processor = new EventsProcessor()

      const actions = [Action.upgrade(tick, thoriumMeleeWeaponsData, warMill)]

      const resources = clonedeep(Orc.startingResources)
      resources.addValues(
        new ResourceList({
          upgrades: [steelMeleeWeapons, stronghold],
          gold: thoriumMeleeWeaponsData.gold,
          lumber: thoriumMeleeWeaponsData.lumber,
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(true)

      resources.removeValues({ upgrades: [steelMeleeWeaponsData] })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark an upgrade action invalid if not enough gold", () => {
      const tick = 0
      const strongholdData = orcUpgrades.find(b => b.id === "stronghold")
      const steelMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "steelMeleeWeapons",
      )
      const thoriumMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "thoriumMeleeWeapons",
      )
      const greatHallData = orcBuildings.find(b => b.id === "greatHall")
      const warMillData = orcBuildings.find(b => b.id === "warMill")

      const greatHall = new Building(greatHallData)
      const warMill = new Building(warMillData)
      const stronghold = new Upgrade(strongholdData)
      const steelMeleeWeapons = new Upgrade(steelMeleeWeaponsData)
      const thoriumMeleeWeapons = new Upgrade(thoriumMeleeWeaponsData)

      const processor = new EventsProcessor()

      const actions = [Action.upgrade(tick, thoriumMeleeWeaponsData, warMill)]

      const resources = clonedeep(Orc.startingResources)
      resources.removeValues({
        gold: Orc.startingResources.value.gold,
        lumber: Orc.startingResources.value.lumber,
      })
      resources.addValues(
        new ResourceList({
          upgrades: [steelMeleeWeapons, stronghold],
          gold: thoriumMeleeWeaponsData.gold - 1,
          lumber: thoriumMeleeWeaponsData.lumber,
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)

      resources.addValues({ gold: 1 })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(true)
    })

    it("should mark an upgrade action invalid if not enough lumber", () => {
      const tick = 0
      const strongholdData = orcUpgrades.find(b => b.id === "stronghold")
      const steelMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "steelMeleeWeapons",
      )
      const thoriumMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "thoriumMeleeWeapons",
      )
      const greatHallData = orcBuildings.find(b => b.id === "greatHall")
      const warMillData = orcBuildings.find(b => b.id === "warMill")

      const greatHall = new Building(greatHallData)
      const warMill = new Building(warMillData)
      const stronghold = new Upgrade(strongholdData)
      const steelMeleeWeapons = new Upgrade(steelMeleeWeaponsData)
      const thoriumMeleeWeapons = new Upgrade(thoriumMeleeWeaponsData)

      const processor = new EventsProcessor()

      const actions = [Action.upgrade(tick, thoriumMeleeWeaponsData, warMill)]

      const resources = clonedeep(Orc.startingResources)
      resources.removeValues({
        gold: Orc.startingResources.value.gold,
        lumber: Orc.startingResources.value.lumber,
      })
      resources.addValues(
        new ResourceList({
          upgrades: [steelMeleeWeapons, stronghold],
          gold: thoriumMeleeWeaponsData.gold,
          lumber: thoriumMeleeWeaponsData.lumber - 1,
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)

      resources.addValues({ lumber: 1 })

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(true)
    })

    it("should mark an upgrade action invalid if already researched", () => {
      const tick = 0
      const strongholdData = orcUpgrades.find(b => b.id === "stronghold")
      const steelMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "steelMeleeWeapons",
      )
      const thoriumMeleeWeaponsData = orcUpgrades.find(
        u => u.id === "thoriumMeleeWeapons",
      )
      const greatHallData = orcBuildings.find(b => b.id === "greatHall")
      const warMillData = orcBuildings.find(b => b.id === "warMill")

      const greatHall = new Building(greatHallData)
      const warMill = new Building(warMillData)
      const stronghold = new Upgrade(strongholdData)
      const steelMeleeWeapons = new Upgrade(steelMeleeWeaponsData)
      const thoriumMeleeWeapons = new Upgrade(thoriumMeleeWeaponsData)

      const processor = new EventsProcessor()

      const actions = [Action.upgrade(tick, thoriumMeleeWeaponsData, warMill)]

      const resources = clonedeep(Orc.startingResources)
      resources.removeValues({
        gold: Orc.startingResources.value.gold,
        lumber: Orc.startingResources.value.lumber,
      })
      resources.addValues(
        new ResourceList({
          upgrades: [steelMeleeWeapons, thoriumMeleeWeapons, stronghold],
          gold: thoriumMeleeWeaponsData.gold,
          lumber: thoriumMeleeWeaponsData.lumber,
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)
    })

    it("should mark an upgrade action invalid if missing a building dependency", () => {
      const tick = 0
      const unitInventoryData = orcUpgrades.find(u => u.id === "unitInventory")

      const greatHallData = orcBuildings.find(b => b.id === "greatHall")
      const voodooLoungeData = orcBuildings.find(b => b.id === "voodooLounge")

      const greatHall = new Building(greatHallData)
      const voodooLounge = new Building(voodooLoungeData)
      const unitInventory = new Upgrade(unitInventoryData)

      const processor = new EventsProcessor()

      const actions = [Action.upgrade(tick, unitInventory, greatHall)]

      const resources = clonedeep(Orc.startingResources)
      resources.removeValues({
        gold: Orc.startingResources.value.gold,
        lumber: Orc.startingResources.value.lumber,
      })
      resources.addValues(
        new ResourceList({
          gold: unitInventoryData.gold,
          lumber: unitInventoryData.lumber,
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(false)

      resources.addValues(
        new ResourceList({
          buildings: [voodooLoungeData],
        }),
      )

      processor.validateActions(actions, resources)

      expect(actions[0].valid).toEqual(true)
    })
  })

  it("should mark an buy action invalid if not enough gold", () => {
    const tick = 0
    const healingSalveData = orcItems.find(i => i.id === "healingSalve")
    const greatHallData = orcBuildings.find(b => b.id === "greatHall")
    const voodooLoungeData = orcBuildings.find(b => b.id === "voodooLounge")

    const greatHall = new Building(greatHallData)
    const voodooLounge = new Building(voodooLoungeData)

    const processor = new EventsProcessor()

    const actions = [Action.buy(tick, healingSalveData, voodooLounge)]

    const resources = clonedeep(Orc.startingResources)
    resources.removeValues({
      gold: Orc.startingResources.value.gold,
      lumber: Orc.startingResources.value.lumber,
    })
    resources.addValues(
      new ResourceList({
        buildings: [voodooLounge],
        gold: healingSalveData.gold - 1,
        lumber: healingSalveData.lumber,
      }),
    )

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(false)

    resources.addValues({ gold: 1 })

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(true)
  })

  it("should mark an buy action invalid if not enough lumber", () => {
    const tick = 0
    const tinyGreatHallData = orcItems.find(i => i.id === "tinyGreatHall")
    const strongholdData = orcUpgrades.find(u => u.id === "stronghold")
    const fortressData = orcUpgrades.find(u => u.id === "fortress")
    const greatHallData = orcBuildings.find(b => b.id === "greatHall")
    const voodooLoungeData = orcBuildings.find(b => b.id === "voodooLounge")

    const greatHall = new Building(greatHallData)
    const voodooLounge = new Building(voodooLoungeData)

    const stronghold = new Upgrade(strongholdData)
    const fortress = new Upgrade(fortressData)

    const processor = new EventsProcessor()

    const actions = [Action.buy(tick, tinyGreatHallData, voodooLounge)]

    const resources = clonedeep(Orc.startingResources)
    resources.removeValues({
      gold: Orc.startingResources.value.gold,
      lumber: Orc.startingResources.value.lumber,
    })
    resources.addValues(
      new ResourceList({
        upgrades: [stronghold, fortress],
        buildings: [voodooLounge],
        gold: tinyGreatHallData.gold,
        lumber: tinyGreatHallData.lumber - 1,
      }),
    )

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(false)

    resources.addValues({ lumber: 1 })

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(true)
  })

  it("should mark an buy action invalid if missing the shop", () => {
    const tick = 0
    const healingSalveData = orcItems.find(i => i.id === "healingSalve")
    const voodooLoungeData = orcBuildings.find(b => b.id === "voodooLounge")

    const voodooLounge = new Building(voodooLoungeData)

    const processor = new EventsProcessor()

    const actions = [Action.buy(tick, healingSalveData, voodooLounge)]

    const resources = clonedeep(Orc.startingResources)
    resources.removeValues({
      gold: Orc.startingResources.value.gold,
      lumber: Orc.startingResources.value.lumber,
    })
    resources.addValues(
      new ResourceList({
        gold: healingSalveData.gold,
        lumber: healingSalveData.lumber,
      }),
    )

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(false)

    resources.addValues({ buildings: [voodooLounge] })

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(true)
  })

  it("should mark an buy action invalid if missing a dependency", () => {
    const tick = 0
    const potionOfHealingData = orcItems.find(i => i.id === "potionOfHealing")

    const voodooLoungeData = orcBuildings.find(b => b.id === "voodooLounge")
    const strongholdData = orcUpgrades.find(u => u.id === "stronghold")

    const voodooLounge = new Building(voodooLoungeData)
    const stronghold = new Upgrade(strongholdData)

    const processor = new EventsProcessor()

    const actions = [Action.buy(tick, potionOfHealingData, voodooLounge)]

    const resources = clonedeep(Orc.startingResources)
    resources.removeValues({
      gold: Orc.startingResources.value.gold,
      lumber: Orc.startingResources.value.lumber,
    })
    resources.addValues(
      new ResourceList({
        buildings: [voodooLounge],
        gold: potionOfHealingData.gold,
        lumber: potionOfHealingData.lumber,
      }),
    )

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(false)

    resources.addValues(
      new ResourceList({
        upgrades: [stronghold],
      }),
    )

    processor.validateActions(actions, resources)

    expect(actions[0].valid).toEqual(true)
  })

  it("should mark an buy action invalid if exceeding replenishment", () => {
    const tick = 0
    const healingSalveData = orcItems.find(i => i.id === "healingSalve")

    const voodooLoungeData = orcBuildings.find(b => b.id === "voodooLounge")

    const voodooLounge = new Building(voodooLoungeData)

    const processor = new EventsProcessor()

    const actions = [
      Action.buy(tick, healingSalveData, voodooLounge),
      Action.buy(tick, healingSalveData, voodooLounge),
      Action.buy(tick, healingSalveData, voodooLounge),
    ]

    const resources = clonedeep(Orc.startingResources)
    resources.removeValues({
      gold: Orc.startingResources.value.gold,
      lumber: Orc.startingResources.value.lumber,
    })
    resources.addValues(
      new ResourceList({
        buildings: [voodooLounge],
        gold: healingSalveData.gold * 3,
        lumber: healingSalveData.lumber * 3,
      }),
    )

    processor.validateActions(actions, resources)

    expect(actions[2].valid).toEqual(false)

    processor.validateActions(actions.slice(1), resources)

    expect(actions[1].valid).toEqual(true)

    actions[2].start = tick + healingSalveData.replenish - 1

    processor.validateActions(actions, resources)

    expect(actions[2].valid).toEqual(false)

    actions[2].start = tick + healingSalveData.replenish

    processor.validateActions(actions, resources)

    expect(actions[2].valid).toEqual(true)
  })
})
