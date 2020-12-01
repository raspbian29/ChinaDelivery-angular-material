import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {UsersDataSource} from './users-data-source';
import {User} from '../../models/User';
import {ApiServiceGet} from '../../services/api/ApiServiceGet';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource = new UsersDataSource();
  users: User[] = [];

  constructor(private rs: ApiServiceGet) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fName', 'phoneNumber', 'email'];
  json: User[];

  ngOnInit() {
    this.findUsers();
  }

  findUsers() {
    this.rs.getUsers().subscribe(result => this.dataSource.data = result);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
