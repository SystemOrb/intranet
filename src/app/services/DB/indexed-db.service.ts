import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'ngx-indexed-db';
@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  _db: AngularIndexedDB;
  constructor() {
    this._db = new AngularIndexedDB('LOCAL_DB', 1);
  }
  creaDB(db_name: string): Promise<any> {
    return new Promise((resolve, reject) => {
       this._db.openDatabase(1, (storage): void => {
          const objectStore = storage.currentTarget.result.createObjectStore(
          db_name, {keyPath: 'id', autoIncrement: true});
          objectStore.createIndex('manifiesto', 'name', {unique: false});
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
  insertData(data: any, collection: string, db: AngularIndexedDB): Promise<boolean | any> {
    return new Promise((resolve, reject) => {
      db.add(collection, {
        manifiesto: data
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
}

