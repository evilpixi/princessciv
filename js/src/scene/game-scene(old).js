class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")

        this.char

        this.units = []
        this.map
        this.grid

        this.selected = null

        this.debugText
    }

    preload() 
    {
        
    }

    create() 
    {
        this.cameras.main.setBackgroundColor('#2a9c5b')
        this.cameras.main.setZoom(1)

        this.map = this.make.tilemap({key: "map1"})
        this.tileset = this.map.addTilesetImage("pattern1", "pattern")
        this.layer1 = this.map.createLayer("terrain", this.tileset)
        this.layer2 = this.map.createLayer("elements", this.tileset)

        this.grid = new Hexgrid(this.map)
        gs = this
        
        //this.add.image(gWidth/2, gHeight/2, "bg-forest")
        
        this.char = this.physics.add.image(300, 300, 'char')
        this.char.setScale(2)

        this.cameras.main.startFollow(this.char, true, 0.08, 0.08);

        this.cursors = this.input.keyboard.createCursorKeys();
        gdv = this.char


        if (debugMode) 
        {
            let gridElements = this.grid.getAllCoordinates()

            let i = 0
            for (let q of gridElements) 
            {
                if (i>=7) continue
                i++
                let j = 0
                for (let c of q) 
                {
                    if (j>=7) continue
                    j++
                    let cube = Hexgrid.toCubic(c.q, c.r)
                    this.add.text(c.x, c.y, 
                        `(${c.q}, ${c.r})\n[${cube.qx},${cube.qy},${cube.qz}]\nx: ${c.x}\ny: ${c.y}`)
                    .setAlpha(0.5)
                    .setOrigin(0.5)
                }
            }

            this.debugText = this.add.text(20, 20, 
                `${gWidth} x ${gHeight}\n${this.selected}`)
            .setScrollFactor(0, 0)
        
        }
        
        this.grid.addElement(3, 5, this.char)

        this.selected = this.char


        let tl = this.map.layers[0].tilemapLayer
        tl.setInteractive()
        gdv = tl

        this.selectionCircle = this.add.circle(0, 0, 65).setAlpha(0)
        this.selectionCircle.setStrokeStyle(4, 0x66ff00);

        // pointer
        tl.on("pointerdown", (pointer)=> 
        {
            console.log(pointer.worldX, pointer.worldY)

            let coords = tl.worldToTileXY(pointer.worldX, pointer.worldY)
            console.log(coords)
            let tile = this.getTileAtClick({x: pointer.worldX, y: pointer.worldY})
            console.log(this.grid.getElementAt(tile.x, tile.y))

            this.selected = this.grid.getElementAt(tile.x, tile.y)

            this.selectionCircle.setAlpha(0)
            this.selectionCircle.setScale(1.5)
            let pos = this.grid.getPosition(tile.x, tile.y)
            console.log(pos)
            this.selectionCircle.setPosition(pos.x, pos.y)
            this.tweens.add({
                targets: this.selectionCircle,
                duration: 120,
                alpha: 1,
                scale: 1
            })


            /*let clickedTileCoordinates = this.getTileAtClick(pointer)

            let {x,y} = clickedTileCoordinates
            console.log(x,y)
            let element = this.grid.getElementAt(x, y)
            
            this.selected = element*/

            /*if (element)
            {
                this.selected = element
            }*/
        })
    }

    getTileAtClick(pointer)
    {
        return this.map.layers[0].tilemapLayer
        .worldToTileXY(pointer.x, pointer.y, true)
        /*, undefined,
            this.cameras.main)*/
    }

    update() 
    {
        this.char.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.char.setVelocityX(-200).setFlipX(true);
        }
        else if (this.cursors.right.isDown)
        {
            this.char.setVelocityX(200).setFlipX(false);
        }
    
        if (this.cursors.up.isDown)
        {
            this.char.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown)
        {
            this.char.setVelocityY(200);
        }

        this.debugText.setText(`${gWidth} x ${gHeight}\n${this.selected}`)
    }
}
