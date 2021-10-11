import { DeleteModalComponent } from './../../../components/delete-modal/delete-modal.component';
import { NotificationsService } from './../../../services/notifications.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ItemsService } from './../../../services/items.service';
import { Observable, from } from 'rxjs';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-main-items',
  templateUrl: './main-items.component.html',
  styleUrls: ['./main-items.component.scss']
})
export class MainItemsComponent implements OnInit {

  constructor(private itemsService: ItemsService,
              private modalService: BsModalService,
              private notificationsService: NotificationsService) {}

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
    this.data = from(this.itemsService.getItems())
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.columns = [
        { key: 'name', title: 'Nome' },
        { key: '', title: 'Altro' },
      ];
    } else {
      this.columns = [
        { key: '_id', title: 'id' },
        { key: 'name', title: 'Nome' },
        { key: 'description', title: 'Descrizione' },
        { key: 'price', title: 'Prezzo' },
        { key: 'state', title: 'Stato' },
        { key: 'rentCount', title: 'Numero di affitti' },
        { key: 'available', title: 'Disponibile' },
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

  deleteItem(row, rowIndex) {
    const modal = this.modalService.show(DeleteModalComponent);
    (<DeleteModalComponent>modal.content).onClose.subscribe(result => {
      if (result) {
          this.itemsService.deleteItem(row._id)
          .then(() => {
            modal.hide();
            this.data = from(this.itemsService.getItems())
            this.notificationsService.success();
          }).catch(err => this.notificationsService.error())
      } 
    })
  }

}
