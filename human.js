let LivingCreature = require("./LivingCreature")

module.exports =  class Human extends LivingCreature {
    constructor(x, y, index) {
        super(x,y)
        this.index = index;
        this.energy = 30;
        this.multiply = 0;
        this.directions = [];

    }
    
    
    mul() {
        this.multiply++
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.multiply >= 38) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newHuman = new Human(newX, newY);
            humanArr.push(newHuman);
            this.multiply = 0;
        }
    }
    move() {
        this.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(4)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else if (newCell1 && this.energy >= 0) {
            var dangerCell = Math.floor(Math.random())
            if (dangerCell == 0) {
                this.energy = this.energy + 15
                let newX = newCell1[0]
                let newY = newCell1[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
            }
            else if (dangerCell == 1) {
                matrix[this.y][this.x] = 3
                this.die()
            }

        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    eat() {
        var emptyCells = super.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(2)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        if (newCell) {
            this.energy = this.energy + 1
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else if (newCell1) {
            this.energy = this.energy + 5
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in humanArr) {
            if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                humanArr.splice(i, 1);
                break;
            }
        }
    }



}