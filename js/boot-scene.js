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
    }

    create() 
    {
        this.scene.start("GameScene")
    }

    update() 
    {
        
    }
}