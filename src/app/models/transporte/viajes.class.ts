export class ViajesProgramadosPorRuta {
    constructor (
        public idviaje: string | number,
        public idruta: string | number,
        public nromanifiesto: string,
        public origen: string,
        public destino: string,
        public idserv: string | number,
        public tiposerv: string,
        public nroresolucion,
        public fecha: Date,
        public hora: string
    ) {}
}
