const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    let itemFromInventory = this.currentRoom.getItemByName(itemName);

    if (itemFromInventory) {
      // If theres the item in room's inventory
      let playerInventory = this.items;
      playerInventory.push(itemFromInventory);
      this.currentRoom.removeItem(itemFromInventory);
      console.log(`You take ${itemFromInventory.name} from ${this.currentRoom.name}`);
    } else {
      // If NOT
    }

  }

  dropItem(itemName) {

    let itemPlayerInventory = this.getItemByName(itemName);

    if (itemPlayerInventory) {
      // if theres the item in players inventory
      this.currentRoom.addItemToRoomInventory(itemPlayerInventory);
      this.removeItemFromInventory(itemPlayerInventory);
      console.log(`You drop ${itemPlayerInventory.name} from your inventory to ${this.currentRoom.name}`);
    } else {
      // else, print the error message
    }

  }

  removeItemFromInventory(item) {
    this.items = this.items.filter((existingItem) => existingItem !== item);
  }

  eatItem(itemName) {

    let itemPlayerInventory = this.getItemByName(itemName);

    if (itemPlayerInventory instanceof Food) {
      this.removeItemFromInventory(itemPlayerInventory);
    }

  }

  getItemByName(name) {
    let inventory = this.items;
    return inventory.find((item) => item.name === name);
  }

  hit(name) {

    const searchEnemy = this.currentRoom.getEnemyByName(name);

    if (searchEnemy instanceof Enemy) {
      // do attack
      searchEnemy.attackTarget = this;
    } else {
      // don't do anything
    }

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
