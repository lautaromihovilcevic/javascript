// Entrada de datos
let nombreCliente = prompt("Ingrese su nombre y apellido");
let zapatillas = prompt("Ingrese el precio de la/s zaptillas:\nAir force1 $300.000\nNike Dunk Retro $190.000\nNike Zoom Lebron $284.999\nNike Zoom Freak 5 $224.999\nNike Air Max 1 $256.999\nNike Lunar Force 1 $329.999\nNike Air Max 90 $239.999\nNike Lebron XX $359.999");
let total = zapatillas


// Datos del sistema
const MontoMax1 = 280.000;
const MontoMax2 = 400.000;
const DescuentoMax1 = 10;
const DescuentoMax2 = 15;

if(total > MontoMax1 && total < MontoMax2){
    console.log("total: $" + total);
    descuentoAplicado = (total * DescuentoMax1) / 100;
    console.log("descuento (" + DescuentoMax1 + "%) $" + descuentoAplicado);
    total = total - descuentoAplicado;
console.log("total c/descuento aplicado: $" + total);
}else if(total>MontoMax2){
    console.log("total: $" + total);
    descuentoAplicado = (total * DescuentoMax2) / 100;
    console.log("descuento (" + DescuentoMax2 + "%) $" + descuentoAplicado);
    total = total - descuentoAplicado;
console.log("total c/descuento aplicado: $" + total);
}

alert("El total a pagar es: $" + total);


    // if(Edad >=18){
    //     alert("Puedes comprar alcohol!")
    // }else if(Edad<18){
    //     alert("Todavia no tenes la edad suficiente para consumir alcohol");
    // } 


    
// else if (Edad = true){
//     let bebidasvodka = "Ingrese una marca de vodka";
// let Cerveza = "Ingrese una marca de cerveza";
// let Vino = "Ingrese una marca de vino";
// let Fernet = "Ingrese una marca de fernet";
// }