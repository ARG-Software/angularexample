import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MimsSelectBoxModel } from '@mimsUI/input/select-box/models/select-box.model';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MimsValidator } from '@mimsUI/forms/wizard/services/validators';
import { MimsFormErrorsService } from '@mimsUI/forms/wizard/services/errors.service';
import { SensorModelUI } from '../../../models/configure.model';

@Component({
  selector: 'sensor-wizard-page',
  templateUrl: './sensors-wizard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorWizardComponent {
  @Input() public moteSelectBoxData: MimsSelectBoxModel[];
  @Input() public messageSelectBoxData: MimsSelectBoxModel[];
  @Input() public sensorsList: SensorModelUI[];
  @Output() public addSensor = new EventEmitter();
  @Output() public removeSensor = new EventEmitter();

  public sensorsForm: FormGroup;

  protected get mote(): AbstractControl { return this.sensorsForm.get('mote'); }
  protected get message(): AbstractControl { return this.sensorsForm.get('message'); }
  protected get inputTerminal(): AbstractControl { return this.sensorsForm.get('inputTerminal'); }
  protected get mcode(): AbstractControl { return this.sensorsForm.get('mcode'); }
  protected get lineOut(): AbstractControl { return this.sensorsForm.get('lineOut'); }
  protected get messageId(): number {
    const selectedMessage = this.sensorsForm.get('message').value as any as MimsSelectBoxModel;
    return selectedMessage.value as number;
  }
  protected get moteId(): number {
    const selectedMote = this.sensorsForm.get('mote').value as any as MimsSelectBoxModel;
    return selectedMote.value as number;
  }

  protected errors: any[] = [];

  public constructor(private formBuilder: FormBuilder, private formErrorService: MimsFormErrorsService) {
    this.sensorsForm = this.formBuilder.group({
      mote: new FormControl('', [MimsValidator.required]),
      message: new FormControl('', [MimsValidator.required]),
      inputTerminal: new FormControl('', [MimsValidator.required]),
      mcode: new FormControl('', [MimsValidator.required]),
      lineOut: new FormControl('', [MimsValidator.required]),
    });
  }

  protected onAddSensor(): void {
    if (!this.sensorsForm.invalid) {
      const addedSensor: SensorModelUI = {
          Id: 0,
          ProductId: undefined,
          MachineInputTerminal: this.inputTerminal.value as string,
          MachineMCode: this.mcode.value as string,
          LineOut: this.lineOut.value as string,
          ContactMessageId: this.messageId,
          MoteId: this.moteId,
      };
      this.addSensor.emit(addedSensor);
      this.resetFormFields();
      this.errors = [];
    } else {
      this.getFormErrors();
    }
    }

  protected onRemoveSensor(sensor: SensorModelUI): void {
      this.removeSensor.emit(sensor);
  }

  private getFormErrors(): void {
    const formControlNameAlias = {
      mote: 'Mote',
      inputTerminal: 'Input Terminal',
      mcode: 'MCode',
      lineOut: 'Line Out',
      message: 'Message'
    };
    const errors = this.formErrorService.getFormGroupValidationErrors(this.sensorsForm);
    this.errors = this.formErrorService.displayFormErrors(formControlNameAlias, errors);
  }

  private resetFormFields(): void {
    this.mote.reset();
    this.mcode.reset();
    this.lineOut.reset();
    this.inputTerminal.reset();
    this.message.reset();
  }

}
