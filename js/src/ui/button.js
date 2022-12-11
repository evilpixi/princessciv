class UIButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, callback, config = {})
    {
        super(scene, x, y)
        scene.add.existing(this)

        this.isClicked = false
        this.btnRectOn
        this.btnRectOff

        this.width = config.width || 180
        this.height = config.height || 40

        if (config.image)
        {
            // do something
        }
        else {
            this.btnRectOn = scene.add.rectangle(0, 0, this.width, this.height, 0xffaa44, 1)
            this.btnRectOff = scene.add.rectangle(0, 0, this.width, this.height, 0xcc8822, 1)
        }
        
        this.btnText = scene.add.text(0, 0, text, config.textStyle || {color: "#000000"}).setOrigin(0.5)
            
        this.add(this.btnRectOff)
        this.add(this.btnRectOn)
        this.add(this.btnText)

        this.btnRectOff.setInteractive()
        this.btnRectOff.on("pointerdown", (pointer) => {
            this.btnRectOn.alpha = 0
            this.isClicked = true
        })
        this.btnRectOff.on("pointerout", (pointer) => {
            this.btnRectOn.alpha = 1
            this.isClicked = false
        })
        this.btnRectOff.on("pointerup", (pointer) => {
            if (this.isClicked) {
                this.btnRectOn.alpha = 1
                this.isClicked = false
                callback()
            }
        })
    }
}