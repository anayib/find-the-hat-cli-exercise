const prompt = require('prompt-sync')({sigint: true});
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

class Field {
  constructor (field) {
    this.field = field || [];
    this.moveTodirection = '';
  }

  print () {
    this.field.forEach(array => {
        console.log(`${array.toString().replace(/,/g, "")}`);
    });
  }

  askForDirection () {
    readline.question(
      `Which direction would you like to move?\n`, 
      (direction) => {
          this.moveTodirection = direction;
          if (direction === "stop") {
            readline.close()
            return;
          }
          this.updateField(direction)
          this.print();
          this.askForDirection();
       }
      )
    }
    
    generateField (width, height, percentageHoles) { 
      let field = [];
      let hatPossition = [];
      let numberOfHoles = Math.floor(height*width*percentageHoles)
      let randomPosition = () => {
        let index1 = Math.floor(Math.random()*((width - 1) + 1));
        let index2 = Math.floor(Math.random()*((height - 1) + 1));
        return [index1, index2];
      };
      // creates field
      for (var i = 0; i < width; i++) {
        var innerArray = [];
        for (var j = 0; j < height; j++) {
          innerArray.push(fieldCharacter);
        }
        field.push(innerArray);
      };
      // insert path character
      field[0].splice(0, 1, pathCharacter);
      // insert hat
      do {
        hatPossition = randomPosition();
      } while (hatPossition === [0,0]);

      field[hatPossition[0]].splice(hatPossition[1], 1, hat)
      // insert wholes
      for (let j = 0; j < numberOfHoles; j += 1) {
        let inserted = false;
        while (inserted === false ) {
            let position = randomPosition();
            if (field[position[0]][position[1]] === fieldCharacter ) {
               field[position[0]].splice(position[1], 1, hole)
               inserted = true;
            }
          }

      }
      this.field = field;
      return;
    }
    
    updateField(direction) {
      /*
        get current pathCahracterPosition
      */
     /*
        if current moveToDirection "r"
        else if current moveToDirection "l"
        else if current moveToDirection "u"
        else if current moveToDirection "d" 
      */
     return;
    }

  start () {
      this.askForDirection();
      this.updateField();
    }
  };



let firstField = new Field([])
firstField.generateField(5,4, 0.25);
firstField.start();