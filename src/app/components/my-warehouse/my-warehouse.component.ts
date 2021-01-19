import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MyWarehouseDataSource} from './my-warehouse-datasource';
import {ApiServiceGet} from '../../services/api/ApiServiceGet';

@Component({
  selector: 'app-my-warehouse',
  templateUrl: './my-warehouse.component.html',
  styleUrls: ['./my-warehouse.component.css']
})
export class MyWarehouseComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource = new MyWarehouseDataSource();

  displayedColumns = ['trackCode', 'itemType', 'createdDate', 'price', 'currency', 'amount', 'itemNotes',
    'itemPhoto', 'itemInsurance', 'itemCheck', 'itemRepack', 'itemSplit'];

  constructor(private rs: ApiServiceGet) {
  }

  ngOnInit() {
    this.rs.getWarehousePackages().subscribe(result => this.dataSource.data = result);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
