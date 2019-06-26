module.exports = class Robot {
  constructor (Plane) {
    this.hasPlace = false;
    this.f = null;
    this.x = null;
    this.y = null;
    this.Plane = Plane;
  }

  place (x, y, f) {
    if (this.Plane.canGo(x, y)) {
      this.hasPlace = true;
      this.f = f;
      this.x = x;
      this.y = y;
    }
  }

  move () {
    let x = this.x, y = this.y;

    switch (this.f) {
      case 'north':
        y += 1;
        break;
      case 'west':
        x -= 1;
        break;
      case 'south':
        y -= 1;
        break;
      case 'east':
        x += 1;
        break;
    }

    if (this.Plane.canGo(x, y)) {
      this.y = y;
      this.x = x;
    }
  }

  right () {
    switch (this.f) {
      case 'north':
        this.f = 'east';
        break;
      case 'east':
        this.f = 'south';
        break;
      case 'south':
        this.f = 'west';
        break;
      case 'west':
        this.f = 'north';
        break;
    }
  }

  left () {
    switch (this.f) {
      case 'north':
        this.f = 'west';
        break;
      case 'west':
        this.f = 'south';
        break;
      case 'south':
        this.f = 'east';
        break;
      case 'east':
        this.f = 'north';
        break;
    }
  }

  report () {
    say(`${this.x}, ${this.y}, ${this.f}`);
  }
};
