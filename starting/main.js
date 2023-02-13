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
    console.log(`${this.field.toString().replace(/,/g, "")}`)
  }

  askForDirection () {
    readline.question(
      `Which direction would you like to move?`, 
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
    
    generateField (height, width, percentageHoles) {

      let ramdomPosition = () => {
        let position = Math.floor(Math.random()*((characters.length - 1) + 1))
        return position;
      };
        let characters = Array((height*width));
        let numberOfHoles = Math.floor(height*width*percentageHoles)
        characters.splice(0, 1, pathCharacter);
        
        for (let j = 0; j < numberOfHoles ; j+= 1) { 
          let inserted =  false
          while (inserted === false ) {
            let position = ramdomPosition();
            if (characters[position] === undefined ) {
               characters.splice(position, 1, hole)
               inserted = true;
            }
          }
        }

        for (let i = 0; i < characters.length - 1; i+= 1) {
          if (characters[i] === undefined) {
            characters[i] = fieldCharacter
          }
        }
         
        for (let i = 1; i < characters.length; i+= 1) {
          let position =  ramdomPosition();
          if (characters[position] === fieldCharacter ) {
              characters[position] = hat
              break
          }
        }
        this.field = characters;
        return characters;
    }
    
    updateField(direction) {
      /*
        get current pathCahracterPosition
        if current moveToDirection "r"
        else if current moveToDirection "l"
        else if current moveToDirection "u"
        else if current moveToDirection "d" 
      */

        this.field = "cerveza"
        return;
     }

  start () {
      this.print();
      this.askForDirection();
    }
  };



let firstField = new Field([])
firstField.generateField(20,20, 0.3);
firstField.start();