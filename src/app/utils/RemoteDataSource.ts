/*
import {CollectionViewer, DataSource, SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export class RemoteDataSourceConfig {
  url: string;
  typeConstructor?: any;
  allowMultiSelect?: boolean;
  initialSelection?: any[];
}

export class RemoteDataSource<T> implements DataSource<T> {
  public listItems = new BehaviorSubject<T[]>([]);
  protected dataSet: TypedRemoteDataSet<T> = new TypedRemoteDataSet<T>();
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected typeConstructor = null;
  protected url: string;
  public refreshedOrLoaded: Subject<boolean>;
  public loading$ = this.loadingSubject.asObservable();
  public selection: SelectionModel<T>;
  initialSelection: T[];
  allowMultiSelect: boolean;


  constructor(protected httpClient: HttpClient, private config: RemoteDataSourceConfig) {
    this.initialSelection = [];
    this.url = config.url;
    this.allowMultiSelect = true;
    this.refreshedOrLoaded = new Subject<boolean>();
    this.typeConstructor = config?.typeConstructor || Object;
    this.initSelection();
  }

  initSelection() {
    this.selection = new SelectionModel<T>(
      this.config?.allowMultiSelect || this.allowMultiSelect,
      this.config?.initialSelection || this.initialSelection
    );
  }

  getLoading() {
    return this.loadingSubject.value;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.listItems.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.listItems.complete();
    this.loadingSubject.complete();
  }

  loadData(url?: string) {
    this.initSelection();
    if (!url) {
      url = this.url;
    }
    this.loadingSubject.next(true);
    this.listItems.next([]);
    this.httpClient.get<TypedRemoteDataSet<T>>(url)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(dataSet => {
        if (dataSet.data instanceof Array) {
          dataSet.data = dataSet.data.map(d => Object.assign(new this.typeConstructor(), d));
        }
        this.processData(dataSet);
      });
  }

  protected processData(dataSet: TypedRemoteDataSet<T>) {
    this.dataSet = dataSet;
    this.listItems.next(this.dataSet.data);
    this.refreshedOrLoaded.next(true);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSet.data.length;
    return numSelected === numRows;
  }

  /!** Selects all rows if they are not all selected; otherwise clear selection. *!/
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSet.data.forEach(row => this.selection.select(row));
  }
}

export class TypedRemoteDataSet<T> {
  public data: T[];
  public recordsTotal: number;
}
*/
