import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainUsersComponent implements OnInit {

  public configuration: Config;
  public columns: Columns[];
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data = [{
    phone: '+1 (934) 551-2224',
    age: 20,
    address: { street: 'North street', number: 12 },
    company: 'ZILLANET',
    name: 'Valentine Webb',
    isActive: false,
  }, {
    phone: '+1 (948) 460-3627',
    age: 31,
    address: { street: 'South street', number: 12 },
    company: 'KNOWLYSIS',
    name: 'Heidi Duncan',
    isActive: true,
  }];

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
  }


  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.columns = [
        { key: 'company', title: 'Company' },
        { key: '', title: 'Action' },
      ];
    } else {
      this.columns = [
        { key: 'phone', title: 'Phone' },
        { key: 'age', title: 'Age' },
        { key: 'company', title: 'Company' },
        { key: 'name', title: 'Name' },
        { key: 'isActive', title: 'STATUS' },
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
