let isLandscape = ()=> {
    return window.innerWidth > window.innerHeight
}
window.onload = ()=> validatePortrait();
window.onresize = ()=> validatePortrait();
let validatePortrait = ()=> {
    forceLandscape.style.display = isLandscape()? 'none' : 'block'
    gameContainer.style.display = isLandscape()? 'block' : 'none'
}

let gHeight = 720
let gWidth = isLandscape()? 
    Math.ceil(gHeight * (window.innerWidth / window.innerHeight)) :
    Math.ceil(gHeight * (window.innerHeight / window.innerWidth))


// --------------------- DEBUG TOOLS --------------------- 
let debugMode = 1
var gdv
var gs

if (debugMode) {
    console.log("isLandscape", isLandscape())
    console.log("gWidth", gWidth)
    console.log("gHeight", gHeight)
}

// --------------------- GAME CONFIG --------------------- 
let gameConfig = {
    type: Phaser.CANVAS,
    scale: {
        parent: 'gameContainer',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gWidth,
        height: gHeight
    },
    autoStart: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 1}
        }
    },
    render: {
        antialias: false
    }
}

// --------------------- SCENES ---------------------

let game = new Phaser.Game(gameConfig)
game.scene.add("BootScene", BootScene)
game.scene.add("GameScene", GameScene)

game.scene.start("BootScene")