const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    let directions = this.currentRoom.getExits();
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];
    /**
     * Math random generates a random floating-point number between
        0(inclusive) and 1(exclusive).
     * Multiplying result above with the length of directions gives the
        random number that is between the array length.
     * Math.floor to round down the result above to the nearest integer,
        ensuring that the index is a valid index in the array.
     */
    const nextRandomRoom = this.currentRoom.getRoomInDirection(randomDirection);

    if (nextRandomRoom) {
      this.currentRoom = nextRandomRoom;
      this.cooldown = 3000;
      this.alert(`Seems like ${this.name} is moving...`);
    }
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    let defaultHitpoint = 10; // custom it with whatever
    this.attackTarget.applyDamage(defaultHitpoint);
    this.cooldown = 3000;
  }

  applyDamage(amount) {
    // Fill this in
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
