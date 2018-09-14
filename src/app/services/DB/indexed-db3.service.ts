import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class IndexedDB3Service {
  _db: AngularIndexedDB;
  constructor() {
    this._db = new AngularIndexedDB('LOCAL_DB3', 1);
   }
   creaDB(db_name: string, table_name?: string): Promise<any> {
    return new Promise((resolve, reject) => {
       this._db.openDatabase(1, (storage): void => {
          const objectStore = storage.currentTarget.result.createObjectStore(
          db_name, {keyPath: 'id', autoIncrement: true});
          objectStore.createIndex('cuadre_usuarios', 'usuario', {unique: false});
      }).then( (): void => {
        resolve({
          status: true,
          _db: this._db
        });
      }, (Exception) => {
        reject(Exception);
      });
    });
  }
  insertData(data: any, collection: string, db: AngularIndexedDB, path?: string): Promise<boolean | any> {
    return new Promise((resolve, reject) => {
      db.add(collection, {
        usuario: data
      }).then( (): void => {
        resolve(true);
      }, (Exception) => {
        reject(Exception);
      });
    });
  }
  getDBStorage(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.getAll(collection).then((resulset: any) => {
        resolve(resulset);
      }, (Exception) => {
        reject(Exception);
      });
    });
  }
  getDBIndex(collection: string, _key: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.getByKey(collection, _key).then(
        (resultset: any) => {
          resolve(resultset);
        }, (Exception) => {
          reject(Exception);
        }
      );
    });
  }
  DeleteDB(collection: string, index: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this._db.delete(collection, Number(index)).then(
          (): void => {
            resolve(true);
          }, (Exception: any) => {
            resolve(false);
          }
        );
      } catch (error) {
        throw error;
      }
    });
  }
}
