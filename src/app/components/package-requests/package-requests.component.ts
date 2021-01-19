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

  displayedColumns = ['trackCode', 'itemType', 'createdDate', 'price', 'currency', 'amount', 'itemNotes',
    'itemPhoto', 'itemInsurance', 'itemCheck', 'itemRepack', 'itemSplit', 'action'];


  ngOnInit(): void {
    this.findPackageRequests();
  }

  findPackageRequests() {
    this.rs.getPackageRequests().subscribe(result => this.dataSource.data = result);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  deletePackageRequest(id: number): void {
    this.rs.deletePackageById(id).toPromise().then(res => {
      window.location.reload();
    });
  }

}
