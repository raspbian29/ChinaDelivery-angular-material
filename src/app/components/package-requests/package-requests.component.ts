import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {PackageRequestsDataSource} from './package-requests-datasource';
import {ApiServiceGet} from '../../services/api/ApiServiceGet';
import {PackageRequest} from '../../models/PackageRequest';

@Component({
  selector: 'app-package-requests',
  templateUrl: './package-requests.component.html',
  styleUrls: ['./package-requests.component.css']
})
export class PackageRequestsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PackageRequest>;

  dataSource = new PackageRequestsDataSource();

  constructor(private rs: ApiServiceGet) {
  }

  displayedColumns = ['id', 'trackCode', 'itemType', 'shopName', 'createdDate', 'price', 'currency', 'amount', 'itemURL',
                      'itemPhoto', 'itemInsurance', 'itemCheck', 'itemRepack', 'itemSplit' ];


  ngOnInit(){
    this.findPackageRequests();
  }

  findPackageRequests() {
    this.rs.getPackageRequests().subscribe(result => this.dataSource.data = result);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
 }
