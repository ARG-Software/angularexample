import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  forwardRef,
  ViewEncapsulation,
  Optional,
  Inject,
} from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  NgModel,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from "@angular/forms";
import { BaseControlComponent } from "@mimsUI/base/base.component";

@Component({
  standalone: false,
  selector: "mims-checkbox",
  templateUrl: "checkbox.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends BaseControlComponent<any> {
  @Input() public checked: boolean = false;
  @Input() public data: any = "";
  @Input() public override label: string = "";
  @Input() public checkboxLabel: string = "";

  @Output() public OnChangeSaveInformation: EventEmitter<any> =
    new EventEmitter();

  protected model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: any[],
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: any[]
  ) {
    super(validators, asyncValidators);
  }

  public changeCheckOption() {
    this.checked = !this.checked;
    this.OnChangeSaveInformation.emit({
      data: this.data,
      checked: this.checked,
    });
  }
}
