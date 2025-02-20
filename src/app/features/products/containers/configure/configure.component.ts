import { Component,  ViewChild, OnInit } from '@angular/core';
import { WizardPageModel } from '@mimsUI/forms/wizard/models/wizard.models';
import { WizardComponent } from '@mimsUI/forms/wizard/wizard.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromModule from './../../products.reducers.index';
import { GetProductDetails, SaveProductDetails, GetOperations, AddOperation,
  RemoveOperation, AddMachineOperation, RemoveMachineOperation, GetMotes, AddMote, RemoveMote,
  GetSubcontractorsSelectBox, GetEdgesSelectBox, GetSensors, GetMessagesSelectBox, AddSensor,
  RemoveSensor, GetResumePage, FinishWizard, GetMachineOperations, GetMachineSelectBox } from '../../actions/configure.actions';
import { ProductModelUI, OperationModelUI, MachineOperationModelUI, MoteModelUI,
  ConfigureSelectBoxModelUI, SensorModelUI, ResumeConfigurationModelUI } from '../../models/configure.model';

@Component({
  templateUrl: './configure.component.html'
})
export class ConfigureComponent implements OnInit {

  public productWizardPageMetaData: WizardPageModel[];

  public productDetailsData$: Observable<ProductModelUI>;
  public operationsData$: Observable<OperationModelUI[]>;
  public machinesData$: Observable<MachineOperationModelUI[]>;
  public motesData$: Observable<MoteModelUI[]>;
  public sensorsData$: Observable<SensorModelUI[]>;
  public resumeData$: Observable<ResumeConfigurationModelUI>;

  public machineSelectBoxData$: Observable<ConfigureSelectBoxModelUI[]>;
  public moteSelectBoxData$: Observable<ConfigureSelectBoxModelUI[]>;
  public operationsSelectBoxData$: Observable<ConfigureSelectBoxModelUI[]>;
  public edgeSelectBoxData$: Observable<ConfigureSelectBoxModelUI[]>;
  public subcontractorSelectBoxData$: Observable<ConfigureSelectBoxModelUI[]>;
  public messageSelectBoxData$: Observable<ConfigureSelectBoxModelUI[]>;

  @ViewChild('configurationWizard') private configurationWizard: WizardComponent;
  private productId = 1;

  constructor(private store: Store<fromModule.ProductState>) {}

   public ngOnInit(): void {
    this.setWizardsPageTitlesAndPageIds();
    this.selectorsForWizardLists();
    this.selectorsForWizardSelectBoxes();
    this.dispatchActionsForFirstPage();
  }

   /* This function is responsible to get data for the next page
      Ex: If you are on operations page and navigate to machines,
      in the case of 'operations' you need to define what data do you
      want to retrieve for the machines page
   */
   protected onWizardNextPage(pageId: string): void {
     console.log(pageId);
    switch (pageId) {
      case 'product': {
          this.store.dispatch(new GetOperations(this.productId));
          this.store.dispatch(new GetSubcontractorsSelectBox({}));
          break;
      }
      case 'operations':
      {
        this.store.dispatch(new GetMachineOperations(this.productId));
        this.store.dispatch(new GetMachineSelectBox({}));
        this.store.dispatch(new GetOperations(this.productId));
        break;
      }
      case 'machines':
      {
        this.store.dispatch(new GetMotes(this.productId));
        this.store.dispatch(new GetEdgesSelectBox({}));
        break;
      }
      case 'motes':
      {
        this.store.dispatch(new GetSensors(this.productId));
        this.store.dispatch(new GetMessagesSelectBox({}));
        break;
      }
      case 'sensors':
      {
        this.store.dispatch(new GetResumePage({}));
        break;
      }
      default: {
          return;
        }
     }
    this.navigateToNextPage();
   }

   protected navigateToNextPage(): void {
    this.configurationWizard.navigateToNextPage();
   }

