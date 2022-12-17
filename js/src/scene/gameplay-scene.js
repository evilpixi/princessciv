class GameplayScene extends Phaser.Scene {
    constructor() {
        super("GameplayScene")
    }

    preload() 
    {
        
    }


    create() 
    {
        this.char1 = new Character(this, 200, 200, {
            race: Character.RACES.HUMAN,
            gender: Character.GENDERS.FEMALE
        })
    }

    update() 
    {
    }
}
