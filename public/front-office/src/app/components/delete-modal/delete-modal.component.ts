import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent implements OnInit{

  constructor(public bsModalRef: BsModalRef) { }
  public onClose: Subject<boolean>;

  ngOnInit() {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
}

}
