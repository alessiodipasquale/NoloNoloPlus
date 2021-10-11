import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { notificationsConfig } from '../config/notifications.config';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public config: ToasterConfig = new ToasterConfig(notificationsConfig);

  constructor(private toasterService: ToasterService) { }

  success(message: string = '') {
    const toast: Toast = {
      type: 'success',
      title: 'Operazione riuscita con successo!',
      body: message
    };

    this.showToast(toast);
  }

  warning(message: string = '') {
    const toast: Toast = {
      type: 'warning',
      title: 'Attenzione!',
      body: message
    };

    this.showToast(toast);
  }

  error(message: string = '') {
    const toast: Toast = {
      type: 'error',
      title: 'Errore',
      body: message
    };

    this.showToast(toast);
  }

  showToast(toast: Toast): void {   
    this.toasterService.popAsync(toast);
  }
}
