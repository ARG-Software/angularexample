import { ProductModelUI, OperationModelUI,
    MachineOperationModelUI, MoteModelUI, SensorModelUI,
    ConfigureSelectBoxModelUI,
    ResumeConfigurationModelUI } from '../models/configure.model';
import {
        ConfigurationActionTypes,
        ConfigureActions
      } from '../actions/configure.actions';
import { getDiferenceBetweenObjectArraysByProperty } from '../../../utils/funtion.utils';

export interface ConfigureState {
    machineSelectBox: ConfigureSelectBoxModelUI[];
    edgeSelectBox: ConfigureSelectBoxModelUI[];
    messageSelectBox: ConfigureSelectBoxModelUI[];
    motesSelectBox: ConfigureSelectBoxModelUI[];
    operationsSelectBox: ConfigureSelectBoxModelUI[];
    subcontractorsSelectBox: ConfigureSelectBoxModelUI[];
    productsPage: {
        productDetails: ProductModelUI
    };
    operationsPage: {
        operations: OperationModelUI[];
        originalOperations: OperationModelUI[];
        needsUpdate: boolean
    };
    machinesPage: {
        machines: MachineOperationModelUI[];
        originalMachines: MachineOperationModelUI[];
        needsUpdate: boolean
    };
    motesPage: {
        motes: MoteModelUI[];
        originalMotes: MoteModelUI[];
        needsUpdate: boolean
    };
    sensorsPage: {
        sensors: SensorModelUI[];
        originalSensors: SensorModelUI[];
        needsUpdate: boolean;
    };
    resumePage: ResumeConfigurationModelUI;
}

export const initialState: ConfigureState = {
    machineSelectBox: [],
    edgeSelectBox: [],
    messageSelectBox: [],
    motesSelectBox: [],
    operationsSelectBox: [],
    subcontractorsSelectBox: [],
    productsPage: {
        productDetails: {} as ProductModelUI
    },
    operationsPage: {
        operations: [],
        originalOperations: [],
        needsUpdate: true
    },
    machinesPage: {
        machines: [],
        originalMachines: [],
        needsUpdate: true
    },
    motesPage: {
        motes: [],
        originalMotes: [],
        needsUpdate: true
    },
    sensorsPage: {
        sensors: [],
        originalSensors: [],
        needsUpdate: true
    },
    resumePage : {
        addedMachines: [],
        addedOperations: [],
        addedMotes: [],
        addedSensors: [],
        removedMachines: [],
        removedMotes: [],
        removedOperations: [],
        removedSensors: []
    }
};

