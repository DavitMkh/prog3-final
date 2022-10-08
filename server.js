var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log("server run");
});

function generator(matLen, gr, gre, pr, hum, gar) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < gre; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < hum; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < gar; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}


 matrix = generator(20, 20, 10, 10, 5, 3);
 io.sockets.emit('send matrix',matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
humanArr = []
gargonaArr = []

weath = "winter"


Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Human = require("./human")
Gargona = require("./gargona")

function createObject(matrix,socket){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y)
                grassEaterArr.push(gre)
            } else if (matrix[y][x] == 3) {
                let pr = new Predator(x, y)
                predatorArr.push(pr)
            } else if (matrix[y][x] == 4) {
                let hum = new Human(x, y)
                humanArr.push(hum)
            } else if (matrix[y][x] == 5) {
                let gar = new Gargona(x, y)
                gargonaArr.push(gar)
            }
        }
    }
    socket.emit('send matrix',matrix)
    
}

function game(socket){
    for (let i in grassArr) {
        grassArr[i].mul()
    }


    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    for (let i in humanArr) {
        humanArr[i].mul()
        humanArr[i].eat()
    }
    for (let i in gargonaArr) {
        gargonaArr[i].eat()

    }
    socket.emit('send matrix',matrix)
}




function kill(socket) {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    socket.emit("send matrix", matrix);
}

function addGrass(socket) {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    socket.emit("send matrix", matrix);
}

function addGrassEater(socket) {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            var gre = new GrassEater(x, y, 2)
            grassEaterArr.push(gre)
        }
    }
    socket.emit("send matrix", matrix);
}
function addPredator(socket) {
    for (var i = 0; i < 3; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            var pr = new Predator(x, y, 3)
            predatorArr.push(pr)
        }
    }
    socket.emit("send matrix", matrix);
}
function addHuman(socket) {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            var hum = new Human(x, y, 4)
            humanArr.push(hum)
        }
    }
    socket.emit("send matrix", matrix);
}
function addGargona(socket) {
    for (var i = 0; i < 3; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            var gar= new Gargona(x, y, 5)
            gargonaArr.push(gar)
        }
    }
    socket.emit("send matrix", matrix);
}


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function(socket){
    setInterval(function(){
        game(socket);
    },800)
    createObject(matrix,socket)
    socket.on("kill", kill,socket);
    socket.on("add grass", ()=>{
        addGrass(socket)
    });
    socket.on("add grassEater", ()=>{
        addGrassEater(socket)
    });
    socket.on("add predator", ()=>{
        addPredator(socket);
    });
    socket.on("add human", ()=>{
        addHuman(socket);
    });
    socket.on("add gargona", ()=>{
        addGargona(socket);
    });
})


var statistics = {}
setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.human = humanArr.length;
    statistics.gargona = gargonaArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)