   protected onWizardFinish(): void {
    this.store.dispatch(new FinishWizard({}));
    this.configurationWizard.resetForm();
    this.configurationWizard.navigateToFirstPage();
    this.dispatchActionsForFirstPage();
   }

   // Product Detail Wizard Page

   protected saveProductDetail(productDetails: ProductModelUI): void {
        productDetails.Id = this.productId;
        this.store.dispatch(new SaveProductDetails(productDetails));
   }

   // Operations Wizard Page

   protected addOperation(operationToAdd: OperationModelUI): void {
       operationToAdd.ProductId = this.productId;
       this.store.dispatch(new AddOperation(operationToAdd));
   }

   protected removeOperation(operationToRemove: OperationModelUI): void {
    this.store.dispatch(new RemoveOperation(operationToRemove.Id));
   }

   // Machines Wizard Page

   protected addMachine(machineToAdd: MachineOperationModelUI): void {
    machineToAdd.ProductId = this.productId;
    this.store.dispatch(new AddMachineOperation(machineToAdd));
   }

    protected removeMachine(machineToRemove: MachineOperationModelUI): void {
      this.store.dispatch(new RemoveMachineOperation(machineToRemove.Id));
    }

  // Motes Wizard Page

  protected addMote(moteToAdd: MoteModelUI): void {
    moteToAdd.ProductId = this.productId;
    this.store.dispatch(new AddMote(moteToAdd));
   }

  protected removeMote(moteToRemove: MoteModelUI): void {
      this.store.dispatch(new RemoveMote(moteToRemove.Id));
  }

  // Sensors Wizard Page

  protected addSensor(sensorToAdd: SensorModelUI): void {
    sensorToAdd.ProductId = this.productId;
    this.store.dispatch(new AddSensor(sensorToAdd));
   }

  protected removeSensor(sensorToRemove: SensorModelUI): void {
      this.store.dispatch(new RemoveSensor(sensorToRemove.Id));
  }

   // Wizard Configuration Data

   private setWizardsPageTitlesAndPageIds(): void {
    this.productWizardPageMetaData = [
        {
          Id: 'product',
          Title: 'Product Details'
        },
        {
          Id: 'operations',
          Title: 'Operations'
        },
        {
          Id: 'machines',
          Title: 'Machine Details'
        },
        {
          Id: 'motes',
          Title: 'Motes Details'
        },
        {
          Id: 'sensors',
          Title: 'Sensor Details'
        },
        {
          Id: 'resume',
          Title: 'Resume'
        }
      ];
    }

  private dispatchActionsForFirstPage(): void {
    this.store.dispatch(new GetProductDetails(this.productId));
  }

  private selectorsForWizardLists(): void {
      this.productDetailsData$ = this.store.pipe(select(fromModule.getProductDetail));
      this.operationsData$ = this.store.pipe(select(fromModule.getOperationsDetails));
      this.machinesData$ = this.store.pipe(select(fromModule.getMachineOperationsDetails));
      this.motesData$ = this.store.pipe(select(fromModule.getMotesDetails));
      this.sensorsData$ = this.store.pipe(select(fromModule.getSensorsDetails));
      this.resumeData$ = this.store.pipe(select(fromModule.getResumePage));
    }

  private selectorsForWizardSelectBoxes(): void {
    this.machineSelectBoxData$ = this.store.pipe(select(fromModule.getMachineSelectBox));
    this.moteSelectBoxData$ = this.store.pipe(select(fromModule.getMotesSelectBox));
    this.operationsSelectBoxData$ = this.store.pipe(select(fromModule.getOperationsSelectBox));
    this.edgeSelectBoxData$ = this.store.pipe(select(fromModule.getEdgeSelectBox));
    this.subcontractorSelectBoxData$ = this.store.pipe(select(fromModule.getSubContractorsSelectBox));
    this.messageSelectBoxData$ = this.store.pipe(select(fromModule.getMessagesSelectBox));
  }
}
