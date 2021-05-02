import { Component, Input } from '@angular/core';
import { ButtonBaseComponent } from '@mimsUI/input/button/base/button-base.component';

@Component({
  selector: 'mims-button-outline',
  templateUrl: './button-outline.component.html'
})
export class ButtonOutlineComponent extends ButtonBaseComponent  {
  @Input() public buttontype: string;
}
