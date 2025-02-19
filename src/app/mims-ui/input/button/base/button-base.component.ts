import { Input } from "@angular/core";

export abstract class ButtonBaseComponent {
  @Input() public id: string = "";
  @Input() public value: string = "";
}
