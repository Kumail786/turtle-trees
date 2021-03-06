class GeneralNavigation extends Turtle {
  static scene;
  static levels;
  static storePointsOnLevels;

  constructor(point, initAngle, scene) {
    super(point, initAngle);
    this.isStorePointsArray = [];
    this.storePointsOnLevels = {};
    this.levels = 0;
    this.scene = scene;
  }

  produceString(atom, map, order) {
    let atomString = atom;
    let modifiedString = [];
    for (let i = 0; i < order; i++) {
      modifiedString = [];
      for (let j = 0; j < atomString.length; j++) {
        if (map[atomString[j]]) {
          modifiedString.push(map[atomString[j]]);
        } else {
          modifiedString.push(atomString[j]);
        }
      }
      atomString = modifiedString.join("");
    }
    return modifiedString.join("");
  }

  turnLeft(angle) {
    this.CD -= angle;
  }
  turnRight(angle) {
    this.CD += angle;
  }

  storeBrackets(bracket) {
    if (bracket == "[") {
      this.levels = this.levels + 1;
    }
  }
  savePattern() {
    const levels = this.levels;
    for (let i = 1; i <= levels; i++) {
      if (!this.storePointsOnLevels[i]) {
        this.storePointsOnLevels[i] = [{ CP: this.CP, CD: this.CD }];
      } else {
        this.storePointsOnLevels[i].push({ CP: this.CP, CD: this.CD });
      }
    }
  }
  restorePattern() {
    for (
      let i = this.storePointsOnLevels[this.levels].length - 1;
      i >= 0;
      i--
    ) {
      const point = this.storePointsOnLevels[this.levels][i].CP;
      const angle = this.storePointsOnLevels[this.levels][i].CD;
      this.path.lineTo(point.x, point.y);
      this.CP = point;
      this.CD = angle;
    }

    delete this.storePointsOnLevels[this.levels];
    this.levels = this.levels - 1;
  }
  drawStringThroughProducedString(string, turnAngle) {
    let forward = 0.5;

    for (let index in string) {
      const char = string[index];
      switch (char.toLowerCase()) {
        case "f":
          this.savePattern(char);
          this.forward(forward, true);
          break;
        case "x":
          this.savePattern(char);
          this.forward(forward, true);
          break;
        case "y":
          this.savePattern(char);
          this.forward(forward, true);
          break;
        case "+":
          this.savePattern(char);
          this.turnLeft(turnAngle);
          break;
        case "-":
          this.savePattern(char);
          this.turnRight(turnAngle);
          break;
        case "[":
          this.storeBrackets(char);
          break;
        case "]":
          this.storeBrackets(char);
          this.restorePattern();
          break;
        default:
          break;
      }
    }
   
    this.scene.add(this.drawTurtle());
  }
}
