class DEBUG {
    static drawGrid(scene, width, height) {
        if (width <= 0 || height <= 0) return

        scene.debugGrid = scene.add.graphics({
            x: 0,
            y:0,
            lineStyle: {
                width: 1,
                color: 0x00ff00,
                alpha: 1
            }
        })

        for (let x = width; x < GLOBAL.width; x += width)
        {
            scene.debugGrid.lineBetween(x, 0, x, GLOBAL.height)
        }
        for (let y = height; y < GLOBAL.height; y += height)
        {
            scene.debugGrid.lineBetween(0, y, GLOBAL.width, y)
        }
    }
}