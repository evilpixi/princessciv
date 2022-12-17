class DebugScene extends Phaser.Scene 
{
    constructor() { super("DebugScene") }

    preload() { 
        this.load.spritesheet("female", "assets/images/female.png", {frameWidth: 51, frameHeight: 62})
        this.load.spritesheet("male", "assets/images/male.png", {frameWidth: 51, frameHeight: 62})
    }

    create() 
    {
        this.add.text(1920, 1080, "1920 x 1080", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 1600, 900, 0x000099, 0.3).setOrigin(0)
        this.add.text(1600, 900, "1600 x 900", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 1440, 810, 0xdd0000, 0.5).setOrigin(0)
        this.add.text(1440, 810, "1440 x 810", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 1280, 720, 0x2222ee, 0.5).setOrigin(0)
        this.add.text(1280, 720, "1280 x 720", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 960, 540, 0xddff00, 0.5).setOrigin(0)
        this.add.text(960, 540, "960 x 540", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 800, 450, 0x008800, 0.5).setOrigin(0)
        this.add.text(800, 450, "800 x 450", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 720, 405, 0x000055, 0.5).setOrigin(0)
        this.add.text(720, 405, "720 x 405", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 640, 360, 0xffffff, 0.15).setOrigin(0)
        this.add.text(640, 360, "640 x 360", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        this.add.rectangle(0, 0, 480, 270, 0x00ddee, 0.5).setOrigin(0)
        this.add.text(480, 270, "480 x 270", {color: "#ffffff", fontSize: 20}).setOrigin(1)

        

        // --- SCENES ---
        this.add.text(100, 30, "Scenes", {color: "#ffffff", fontSize: 24, strokeThickness: 1}).setOrigin(0.5)

        for (let i = 2; i < GLOBAL.game.scene.scenes.length; i++)
        {
            let currentScene = GLOBAL.game.scene.scenes[i]
            console.log(currentScene)
            new UIButton(this, 
                100, 
                75 + 50*(i-2), 
                currentScene.sys.config, 
                ()=>{ this.scene.start(currentScene.sys.config)}, 
                {
                    textStyle: { strokeThickness: 1, fontSize: 20},
                    width: 200
                })
        }

        //this.debugButton1 = new UIButton(this, 100, 100, "deploy", ()=> {console.log("deployed")})


        //------------------ sprites ------------------
        let frames = []
        for (let i = 0; i<12; i++) {frames.push(i)}
        this.anims.create({
            key: 'female-mis',
            frames: this.anims.generateFrameNumbers('female', { frames: [0, 1, 2, 1, 3, 4, 5, 4, 6, 7, 8, 7, 9, 10, 11, 10] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'male-mis',
            frames: this.anims.generateFrameNumbers('male', { frames: [0, 1, 2, 1, 3, 4, 5, 4, 6, 7, 8, 7, 9, 10, 11, 10] }),
            frameRate: 8,
            repeat: -1
        });

        let k = 1
        for (let i = 0; i < 120 * k; i += 30 * k) {
            let female1 = this.add.sprite(5 + i, 190*k, "female").setScale(0.5).setOrigin(0, 1)
            female1.play("ch-human-fe-body-walk-d")
        }

        k = 1.5
        for (let i = 0; i < 120 * k; i += 30 * k) {
            let male1 = this.add.sprite(5 + i, 150*k, "female").setScale(1).setOrigin(0, 1)
            male1.play("ch-human-fe-body-walk-l")
        }

        k = 2
        for (let i = 0; i < 120 * k; i += 30 * k) {
            let male2 = this.add.sprite(5 + i, 150*k, "female").setScale(2).setOrigin(0, 1)
            male2.play("ch-human-fe-body-walk-r")
        }

        k = 2.5
        for (let i = 0; i < 120 * k; i += 30 * k) {
            let female2 = this.add.sprite(5 + i, 150*k, "female").setScale(3).setOrigin(0, 1)
            female2.play("ch-human-fe-body-walk-u")
        }

        k = 3
        for (let i = 0; i < 120 * k; i += 30 * k) {
            let female2 = this.add.sprite(5 + i, 150*k, "female").setScale(4).setOrigin(0, 1)
            female2.play("ch-human-fe-body-walk-d")
        }
        
        //DEBUG.drawGrid(this, 50, 50)
        this.bgGrid = this.add.container(0, 0)
        this.add.text(GLOBAL.width/2, 10, "DEBUG SCENE", {color: "#ffffff", fontSize: 30, strokeThickness: 1}).setOrigin(0.5)

        this.add.text(GLOBAL.width - 10, 10, GLOBAL.width + "x" + GLOBAL.height, {color: "#999999", align: "center"}).setOrigin(1, 0)
        this.topRightText = this.add.text(GLOBAL.width - 10, 30, "A", {color: "#999999", align: "center"}).setOrigin(1, 0)
        this.input.on("pointermove", (pointer) => {
            this.topRightText.setText(`x: ${Math.floor(pointer.x)}\ny: ${Math.floor(pointer.y)}`)
        })

        this.resText = this.add.text(GLOBAL.width - 10, 60, "asd").setOrigin(1, 0)

        this.scale.x *= 2
        this.scale.y *= 2
    }

    update() 
    {
        const { displayScale, displaySize } = this.scale;

        this.resText.setText(`${Math.floor(displaySize.width)}x${Math.floor(displaySize.height)}\n(x${(1/displayScale.x).toFixed(2)})`);
    }

    // ----------- inner functions ---------------
}