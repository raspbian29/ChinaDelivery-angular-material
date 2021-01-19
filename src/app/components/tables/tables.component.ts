import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {HistoryDataSource} from './history-data-source';
import {ApiServiceGet} from '../../services/api/ApiServiceGet';
import {PackageRequest} from '../../models/PackageRequest';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PackageRequest>;
  dataSource = new HistoryDataSource();
  requestHistory: PackageRequest[] = [];

  constructor(private rs: ApiServiceGet) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['packageRequestClose', 'trackCode', 'itemType', 'createdDate', 'price', 'currency', 'amount', 'itemNotes',
    'itemPhoto', 'itemInsurance', 'itemCheck', 'itemRepack', 'itemSplit'];

  ngOnInit() {
    this.findUsers();
  }

  findUsers() {
    this.rs.getRequestHistory().subscribe(result => this.dataSource.data = result);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
