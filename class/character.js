class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;  // Must be an instance of Room class
    this.items = [];  // Must be consist of an instance of Item class
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    // Drop all items here to the currentRoom
    this.items.forEach((item) => this.currentRoom.items.push(item));
    this.items = [];

    // Current Room set to null
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
