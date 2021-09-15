import { Observable, from } from 'rxjs';
import { UsersService } from './../../../services/users.service';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainUsersComponent implements OnInit {

  constructor (private usersService:UsersService) {}

  public data: Observable<any>; 

  public configuration: Config;
  public columns: Columns[];
  public innerWidth: number;
  public toggledRows = new Set<number>();

  @ViewChild('table', { static: true }) table: APIDefinition;


  @HostListener('window:resize', [])
  onResize(): void {
    this.checkView();
  }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.detailsTemplate = true;
    this.configuration.paginationRangeEnabled = false;
    this.checkView();
    this.data = from(this.usersService.getUsers())
  }


  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.columns = [
        { key: 'username', title: 'Username' },
        { key: '', title: 'Action' },
      ];
    } else {
      this.columns = [
        { key: '_id', title: 'id' },
        { key: 'username', title: 'Username' },
        { key: 'role', title: 'Role' }
      ];
    }
  }

  onRowClickEvent($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.table.apiEvent({
      type: API.toggleRowIndex,
      value: index,
    });
    if (this.toggledRows.has(index)) {
      this.toggledRows.delete(index);
    } else {
      this.toggledRows.add(index);
    }
  }

}
