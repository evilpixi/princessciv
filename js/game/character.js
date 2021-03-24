class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.name)
        
        this.scene = config.scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this);

        this.name = config.name
        this.setCollideWorldBounds(true)

        // config variables
        this.walkSpeed = 10
        this.jumpSpeed = 10

        // status
        this.onAir = 1      
        this.direction = 1
    }

    // movement
    walk(direction) {
        this.setVelocityX(direction * this.walkSpeed)
    }

    moveLeft() {        
        this.direction = -1
        this.walk(-1)
    }
    moveRight() {        
        this.direction = 1
        this.walk(1)
    }
    stand() {
        this.walk(0)
    }

    jump() {     
        if (this.onAir) return   
        this.setVelocityY(-this.jumpSpeed)
    }

    update() {
        
    }
}