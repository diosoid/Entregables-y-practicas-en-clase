class Contador {
    
    constructor(responsable) {        
        this.responsable = responsable       
        this.contador = 0
    }
    
    static contadorGlobal = 0;

    getResponsable(){
        return this.responsable
    }    

    contar(){
        this.contador++
        Contador.contadorGlobal++
    }   

    getCuentaIndividual(){
        return this.contador        
    }
    getCuentaGlobal(){
        return Contador.contadorGlobal      
    }
    
}

const contador1 = new Contador('Pablo')
const contador2 = new Contador('Raul')
const cuentageneral = new Contador('Admin')


contador1.contar()
contador1.contar()
contador1.contar()
contador1.contar()
contador1.contar()

contador2.contar()
contador2.contar()
contador2.contar()

console.log('contador1:', contador1.getResponsable())
console.log('contador1:', contador1.getCuentaIndividual())

console.log('contador1:', contador2.getResponsable())
console.log('contador1:', contador2.getCuentaIndividual())

console.log('contador General:', cuentageneral.getCuentaGlobal())
