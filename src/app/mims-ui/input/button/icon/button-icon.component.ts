import { Component, Input } from '@angular/core';
import { ButtonBaseComponent } from '@mimsUI/input/button/base/button-base.component';

@Component({
  selector: 'mims-button-icon',
  templateUrl: './button-icon.component.html'
})
export class ButtonIconComponent extends ButtonBaseComponent {
  @Input() public icon: string;
}