export function reducer(
    state: ConfigureState = initialState,
    action: ConfigureActions
  ): ConfigureState {
    switch (action.type) {
        case ConfigurationActionTypes.GetProductDetailsSuccess:
        {
            const productDetailsSuccessPayload = action.payload;
            return {...state , productsPage:
            {
                ...state.productsPage,
                productDetails: {...productDetailsSuccessPayload}
            }
            };
        }
        case ConfigurationActionTypes.SaveProductDetailsSuccess:
        {
            const productUpdatePayload = action.payload;
            const currentProductDetails = state.productsPage.productDetails;
            return {...state , productsPage:
            {
                ...state.productsPage,
                productDetails: {...currentProductDetails, ...productUpdatePayload }
            }
            };
        }
        case ConfigurationActionTypes.GetOperationsSuccess: {
            const operationsList = action.payload;
            const originalOperations = (state.operationsPage.originalOperations.length > 0 )
            ? state.operationsPage.originalOperations : [...operationsList];
            return { ...state, operationsPage:
                {
                 ... state.operationsPage,
                 operations: [...operationsList],
                 originalOperations,
                 needsUpdate: false
                }
            };
        }
        case ConfigurationActionTypes.GetOperationsSelectBoxSuccess: {
            const operationSelectBox = action.payload;
            return {
                ...state, operationsSelectBox : [...operationSelectBox]
            };
        }
        case ConfigurationActionTypes.AddOperationSuccess: {
            const addOperationSuccessPayload = {...action.payload as OperationModelUI};
            const newElementForOperationsSelectBox: ConfigureSelectBoxModelUI = {
                name: addOperationSuccessPayload.Description,
                selected: false,
                value: addOperationSuccessPayload.Id
            };
            return {
                ...state, operationsPage:
                {
                ... state.operationsPage,
                 operations: [...[addOperationSuccessPayload], ...state.operationsPage.operations]
                },
                operationsSelectBox: [...[newElementForOperationsSelectBox], ...state.operationsSelectBox]
                };
        }
        case ConfigurationActionTypes.RemoveOperationSuccess: {
            const removeOperationSuccessPayload = action.payload;
            const newOperationsArray = state.operationsPage.operations.filter((operation) => {
                return operation.Id !== removeOperationSuccessPayload;
            });
            const newOperationSelectBoxArray = state.operationsSelectBox.filter((operation) => {
                return operation.value !== removeOperationSuccessPayload;
            });
            return { ...state, operationsPage:
                {
                ... state.operationsPage,
                operations: newOperationsArray
                },
                operationsSelectBox: newOperationSelectBoxArray
            };
        }
        case ConfigurationActionTypes.GetMachineOperationsSuccess: {
            const machinesList = [...action.payload];
            const originalMachinesList = (state.machinesPage.originalMachines.length > 0 )
            ? state.machinesPage.originalMachines : [...machinesList];
            return { ...state, machinesPage:
                {
                ... state.machinesPage,
                machines: machinesList,
                originalMachines: originalMachinesList,
                needsUpdate: false
                }
            };
        }
        case ConfigurationActionTypes.AddMachineOperationSuccess: {
            const addMachineSuccessPayload = {...action.payload};
            return { ...state, machinesPage:
                {
                ...state.machinesPage,
                machines: [addMachineSuccessPayload, ...state.machinesPage.machines]
                }
            };
        }
        case ConfigurationActionTypes.RemoveMachineOperationSuccess: {
            const removeMachineSuccessPayload = action.payload;
            const newMachineArray = state.machinesPage.machines.filter((machine) => {
                return machine.Id !== removeMachineSuccessPayload;
            });
            return {...state, machinesPage: {
                ... state.machinesPage,
                machines: newMachineArray
            }
            };
        }
        case ConfigurationActionTypes.GetMotesSuccess: {
            const motesList = action.payload;
            const originalMotesList = (state.motesPage.originalMotes.length > 0 )
            ? state.motesPage.originalMotes : [...motesList];
            return { ...state, motesPage:
                {
                ... state.motesPage,
                motes: [ ... motesList],
                originalMotes: originalMotesList,
                needsUpdate: false
            },
         };
        }
        case ConfigurationActionTypes.GetMotesSelectBoxSuccess: {
            const motesSelectBoxList = action.payload;
            return {
                ...state, motesSelectBox : [...motesSelectBoxList]
            };
        }
        case ConfigurationActionTypes.AddMoteSuccess: {
            const addMoteSuccessPayload: MoteModelUI = {...action.payload};
            const newElementForOperationsSelectBox: ConfigureSelectBoxModelUI = {
                name: addMoteSuccessPayload.Name,
                selected: false,
                value: addMoteSuccessPayload.Id
            };
            return { ...state, motesPage:
                {
                ...state.motesPage,
                motes: [...[addMoteSuccessPayload] , ...state.motesPage.motes]
            },
            motesSelectBox: [...[newElementForOperationsSelectBox], ...state.motesSelectBox]
            };
        }
        case ConfigurationActionTypes.RemoveMoteSuccess: {
            const removeMoteSuccessPayload = action.payload;
            const newMoteArray = state.motesPage.motes.filter((mote) => {
                return mote.Id !== removeMoteSuccessPayload;
            });
            const newMoteSelectBoxArray = state.motesSelectBox.filter((mote) => {
                return mote.value !== removeMoteSuccessPayload;
            });
            return {...state,
                motesPage:
                {
                    ... state.motesPage,
                    motes: newMoteArray
                },
                motesSelectBox: newMoteSelectBoxArray
            };
        }
        case ConfigurationActionTypes.GetSensorsSuccess: {
            const getSensorsSuccessPayload = action.payload;
            return { ...state, sensorsPage:
                {
                    ...state.sensorsPage,
                    sensors: [...getSensorsSuccessPayload],
                    originalSensors: [...getSensorsSuccessPayload],
                    needsUpdate: false
                }
            };
        }
        case ConfigurationActionTypes.AddSensorSuccess: {
            const addSensorsSuccessPayload = action.payload;
            return { ...state, sensorsPage:
                {
                    ...state.sensorsPage,
                    sensors: [addSensorsSuccessPayload, ...state.sensorsPage.sensors]
                }
            };
        }
        case ConfigurationActionTypes.RemoveSensorSuccess: {
            const removeSensorSuccessPayload = action.payload;
            const newSensorArray = state.sensorsPage.sensors.filter((sensor) => {
                return sensor.Id !== removeSensorSuccessPayload;
            });
            return {
            ...state, sensorsPage:
                {
                    ...state.sensorsPage,
                    sensors: [...newSensorArray]
                }
            };
        }
        case ConfigurationActionTypes.GetEdgesSelectBoxSuccess: {
            const edgesSelectBoxPayload = action.payload;
            return {
                ... state, edgeSelectBox: [... edgesSelectBoxPayload]
            };
        }
        case ConfigurationActionTypes.GetMessagesSelectBoxSuccess: {
            const messagesSelectBoxPayload = action.payload;
            return {
                ... state, messageSelectBox: [... messagesSelectBoxPayload]
            };
        }
        case ConfigurationActionTypes.GetSubcontractorsSelectBoxSuccess: {
            const subContractorsSelectBoxPayload = action.payload;
            return {
                ... state, subcontractorsSelectBox : [... subContractorsSelectBoxPayload]
            };
        }
        case ConfigurationActionTypes.GetMachineSelectBoxSuccess: {
            const machinesSelectBoxPayload = action.payload;
            return {
                ... state, machineSelectBox : [... machinesSelectBoxPayload]
            };
        }
        case ConfigurationActionTypes.FinishWizard: {
            return initialState;
        }
        case ConfigurationActionTypes.GetResumePage: {
            const resumePageData = getResumePageData(state);
            return {
                ... state, resumePage: {
                    ... resumePageData
                }
            };
        }
      default:
        return state;
    }
  }

