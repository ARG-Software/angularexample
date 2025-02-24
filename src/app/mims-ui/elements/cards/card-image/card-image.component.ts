import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  standalone: false,
  selector: "mims-card-image",
  templateUrl: "./card-image.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImageComponent {
  @Input() public headerText: string = "";
  @Input() public imgUrl: string = "";
  @Input() public selectBoxData: any[] = [];

  @Output() public OnChangeSelectedOption: EventEmitter<any> =
    new EventEmitter();

  public selectedItem(selectedOption: any) {
    this.OnChangeSelectedOption.emit(selectedOption);
  }
}
