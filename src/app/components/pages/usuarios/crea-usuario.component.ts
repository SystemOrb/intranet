import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { SystemLegalDoc } from '../../../models/usuario/SystemLegal.class';
import { SystemGiros } from '../../../models/usuario/SystemGiros.class';
import { CustomersService } from '../../../services/intranet/customers.service';
import { Rol } from '../../../models/usuario/roles.class';
import { NgForm } from '@angular/forms';
import { SystemCustomer } from '../../../models/usuario/SystemCustomer.class';
import { HTTP_SERVICE } from '../../../services/services.config';
import { IndexedDB3Service } from '../../../services/DB/indexed-db3.service';
import { PdfGeneratorService } from '../../../services/intranet/pdf-generator.service';
declare function init_plugins();
declare const swal: any;
@Component({
  selector: 'app-crea-usuario',
  templateUrl: './crea-usuario.component.html',
  styles: []
})
export class CreaUsuarioComponent implements OnInit {
  idpersona: string | Blob; // id de la persona
  create: boolean = true; // Para identificar si se crea o se actualiza
  documentos: SystemLegalDoc[] | any = []; // Documentos del sistema
  giros: SystemGiros[] | any = []; // Giros
  Roles: Rol[] | any = [];
  juridico: boolean = false; // Tipo de formulario
  canWriteNum: boolean = false; // Para validar el numero del documento
  canSendForm: boolean = false; // Si hay algun error de validacion en el formulario
  longitudeDoc: number = 0; // para la longitud del documento
  setterFormValues: SystemCustomer | any = ''; // Si recibe una ID y existe entonces seteamos el formulario automatico
  updateFormMode: boolean = false; // Condicional para el HTML por si el formulario no se puede editar
  constructor(private _param: ActivatedRoute, private _system: CustomersService,
    private _router: Router, private _storage: IndexedDB3Service, private _pdf: PdfGeneratorService) {
    this._param.params.subscribe(
      (_get: PartialObserver<any> | any) => {
        // Validamos la ID que se manda
        if (Number(_get['keyUser']) === 0) {
          this.create = true;
          this.idpersona = _get['keyUser'];
        } else {
          this.create = false;
          this.idpersona = _get['keyUser'];
        }
      }
    );
  }
  async ngOnInit() {
    init_plugins();
    // Inicializadores
    this.cargaDocumentos();
    this.cargaGiros();
    this.cargaRoles();
    const usuario = await this.getUsuario();
    if (!usuario) {
      return;
    } else {
      this.setterFormValues = usuario;
      this.updateFormMode = true;
    }
  }
  // Función para cargar documentos disponibles
  cargaDocumentos() {
    this._system.DocumentosPersona().subscribe(
      (docs: PartialObserver<any> | any): void => {
        this.documentos = docs.listado;
      }
    );
  }
  // Para cargar los giros normalmente
  cargaGiros() {
    this._system.Giros().subscribe(
      (giros: PartialObserver<any> | any): void => {
        this.giros = giros.listado;
      }
    );
  }
  cargaRoles() {
    this._system.Roles().subscribe(
      (rol: PartialObserver<any> | any): void => {
        this.Roles = rol.listado;
      }
    );
  }
  // Para crear registros
  creaRegistro(userData: NgForm): void {
    // Verificamos si el formulario es valido
    if (!userData.valid) {
      swal('Alerta!', 'Debes rellenar completamente todos los campos', 'warning');
      return;
    }
    if (!userData.value.validate) {
      swal('Alerta!', 'El número de documento es inválido', 'warning');
      return;
    }
    // Hacemos la petición via AJAX
    const formSystem = new FormData();
    const xhr: any = new XMLHttpRequest();
    let idgiro: string | Blob;
    if (!this.juridico) {
      idgiro = '1';
    } else {
      idgiro = userData.value.idgiro;
    }
    formSystem.append('idpersona', this.idpersona);
    formSystem.append('tipoper', userData.value.tipoper || null);
    formSystem.append('razonsocial', userData.value.razonsocial || null);
    formSystem.append('ape_pat', userData.value.ape_pat || null);
    formSystem.append('ape_mat', userData.value.ape_mat || null);
    formSystem.append('nombre', userData.value.nombre || null);
    formSystem.append('tipodocid', userData.value.tipodocid || null);
    formSystem.append('nrodoc', userData.value.nrodoc || null);
    formSystem.append('direccion', userData.value.direccion || null);
    formSystem.append('telefono', userData.value.telefono || null);
    formSystem.append('sexo', userData.value.sexo || null);
    formSystem.append('estadocivil', userData.value.estadocivil || null);
    formSystem.append('usuario', userData.value.usuario || null);
    formSystem.append('clave', userData.value.clave || null);
    formSystem.append('email', userData.value.email || null);
    formSystem.append('nacimiento', userData.value.nacimiento || null);
    formSystem.append('idgiro', idgiro);
    formSystem.append('contacto', userData.value.contacto || null);
    formSystem.append('observacion', userData.value.observacion || null);
    // construimos la data que mandaremos al server
    xhr.onreadystatechange = (): void => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
           const data = JSON.parse(xhr.response);
           if (data.success) {
             if (this.updateFormMode) {
               swal('Mensaje de sistema!', 'El cliente ha sido actualizado con éxito', 'success');
             } else {
               swal('Mensaje de sistema!', 'Nuevo cliente agregado con éxito', 'success');
             }
            setTimeout(
              (): void => {
                this._router.navigate([`/crea/usuarios/${data.outid}`]);
              }, 500
            );
           }
        } else {
          throw new Error(xhr.response);
        }
      }
    };
    // Mandamos al server
    const url = `${HTTP_SERVICE}persona_crea_actualiza.php`;
    xhr.open('POST', url, true);
    xhr.send(formSystem);
  }
  // Para identificar que tipo de formulario es juridico o normal
  tipoFormulario(chartType: any): void {
    switch (chartType.value) {
      case 'N':
        this.juridico = false;
        break;
      case 'J':
        this.juridico = true;
        break;
    }
  }
  // Obtenemos la longitud del documento para validarlo luego
  setLongDoc(docId: any): void {
    for (const position of this.documentos) {
      if (position.idtipodoc === Number(docId.value)) {
        this.longitudeDoc = position.longitud;
        this.canWriteNum = true;
      }
    }
  }
  // Verificamos la longitud mientras agregamos valores
  validateDocLong(chart: any): void {
    if (chart.length === this.longitudeDoc) {
      this.canSendForm = true;
    } else {
      this.canSendForm = false;
    }
  }
  // para verificar si tiene una ID existente
  getUsuario(): Promise<SystemCustomer | boolean> {
    return new Promise((resolve, reject) => {
      if (this.create) {
        resolve(false);
        return;
      }
      this._system.PersonaId(this.idpersona).subscribe(
        (customer: PartialObserver<any> | any): void => {
          if (customer.success) {
            resolve(customer.listado[0]);
          }
        }
      );
    });
  }
  // Confirmación para guardar el reporte
  confirmation() {
    swal({
      title: '¿Deseas guardar este reporte en tu dispositivo?',
      text: 'Ocupamos tu memoria, para poder acceder a este reporte más adelante inclusive sin conexión a internet',
      icon: 'info',
      buttons: true,
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.saveLocalDB();
      }
    });
  }
  async saveLocalDB() {
    if (!this.updateFormMode) {
      swal('Error', 'No pudimos procesar su solicitud', 'error');
      throw new Error('Error en el sistema');
    }
    try {
      const LOCAL_DB = {
        'customer': this.setterFormValues
      };
      const storage = await this._storage.creaDB('cuadre_usuarios', 'usuario');
      if (storage.status) {
        const insertResult = await this._storage.insertData(JSON.stringify(LOCAL_DB), 'cuadre_usuarios', storage._db);
        if (insertResult) {
          swal('Notificación', 'Tu reporte ha sido archivado correctamente', 'success');
          return;
        }
      }
    } catch (error) {
      throw (error);
    }
  }
  loadPDF() {
    this._pdf.loadPDF(document.getElementById('generateTable1'), this.setterFormValues.nombrecompleto);
  }
}

