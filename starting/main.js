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
    this.pathCharacterPosition = [0,0];
  }

  printField () {
    this.field.forEach(array => {
        console.log(`${array.toString().replace(/,/g, "")}`);
    });
  }

  killTheProcess() {
    process.exit();
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
          this.printField();
          this.askForDirection();
       }
      )
    }
    
    generateField (width, height, percentageHoles) { 
      let field = [];
      let hatPossition = []; // 0 would be the array in field 1 the element
      let numberOfHoles = Math.floor(height*width*percentageHoles)
      let randomPosition = () => {
        let index1 = Math.floor(Math.random()*((height - 1) + 1));
        let index2 = Math.floor(Math.random()*((width - 1) + 1));
        return [index1, index2];
      };
      // creates field
      for (var i = 0; i < height; i++) {
        var innerArray = [];
        for (var j = 0; j < width; j++) {
          innerArray.push(fieldCharacter); // push width elements to each innerArray
        }
        field.push(innerArray); // push the current innerArray to the field
      };
      // insert path character to the innerArray at position 0 in the field replacing the element at index 0 by pathCharacter
      field[0].splice(0, 1, pathCharacter);
      // insert hat
      //console.log(field)
      do {
        hatPossition = randomPosition();
      } while (hatPossition === [0,0]); // get any randomPosition for the hat until it's not the first element of the forst array

      field[hatPossition[0]].splice(hatPossition[1], 1, hat) // insert the hat character to the randomPosition
      // insert wholes
      for (let j = 0; j < numberOfHoles; j += 1) {
        let inserted = false;
        while (inserted === false ) {
            let position = randomPosition();
            if (field[position[0]][position[1]] === fieldCharacter ) {
               field[position[0]].splice(position[1], 1, hole) // replace fieldCharacter by hole
               inserted = true;
            }
          }

      }
      this.field = field;
      //console.log(field);
      return;
    }
    
    updateField(direction) {
    /*get current pathCharacterPosition - already saved as a property of the instance object
      get targetPosition based on the user input
      check if targetPosition is hat
        return you won if so
        else continue
      if current moveToDirection "r"
        replace pathCharacterPosition by fieldCharacter
        check the adjacent element to the right of the pathCharacter
          if element is undefined print yiu are out of bounderies and ask the user again
          if the element is a whole
            print you lose and close the process
          else
            replace the fieldCharacer by pathCharacter and update pathCharacter
    */
      let targetPosition = [];
      let updatePathCharacter =  () => {
        this.field[this.pathCharacterPosition[0]].splice([this.pathCharacterPosition[1]], 1, fieldCharacter); // update pathCharacter by fieldCharacter
        this.field[targetPosition[0]].splice(targetPosition[1], 1, pathCharacter); // update position of pathCharacter
        this.pathCharacterPosition = targetPosition
       };
      let checkOutOfBounderies = () => {
        if ( targetPosition[0] === -1 || this.field[targetPosition[0]][targetPosition[1]] === undefined) {
          console.log(`You are out of the bounderies of the field. Game over!`);
          this.killTheProcess();
        } 
        return;
       }
       let checkIfHole = () => {
        if (this.field[targetPosition[0]][targetPosition[1]] === hole ) {
          console.log(`You felt into a hole. Game over!`);
          this.killTheProcess();
        } 
       }
  
       let checkIfHat = () => {
        if (this.field[targetPosition[0]][targetPosition[1]] === hat) {
          console.log('You won!');
          this.killTheProcess();
         }
         return;
       }

       let runChecks = () => {
         checkOutOfBounderies(); 
         checkIfHat();
         checkIfHole();
         console.log(`targetPosition = [${targetPosition}]\n`);
         updatePathCharacter();
         return;
       }

       let getTargetposition = (direction) => {
         if (direction === "r") {
           targetPosition = [this.pathCharacterPosition[0], this.pathCharacterPosition[1] + 1];
         } else if (direction === "l") {
           targetPosition = [this.pathCharacterPosition[0], this.pathCharacterPosition[1] - 1];
         } else if (direction === "u") {
           targetPosition = [this.pathCharacterPosition[0] - 1, this.pathCharacterPosition[1]]; // this is not working when staring up
         } else if (direction === "d") {
           targetPosition = [this.pathCharacterPosition[0] + 1, this.pathCharacterPosition[1]];
         } else {
           console.log(`Press "r" to move right, "l" to move left, "u" t move up, and "d" to move down. Other than that is an invalid input`)
         }
         return;
       }
       
       if (direction === "r") {
         getTargetposition(direction);
         runChecks();
       } else if (direction === "l") {
         getTargetposition(direction)
         runChecks();
       } else if (direction === "u") {
         getTargetposition(direction);
         runChecks();
       } else if (direction === "d") {
          getTargetposition(direction);
          runChecks();
       } else {
          getTargetposition(direction); 
       }

     return;
    }

  start () {
      this.printField()
      this.askForDirection();
      this.updateField();
    }
  };



let firstField = new Field([])
firstField.generateField(5,4, 0.25);
firstField.start();