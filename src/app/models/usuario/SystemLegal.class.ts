export class SystemLegalDoc {
    constructor (
        public nombre: string,
        public longitud: number,
        public autonumerico: boolean,
        public ultimo: number,
        public cod_mtc: string,
        public idtipodoc?: string
    ) {}
}
