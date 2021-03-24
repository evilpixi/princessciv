class Hexgrid 
{
  constructor(map) 
  {
    this.map = map
    this.width = this.map.width
    this.height = this.map.height

    this.tileWidth = this.map.tileWidth
    this.tileHeight = this.map.tileHeight

    this.sideLength = this.map.hexSideLength

    this.grid = []
    this.elements = []

    for (let i = 0; i < this.map.height; i++) 
    {
      let column = []
      
      for (let j = 0; j < this.map.width; j++) 
      {
        column.push("")
      }

      this.grid.push(column)
    }
  }



  /** Returns the physical {x, y} position of a tile */
  getPosition(q, r) 
  {
    return {
      x: this.tileWidth/2  + this.tileWidth * q + (r&1) * this.tileWidth/2,
      y: this.tileHeight/2 + (3/4)*this.tileHeight * r
    }
  }


  getAllCoordinates() 
  {
    let coordinates = []

    for (let i = 0; i < this.height; i++) 
    {
      let column = []

      for (let j = 0; j < this.width; j++) 
      {
        let pos = this.getPosition(i, j)
        column.push({
          q: i,
          r: j,
          x: pos.x,
          y: pos.y,
          element: this.getElementAt(i, j)
        })
      }

      coordinates.push(column)
    }

    return coordinates
  }


  getCoordinatesOf(element) 
  {
    let e = this.elements.find(e => e == element)
    return {q: e.q, r: e.r}
  }
  

  getElementAt(q, r) 
  {
    return this.grid[q][r] || null
  }

  addElement(q, r, element) 
  {
    this.elements.push(element)
    this.moveElementTo(q, r, element)

    element.gridData = {
      grid: this,
      q: q,
      r: r
    }
  }  

  

  getNeighbors(q, r, opts = {}) 
  {
    let cube = Hexgrid.toCubic(q, r)

    let permutations = [
      [+1, -1, 0], [+1, 0, -1], [0, +1, -1],
      [-1, +1, 0], [-1, 0, +1], [0, -1, +1]
    ]

    let neighbors = []

    for (let p of permutations) 
    {
      let neighbor = new Cube(
        cube.qx + p[0],
        cube.qy + p[1],
        cube.qz + p[2]
      )
      
      if (opts?.check) 
      {
        let coords = Hexgrid.toOffset(neighbor)
        
        if (coords.q < 0 || 
            coords.r < 0 ||
            coords.q >= this.width ||
            coords.r >= this.height)
          {
            continue
          }
      }

      neighbors.push(neighbor)
    }

    return neighbors
  }

  initLayer(layerIndex) 
  {
    for (let i = 0; i < this.map.height; i++) {
      let column = []
      
      for (let j = 0; j < this.map.width; j++) {
        
        this.grid[i][j] = this.map.layers[layerIndex].data[i][j].index
      }
    }
  }

  moveElementTo(q, r, element) {
    this.grid[q][r] = element

    let pos = this.getPosition(q, r)
    console.log(pos)
    element.x = pos.x
    element.y = pos.y
  }

  getPosibleMovements(x,y) {

  }


  /* ------------------------------------------ */
  /* --------------- Privates ----------------- */
  /* ------------------------------------------ */
  static toCubic(hex, r) 
  {
    if (r!=undefined) hex = { q: hex, r: r}

    let qx = hex.q - (hex.r - Math.abs(hex.r%2)) / 2
    let qz = hex.r
    let qy = -qx-qz
    return new Cube(qx, qy, qz)
  }

  static toOffset(cube) 
  {
    let q = cube.qx + (cube.qz - Math.abs(cube.qz%2))/2
    let r = cube.qz
    return { q, r }
  }  

  log() 
  {
    console.table(this.grid)
  }
}


class Cube 
{
  constructor(qx, qy, qz) 
  {
    this.qx = qx
    this.qy = qy
    this.qz = qz
  }

  toOffset()
  {
    return Hexgrid.toOffset(this)
  }
}


class HexgridTile 
{
  constructor(hexgrid, x=0, y=0) 
  {
    this.hexgrid = hexgrid
    this.x = x
    this.y = y
    this.element
  }
}