let p0 = 160
let p = p0
let tNat = 0.1
let espV = 15
let sup = 10000
let FH = 1


let natalidadNatural = ()=> p * (1 + tNat)
let mortalidadNatural = ()=> p / espV

let imph = ()=> {
  if (p/sup > FH) return (p/sup - FH) / 50
  else return 0
}

let mortalidadHacinamiento = ()=> p * imph()

let simularUnPaso = ()=> {
  p = natalidadNatural() - mortalidadNatural() - mortalidadHacinamiento()
  return p
}

let sim = (max)=> {
  let i = 1
  
  do {
    console.log(i + " => " + Math.ceil(simularUnPaso()),
      mortalidadHacinamiento())

    i++
  } while (i<=max || p <= 0)
}