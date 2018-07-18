export class ListadoViajesProgramados {
    constructor(
        public idviaje: number | string,
        public idruta: number | string,
        public nromanifiesto: string,
        public origen: string,
        public destino: string,
        public idserv: number | string,
        public tiposerv: string,
        public nroresolucion: string,
        public fecha: Date | string,
        public hora: string
    ) {}
}
