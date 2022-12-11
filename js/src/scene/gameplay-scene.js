class GameplayScene extends Phaser.Scene {
    constructor() {
        super("GameplayScene")
    }

    preload() 
    {
        this.load.spritesheet("female", "assets/images/female.png", {frameWidth: 51, frameHeight: 62})
        this.load.spritesheet("male", "assets/images/male.png", {frameWidth: 51, frameHeight: 62})
    }


    create() 
    {
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

    update() 
    {
    }
}
