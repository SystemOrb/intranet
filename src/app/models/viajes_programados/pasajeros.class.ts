export class Pasajeros {
    constructor(
        public idviaje: number | string,
        public pasajero: string,
        public DNI: string,
        public nroasiento: string | number,
        public nropasaje: string | number,
        public precio: string | number,
        public observacion: string,
        public origenruta: string,
        public destinoruta: string
    ) {}
}
