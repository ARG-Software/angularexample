import { Component,  Input } from '@angular/core';

@Component({
  selector: 'mims-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent  {
  @Input() public value: string;
  @Input() public spinnertype: string;
  @Input() public background: boolean = false;
}
