class BootScene extends Phaser.Scene 
{
    constructor() 
    {
        super("BootScene")
    }

    preload() 
    {
        this.load.image("char", "assets/images/char.png")
        this.load.image("bg-forest", "assets/images/bg-forest.png")

        this.load.tilemapTiledJSON("map1", "assets/tiles/map_forest1.json")
        this.load.image("pattern", "assets/tiles/pattern1.png")


        // --- chars ---
        this.load.spritesheet("ch-human-fe-body-walk", "assets/chars/body/ch-human-fe-body-walk.png", {frameWidth: 51, frameHeight: 51})
    }

    create() 
    {
        let directions = ["d", "l", "r", "u"]
        let animations = ["walk", "stand"]
        let framesDict = {
            "stand-d": [0],
            "stand-l": [4],
            "stand-r": [8],
            "stand-u": [12],
            "walk-d": [0, 1, 2, 3],
            "walk-l": [4, 5, 6, 7],
            "walk-r": [8, 9, 10, 11],
            "walk-u": [12, 13, 14, 15]
        }
        let bodyParts = ["body"]

        for (let dir of directions)
        {
            for (let anim of animations)
            {
                for (let part of bodyParts)
                {
                    this.anims.create({
                        key: 'ch-human-fe-' + part + "-" + anim + '-' + dir,
                        frames: this.anims.generateFrameNumbers('ch-human-fe-body-walk', { frames: framesDict[anim + "-" + dir] }),
                        frameRate: 8,
                        repeat: -1
                    });
                }
            }
        }


        if (GLOBAL.debugMode)   this.scene.start("DebugScene")
        else                    this.scene.start("GameplayScene")
    }

    update() 
    {
        
    }
}