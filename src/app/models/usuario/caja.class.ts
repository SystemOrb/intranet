export class Caja {
    constructor(
        public obs: string,
        public turno: string,
        public docpago: Date | string,
        public fechaabono: Date | string,
        public origen: string,
        public destino: string,
        public montopagado: string | number,
        public docid: string,
        public cliente: string,
        public estado?: boolean | string,
        public formapago?: string
    ) {}
}
