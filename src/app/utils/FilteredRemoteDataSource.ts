/*
import {PageEvent} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {MatSort, Sort} from '@angular/material/sort';
import {RemoteDataSource, RemoteDataSourceConfig, TypedRemoteDataSet} from './RemoteDataSource';
import {URLBuilder} from '@wizpanda/url-builder/dist/url-builder';
import {Router} from '@angular/router';

export class CustomRemoteFilter {
  field: string;
  name?: string;
  value: any;
}

export const FilterRemoteDataSourceDefaults = {
  pageSize: 50,
  filterUpdateTimeout: 1000,
  pageSizeOptions: [5, 15, 25, 50, 100],
  paginated: false
};

export class FilteredRemoteDataSourceConfig extends RemoteDataSourceConfig {
  backendProcessing?: boolean;
  filterUpdateTimeout?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  paginated?: boolean;
  filterFields?: string[];
  additionalFilters?: CustomRemoteFilter[];
}

export class FilteredRemoteDataSource<T> extends RemoteDataSource<T> {
  private readonly router: Router;
  private readonly backendProcessing: boolean;
  private readonly paginated: boolean;

  private _updateTimeout: any;

  private filterTimeout: number;

  public pageSize: number;
  public pageIndex: number;
  public pageSizeOptions: number[];
  public pageEvent: PageEvent;

  public filter: string;
  public filterFields: string[];

  private additionalFilters: CustomRemoteFilter[];

  public length: number;

  private sort: MatSort;
  public sort_by: string;
  public sort_direction: string;


  constructor(httpClient: HttpClient, router: Router, config: FilteredRemoteDataSourceConfig) {
    super(httpClient, config);
    this.backendProcessing = config?.backendProcessing || false;
    this.setPageSize(config?.pageSize || FilterRemoteDataSourceDefaults.pageSize);
    this.pageSizeOptions = config?.pageSizeOptions || FilterRemoteDataSourceDefaults.pageSizeOptions;
    this.paginated = config?.paginated || FilterRemoteDataSourceDefaults.paginated;
    this.filterTimeout = config?.filterUpdateTimeout || FilterRemoteDataSourceDefaults.filterUpdateTimeout;
    this.filterFields = config?.filterFields || [];
    this.additionalFilters = config?.additionalFilters || [];
    this.filter = '';
    this.length = 0;
    this.pageIndex = 0;
    if (router) {
      this.router = router;
      this.linkToRouter();
    }
  }

  private setPageSize(pageSize, force = false, persist = false) {
    this.pageSize = pageSize;
  }

  public setSort(sort: MatSort) {
    this.sort = sort;
    if (this.sort) {
      this.sort_by = this.sort_by || this.sort.active;
      this.sort_direction = this.sort_direction || this.sort.direction;
      this.sort.sortChange.subscribe((sortEvent) => this.onSortEvent(sortEvent));
    }
  }

  private linkToRouter() {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.filter = params?.filter || '';
      this.pageIndex = params?.pageIndex || 0;
      this.setPageSize(params?.pageSize || this.pageSize, true);
      this.sort_by = params?.sortBy;
      this.sort_direction = params?.sortDirection;
      if (params?.additionalFilters) {
        const additionalFilters = JSON.parse(params?.additionalFilters);
        this.additionalFilters.forEach(
          (filter) => {
            const potentialValue = additionalFilters.find((routeFilter: CustomRemoteFilter) => {
              return routeFilter.field === filter.field;
            })?.value;
            if (potentialValue) {
              filter.value = potentialValue;
            }
          }
        );
      }
    });
  }

  private onSortEvent(sort: Sort) {
    this.sort_by = sort.active;
    this.sort_direction = sort.direction;
    this.updateRoute();
    this.refreshData();
  }

  public onPageEvent(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.pageIndex = this.pageEvent?.pageIndex;
    this.setPageSize(this.pageEvent?.pageSize, true, true);
    this.updateRoute();
    this.refreshData();
  }

  public applyFilter(event) {
    this.filter = (event.target as HTMLInputElement).value;
    if (event.keyCode === 13) {
      if (this._updateTimeout) {
        clearTimeout(this._updateTimeout);
      }
      this.updateRoute();
      this.refreshData();
    } else {
      this.queueDataUpdate();
    }
  }

  queueDataUpdate() {
    if (this._updateTimeout) {
      clearTimeout(this._updateTimeout);
    }
    this._updateTimeout = setTimeout(
      () => {
        this.updateRoute();
        this.refreshData();
      }, this.filterTimeout
    );
  }

  public additionalFilterChange() {
    this.updateRoute();
    this.refreshData();
  }

  private updateRoute() {
    if (this.router) {
      this.router.navigate([location.pathname], {
        queryParams: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          filter: this.filter,
          sortBy: this.sort_by,
          sortDirection: this.sort_direction,
          additionalFilters: this.additionalFilters.length ? JSON.stringify(this.additionalFilters) : ''
        }
      });
    }
  }

  private fixPageIndex() {
    if (this.length < this.pageSize * this.pageIndex) {
      this.pageIndex = 0;
      this.updateRoute();
    }
  }

  private refreshData() {
    if (!this.backendProcessing) {
      this.processData(this.dataSet);
    } else {
      this.loadData();
    }
  }

  loadData() {
    super.loadData(this.buildQueryURL());
  }

  protected processData(dataSet: TypedRemoteDataSet<T>) {
    this.dataSet = dataSet;
    this.length = dataSet.recordsTotal;
    this.fixPageIndex();
    if (!this.backendProcessing) {
      let processed_data = this.localSort(this.dataSet.data);
      processed_data = this.localPaginate(processed_data);
      this.listItems.next(processed_data);
    } else {
      this.listItems.next(this.dataSet.data);
    }
    this.refreshedOrLoaded.next(true);
  }

  private localPaginate(data) {
    if (!this.paginated) {
      return data;
    }
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize > this.length ? this.length : start + this.pageSize;
    return data.slice(start, end);
  }

  private localSort(data) {
    if (this.sort_by) {
      return data.sort((a, b) => {
        return compare(getProperty(a, this.sort_by), getProperty(b, this.sort_by), this.sort_direction === 'asc');
      });
    }
    return data;
  }

  private buildQueryURL() {
    if (!this.backendProcessing) {
      return this.url;
    }
    const builder = new URLBuilder(location.origin + '/' + this.url);
    if (this.filter) {
      builder.appendQueryParam('filter', this.filter);
      builder.appendQueryParam('filter_fields', this.filterFields.join(','));
    }
    if (this.sort_by) {
      builder.appendQueryParam('sort_by', this.sort_by);
      builder.appendQueryParam('sort_direction', this.sort_direction);
    }
    if (this.paginated) {
      builder.appendQueryParam('skip', (this.pageIndex * this.pageSize).toString());
      builder.appendQueryParam('take', this.pageSize.toString());
    }
    if (this.additionalFilters.length) {
      builder.appendQueryParam('additional_filters',
        JSON.stringify(
          this.additionalFilters.map((filter) => {
            return {field: filter.field, value: filter.value};
          })
        )
      );
    }
    return builder.getPath() + '?' + builder.getQueryString();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function getProperty(obj, prop_path) {
  const _prop_path = prop_path.split('_');
  let val = obj;
  for (const path of _prop_path) {
    if (val[path]) {
      val = val[path];
    } else {
      val = null;
      break;
    }
  }
  return val || null;
}
*/
