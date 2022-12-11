class GLOBAL {}

GLOBAL.width = 960
GLOBAL.height = 528
// --------------------- DEBUG TOOLS --------------------- 
GLOBAL.debugMode = 1
GLOBAL.dbg = {}

if (GLOBAL.debugMode) {
    console.log("Width", GLOBAL.width)
    console.log("Height", GLOBAL.height)
}

// --------------------- GAME CONFIG --------------------- 
GLOBAL.gameConfig = {
    type: Phaser.CANVAS,
    scale: {
        parent: 'gameContainer',
        mode: Phaser.Scale.NONE,//Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GLOBAL.width,
        height: GLOBAL.height
    },
    autoStart: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: GLOBAL.debugMode,
            gravity: {y: 1}
        }
    },
    render: {
        antialias: false
    }
}

// --------------------- SCENES ---------------------

GLOBAL.game = new Phaser.Game(GLOBAL.gameConfig)
GLOBAL.game.scene.add("DebugScene", DebugScene)
GLOBAL.game.scene.add("BootScene", BootScene)
GLOBAL.game.scene.add("UITestScene", UITestScene)
GLOBAL.game.scene.add("GameplayScene", GameplayScene)

GLOBAL.game.scene.start("BootScene")