import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  standalone: false,
  selector: "mims-header",
  styleUrls: ["header.component.css"],
  templateUrl: "header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() public title: string = "";
  @Input() public subTitle: string = "";
  @Input() public color: string = "#5965e7";
}
