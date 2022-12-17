class Character extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config) 
    {
        super(scene, x, y)
        scene.add.existing(this)
        
        this.race = config.race
        this.gender = config.gender
        this.type = this.race + "-" + this.gender
        this.sprites = {
            body: scene.add.sprite(0, 0, "char-" + config.type)
        }
        
        this.name = NamesTable[this.type][Math.floor(Math.random()*NamesTable.length)];
        this.dirX = 0
        this.dirY = 0
        this.direction = "d"
        this.status = "stand"
        
        this.playAnim(this.status, this.direction)

        // add children
        for (let spr in this.sprites)
        {
            this.add(this.sprites[spr])
        }

        this.currentTask = {}
    }

    playAnim(animation, direction)
    {
        for (let part in this.sprites)
        {
            let spritePart = this.sprites[part]
            console.log(spritePart)
            let anim = ["ch", this.type, part, animation, direction].join("-")
            if (GLOBAL.debugMode) console.log(anim)

            spritePart.anims.play(anim)
        }
    }

    // movement
    setDirection(direction)
    {

    }

    walk(direction) {
        this.setDirection(direction)
        this.setVelocityX(direction * 100)
    }

    stand() {
        
    }

    executeTask() {
        if (!this.task) return


    }

    update() {
        executeTask()
    }
}

let NamesTable = {
    "human-fe" : ["Roberta", "Laura", "Cassandra", "Vayne", "Lila", "Wyslisa", "Colette"]
}

Character.RACES = {
    HUMAN: "human"
}

Character.GENDERS = {
    FEMALE: "fe",
    MALE: "ma"
}