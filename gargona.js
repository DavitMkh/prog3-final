let LivingCreature = require("./LivingCreature")

module.exports =class Gargona extends LivingCreature {
    constructor(x, y, index) {
        super(x,y)
        this.index = index;
        this.directions = [];

    }
   
    
    stone() {
        this.getNewCoordinates()
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix[1].length) {
                matrix[y][x] = 6

            }
            this.die()
        }

    }
    move() {

        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells2 = this.chooseCell(3)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        var emptyCells3 = this.chooseCell(4)
        var newCell3 = emptyCells3[Math.floor(Math.random() * emptyCells3.length)]
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break


                }
                matrix[newY][newX] = 6
            }
            this.stone()
        }
        else if (newCell2) {
            var newX = newCell2[0]
            var newY = newCell2[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break


                }
                matrix[newY][newX] = 6
            }
            this.stone()

        }
        else if (newCell3) {
            var newX = newCell3[0]
            var newY = newCell3[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            this.x = newX
            this.y = newY
            for (var i in humanArr) {
                if (newX == humanArr[i].x && newY == humanArr[i].y) {
                    humanArr.splice(i, 1)
                    break


                }
                matrix[newY][newX] = 6
            }
            this.stone()

        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in gargonaArr) {
            if (this.x == gargonaArr[i].x && this.y == gargonaArr[i].y) {
                gargonaArr.splice(i, 1);
                break;
            }
        }
    }



}