export const getConfigureState = (state: ConfigureState) => state;

export const getMachineSelectBox = (state: ConfigureState) =>
  state.machineSelectBox;

export const getEdgesSelectBox = (state: ConfigureState) =>
  state.edgeSelectBox;

export const getMoteSelectBox = (state: ConfigureState) =>
  state.motesSelectBox;

export const getSubContractorsSelectBox = (state: ConfigureState) =>
  state.subcontractorsSelectBox;

export const getOperationsSelectBox = (state: ConfigureState) =>
    state.operationsSelectBox;

export const getMessagesSelectBox = (state: ConfigureState) =>
    state.messageSelectBox;

export const getProductDetail = (state: ConfigureState) =>
    state.productsPage.productDetails;

export const getOperationsDetails = (state: ConfigureState) =>
  state.operationsPage.operations;

export const getOperationsUpdateState = (state: ConfigureState) =>
  state.operationsPage.needsUpdate;

export const getMachineOperationsDetails = (state: ConfigureState) =>
  state.machinesPage.machines;

export const getMachineOperationsUpdateState = (state: ConfigureState) =>
  state.machinesPage.needsUpdate;

export const getMotesDetails = (state: ConfigureState) =>
  state.motesPage.motes;

export const getMotesUpdateState = (state: ConfigureState) =>
  state.motesPage.needsUpdate;

export const getSensorsDetails = (state: ConfigureState) =>
  state.sensorsPage.sensors;

export const getSensorUpdateState = (state: ConfigureState) =>
  state.sensorsPage.needsUpdate;

export const getResumePageState = (state: ConfigureState) =>
  state.resumePage;

export const getResumePageData = (state: ConfigureState): ResumeConfigurationModelUI => {
    console.log(state);
    const addOperations = getDiferenceBetweenObjectArraysByProperty(state.operationsPage.operations,
        state.operationsPage.originalOperations, 'Id');
    const removeOperations = getDiferenceBetweenObjectArraysByProperty(state.operationsPage.originalOperations,
        state.operationsPage.operations,
        'Id');
    const addMachines = getDiferenceBetweenObjectArraysByProperty(state.machinesPage.machines,
            state.machinesPage.originalMachines,
            'Id');
    const removeMachines = getDiferenceBetweenObjectArraysByProperty(state.machinesPage.originalMachines,
            state.machinesPage.machines,
            'Id');
    const addMotes = getDiferenceBetweenObjectArraysByProperty(state.motesPage.motes,
            state.motesPage.originalMotes,
            'Id');
    const removeMotes = getDiferenceBetweenObjectArraysByProperty(state.motesPage.originalMotes,
            state.motesPage.motes,
            'Id');
    const addSensors = getDiferenceBetweenObjectArraysByProperty(state.sensorsPage.sensors,
            state.sensorsPage.originalSensors,
            'Id');
    const removeSensors = getDiferenceBetweenObjectArraysByProperty(state.sensorsPage.originalSensors,
            state.sensorsPage.sensors,
            'Id');
    const resumePageModel: ResumeConfigurationModelUI = {
        addedOperations: [...addOperations],
        removedOperations: [...removeOperations],
        addedMachines: [...addMachines],
        removedMachines: [...removeMachines],
        addedMotes: [...addMotes],
        removedMotes: [...removeMotes],
        addedSensors: [...addSensors],
        removedSensors: [...removeSensors]
    };
    return resumePageModel;
};
