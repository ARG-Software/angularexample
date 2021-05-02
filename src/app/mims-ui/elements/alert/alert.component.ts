import { Component, Input } from '@angular/core';

export enum AlertType {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  DANGER = 'danger'
}

@Component({
  selector: 'mims-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() public closable: boolean = false;
  @Input() public isSmall: boolean = false;
  @Input() public appLevel: boolean = false;
  @Input() public type: AlertType = AlertType.INFO;

}
