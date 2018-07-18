export class Ruta {
    constructor (
        public idruta: number | string,
        public origen: string,
        public destino: string,
        public nroresolucion: string,
        public fecha: Date | string,
        public hora: Date | string
    ) {}
}
