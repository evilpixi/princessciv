class DebugScene extends Phaser.Scene 
{
    constructor() { super("DebugScene") }

    preload() { }

    create() 
    {
        DEBUG.drawGrid(this, 50, 50)
        this.bgGrid = this.add.container(0, 0)
        this.add.text(GLOBAL.width/2, 10, "DEBUG SCENE", {color: "#ffffff", fontSize: 20, strokeThickness: 1}).setOrigin(0.5)

        this.add.text(GLOBAL.width - 10, 10, GLOBAL.width + "x" + GLOBAL.height, {color: "#999999", align: "center"}).setOrigin(1, 0)
        this.topRightText = this.add.text(GLOBAL.width - 10, 30, "A", {color: "#999999", align: "center"}).setOrigin(1, 0)
        this.input.on("pointermove", (pointer) => {
            this.topRightText.setText(`x: ${Math.floor(pointer.x)}\ny: ${Math.floor(pointer.y)}`)
        })

        // --- SCENES ---
        this.add.text(100, 30, "Scenes", {color: "#ffffff"}).setOrigin(0.5)

        for (let i = 2; i < GLOBAL.game.scene.scenes.length; i++)
        {
            let currentScene = GLOBAL.game.scene.scenes[i]
            console.log(currentScene)
            new UIButton(this, 100, 75 + 50*(i-2), currentScene.sys.config, ()=>{ this.scene.start(currentScene.sys.config) })
        }

        //this.debugButton1 = new UIButton(this, 100, 100, "deploy", ()=> {console.log("deployed")})
    }

    update() { }

    // ----------- inner functions ---------------
}