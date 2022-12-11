class DebugScene extends Phaser.Scene 
{
    constructor() { super("DebugScene") }

    preload() { 
        this.load.spritesheet("female", "assets/images/female.png", {frameWidth: 51, frameHeight: 62})
        this.load.spritesheet("male", "assets/images/male.png", {frameWidth: 51, frameHeight: 62})
    }

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


        // ------------------ sprites ------------------
        let frames = []
        for (let i = 0; i<12; i++) {frames.push(i)}
        this.anims.create({
            key: 'female-mis',
            frames: this.anims.generateFrameNumbers('female', { frames: [0, 1, 2, 1] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'male-mis',
            frames: this.anims.generateFrameNumbers('male', { frames: [0, 1, 2, 1] }),
            frameRate: 8,
            repeat: -1
        });

        let female1 = this.add.sprite(50, 50, "female").setScale(4).setOrigin(0)
        let male1 = this.add.sprite(50, 50, "male").setScale(4).setOrigin(0)

        let male2 = this.add.sprite(250, 50, "male").setScale(4).setOrigin(0)
        let female2 = this.add.sprite(250, 50, "female").setScale(4).setOrigin(0)

        female1.play("female-mis")
        female2.play("female-mis")
        male1.play("male-mis")
        male2.play("male-mis")
    }

    update() { }

    // ----------- inner functions ---------------
}