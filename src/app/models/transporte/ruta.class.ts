export class Ruta {
    constructor(
        public idruta: string | number,
        public ruta: string,
        public nresolucion: string,
        public idserv?: string | number,
        public hora?: string
    ) {}
}
