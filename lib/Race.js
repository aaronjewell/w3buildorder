export default class Race {
  buildings() {
    return this.constructor.buildings || []
  }
  units() {
    return this.constructor.units || []
  }
  upgrades() {
    return this.constructor.upgrades || []
  }
}