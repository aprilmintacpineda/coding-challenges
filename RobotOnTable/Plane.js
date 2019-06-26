module.exports = class Plane {
  constructor (width, height) {
    this.width = width;
    this.height = height;
  }

  canGo (x, y) {
    return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
  }
};
