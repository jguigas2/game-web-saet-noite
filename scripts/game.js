console.log('game.js loaded');

const canvas = document.querySelector('#game');
const contexto = canvas.getContext('2d');

var frame = 0
var playerImage = new Image()
var floorImage = new Image()
var gameoverImage = new Image()
var backgroundImage = new Image()
var canocimaImage = new Image()
var canobaixoImage = new Image()
playerImage.src = "./images/bird-asa-baixo.png"
floorImage.src = "./images/chao.png"
gameoverImage.src = "./images/game-over.png"
backgroundImage.src = "./images/fundo.png"
canocimaImage.src = "./images/cano-ceu.png"
canobaixoImage.src = "./images/cano-chao.png"

let gameOver = false

var player = {
    x: 50,
    y: 50,
    speed: 0,
    gravity: 0.2,
    desenha(){
        contexto.drawImage(playerImage, this.x, this.y)
    },
    atualiza(){
        this.speed += this.gravity
        this.y += this.speed
    },
    jump() {
    this.speed = -5;
    },
    die() {
    if (this.y >= floor.y - 35) { 
        contexto.drawImage(gameoverImage, 50, 150)
        gameOver = true
        }
    }

}

var floor = {
    x: 0,
    y: 370,
    desenha() {
        contexto.drawImage(floorImage, this.x, this.y)
        contexto.drawImage(floorImage, (this.x)+100, this.y)
    }

}

var background = {
    x: 0,
    y: 170,
    desenha() {
        contexto.drawImage(backgroundImage, this.x, this.y)
        contexto.drawImage(backgroundImage, this.x+100, this.y)
    }
}

function criarCano() {
    let cano = {
    x:320,
    y:0,
    altura:400,
    espaço:100,
    margeMin:140, 
    margemPorcentagem:(Math.random()*1.5)+1,
    desenha() {
        let margem = this.margeMin * this.margemPorcentagem
        contexto.drawImage(canocimaImage, this.x, this.y - margem)
        contexto.drawImage(canobaixoImage, this.x, this.y + this.altura + this.espaço - margem )
        },
    atualiza() {
        this.x -= 1
        }
    }
    return cano;
}

var canoLista = [];

function loop() {

    if(!gameOver) {
    contexto.clearRect(0,0,canvas.width, canvas.height)
    frame++;
    if(frame % 200 == 0){
        
        canoLista.push(criarCano())
    }
    background.desenha()
    canoLista.forEach(cano => {
        cano.desenha()
        cano.atualiza()
    })
    floor.desenha()

    player.die()
    player.atualiza()
    player.desenha()
    canoLista.forEach(cano => {
        if(cano.x <= -52) 
        canoLista.shift()
    })

    requestAnimationFrame(loop)
    }
    if(MouseEvent)
}
loop()


document.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
        player.jump()
    }
})
