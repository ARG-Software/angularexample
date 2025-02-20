import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "mims-label",
  templateUrl: "./label.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() public text: string;
}
