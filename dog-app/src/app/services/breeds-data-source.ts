import { DataSource } from "@angular/cdk/collections";
import { Breed } from "../models/breed";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { Observable } from "rxjs/internal/Observable";

export class BreedsDataSource extends DataSource<Breed> {
  private _dataStream = new ReplaySubject<Breed[]>();

  constructor(initialData: []) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Breed[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: Breed[]) {
    this._dataStream.next(data);
  }
}
