export class ItemCredito {
    constructor(
        public turno: string,
        public idcta: string | number,
        public servicio: string,
        public voucher: string,
        public fechaemision: Date | string,
        public cargo: string,
        public nrodocid: string,
        public cliente?: string,
        public estado?: boolean | string
    ) {}
}
