import { reducer, initialState, ConfigureState } from "./configure.reducers";
import { faker } from "@faker-js/faker";
import {
  GetProductDetails,
  GetProductDetailsSuccess,
  SaveProductDetails,
  GetOperations,
  GetOperationsSuccess,
  GetOperationsSelectBoxSuccess,
  AddOperation,
  AddOpertionSuccess,
  RemoveOperation,
  RemoveOperationSuccess,
  GetMachineOperations,
  GetMachineOperationSuccess,
  AddMachineOperation,
  AddMachineOperationSuccess,
  RemoveMachineOperation,
  RemoveMachineOperationSuccess,
  GetMotes,
  GetMotesSuccess,
  GetMotesSelectBoxSuccess,
  AddMote,
  AddMoteSuccess,
  RemoveMote,
  RemoveMoteSuccess,
  GetSensors,
  GetSensorsSuccess,
  AddSensor,
  AddSensorSuccess,
  RemoveSensor,
  RemoveSensorSuccess,
  GetEdgesSelectBox,
  GetEdgesSelectBoxSuccess,
  GetSubcontractorsSelectBox,
  GetSubcontractorsSelectBoxSuccess,
  GetMessagesSelectBox,
  GetMessagesSelectBoxSuccess,
  GetMachineSelectBox,
  GetMachineSelectBoxSuccess,
  GetResumePage,
  FinishWizard,
} from "../actions/configure.actions";
import * as Factory from "factory.ts";
import {
  ProductModelUI,
  OperationModelUI,
  ConfigureSelectBoxModelUI,
  MachineOperationModelUI,
  MoteModelUI,
  SensorModelUI,
} from "../models/configure.model";

describe("Configure Reducer", () => {
  describe("Undefined Action", () => {
    it("should return the default state", () => {
      const action = { type: "Not defined action" } as any;
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Finish Wizard", () => {
    const action = new FinishWizard({});
    const result = reducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});

describe("Configure Reducer : Product Detail State", () => {
  let fakeProductDetails;
  let fakeCurrentProductDetails;
  beforeAll(() => {
    fakeProductDetails = Factory.makeFactory<ProductModelUI>({
      Id: faker.random.number(),
      Name: (faker.name.firstName() + faker.name.lastName()).slice(0, 11),
      TargetHoursPerWeek: faker.random.number({ min: 1, max: 80 }),
      TargetEfficiency: faker.random.number({ min: 1, max: 80 }),
    }).build();
    fakeCurrentProductDetails = Factory.makeFactory<ProductModelUI>({
      Id: faker.random.number(),
      Name: (faker.name.firstName() + faker.name.lastName()).slice(0, 11),
      TargetHoursPerWeek: faker.random.number({ min: 1, max: 80 }),
      TargetEfficiency: faker.random.number({ min: 1, max: 80 }),
    }).build();
  });
  describe("[Configure] Get Product Details", () => {
    it("should return the default state", () => {
      const fakeProductId = 2;
      const action = new GetProductDetails(fakeProductId);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Product Details Successs", () => {
    it("should insert product details from payload in productDetails state with received Payload", () => {
      const action = new GetProductDetailsSuccess(fakeProductDetails);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        productsPage: {
          ...initialState.productsPage,
          productDetails: { ...action.payload },
        },
      });
    });
  });
  describe("[Configure] Save Product Details", () => {
    it("should return default state", () => {
      const action = new SaveProductDetails(fakeProductDetails);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Save Product Details Success", () => {
    it("should update product details from payload in productDetails state with received Payload", () => {
      const action = new GetProductDetailsSuccess(fakeProductDetails);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        productsPage: {
          ...initialState.productsPage,
          productDetails: {
            ...fakeCurrentProductDetails,
            ...fakeProductDetails,
          },
        },
      });
    });
  });
});

describe("Configure Reducer : Operations State", () => {
  let mockOperationModelUI: any;
  let mockOperationSelectBoxModelUI: any;
  beforeEach(() => {
    mockOperationModelUI = Factory.Sync.makeFactory<OperationModelUI>({
      Id: Factory.each((i) => i),
      Description: faker.random.word(),
      Number: faker.random.number(),
      ProductId: faker.random.number(),
      Subcontractor: {
        Id: faker.random.number(),
        Name: faker.random.word(),
      },
    });
    mockOperationSelectBoxModelUI =
      Factory.Sync.makeFactory<ConfigureSelectBoxModelUI>({
        selected: false,
        name: faker.random.word(),
        value: Factory.each((i) => i),
      });
  });
  describe("[Configure] Get Operations", () => {
    it("should return the default state", () => {
      const fakeProductId = 2;
      const action = new GetOperations(fakeProductId);
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Operations Success", () => {
    it("should insert original operations, operations and change needsUpdate to false  ", () => {
      const fakeOperationList: OperationModelUI[] =
        mockOperationModelUI.buildList(3);
      const action = new GetOperationsSuccess(fakeOperationList);
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        operationsPage: {
          ...initialState.operationsPage,
          operations: [...fakeOperationList],
          originalOperations: [...fakeOperationList],
          needsUpdate: false,
        },
      });
    });
  });
  describe("[Configure] Get Operations SelectBox Success", () => {
    it("should insert/update operations selectbox", () => {
      const fakeOperationSelectBox: ConfigureSelectBoxModelUI[] =
        mockOperationSelectBoxModelUI.buildList();
      const action = new GetOperationsSelectBoxSuccess(fakeOperationSelectBox);
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        operationsSelectBox: [...fakeOperationSelectBox],
      });
    });
  });
  describe("[Configure] Add Operation", () => {
    it("should return the default state", () => {
      const fakeOperationToAdd: OperationModelUI = mockOperationModelUI.build();
      const action = new AddOperation(fakeOperationToAdd);
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Add Operation Success", () => {
    it("should update operations and operationsSelectBox array inserting a new entity", () => {
      const fakeOperationToAdd: OperationModelUI = mockOperationModelUI.build();
      const fakeNewElementForOperationsSelectBox: ConfigureSelectBoxModelUI =
        mockOperationSelectBoxModelUI.build({
          value: fakeOperationToAdd.Id,
          name: fakeOperationToAdd.Description,
        });
      const action = new AddOpertionSuccess(fakeOperationToAdd);
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        operationsPage: {
          ...initialState.operationsPage,
          operations: [
            fakeOperationToAdd,
            ...initialState.operationsPage.operations,
          ],
        },
        operationsSelectBox: [
          fakeNewElementForOperationsSelectBox,
          ...initialState.operationsSelectBox,
        ],
      });
    });
  });
  describe("[Configure] Remove Operation", () => {
    it("should return the default state", () => {
      const fakeOperationId = 1;
      const action = new RemoveOperation(fakeOperationId);
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Remove Operation Success", () => {
    it("should update operations and operationsSelectBox array removing the entity desired", () => {
      const fakeOperationsArray: OperationModelUI[] =
        mockOperationModelUI.buildList(2);
      const fakeOperationSelectBoxArray = fakeOperationsArray.map((op) => {
        const newSelectBoxOperationItem: ConfigureSelectBoxModelUI = {
          name: op.Description,
          selected: false,
          value: op.Id,
        };
        return newSelectBoxOperationItem;
      });
      const stateWithOperationsAndSelectBoxs: ConfigureState = {
        ...initialState,
        operationsPage: {
          operations: [...fakeOperationsArray],
          originalOperations: [...fakeOperationsArray],
          needsUpdate: false,
        },
        operationsSelectBox: fakeOperationSelectBoxArray,
      };
      const action = new RemoveOperationSuccess(1);

      const expectedOperationsArray = fakeOperationsArray.filter(
        (op) => op.Id !== 1
      );
      const expectedOperationsSelectBoxArray =
        fakeOperationSelectBoxArray.filter((op) => op.value !== 1);

      const result = reducer(stateWithOperationsAndSelectBoxs, action);
      expect(result).toEqual({
        ...stateWithOperationsAndSelectBoxs,
        operationsPage: {
          ...stateWithOperationsAndSelectBoxs.operationsPage,
          needsUpdate: false,
          operations: expectedOperationsArray,
        },
        operationsSelectBox: expectedOperationsSelectBoxArray,
      });
    });
  });
});

describe("Configure Reducer : Machine Operations State", () => {
  let mockMachineOperationModelUI;
  beforeEach(() => {
    mockMachineOperationModelUI =
      Factory.Sync.makeFactory<MachineOperationModelUI>({
        Id: Factory.each((i) => i),
        MachineId: faker.random.number(),
        MachineName: faker.random.word(),
        MDE: faker.random.number(),
        OEE: faker.random.number(),
        OperationId: faker.random.number(),
        ProductId: faker.random.number(),
      });
  });
  describe("[Configure] Get Machine Operations", () => {
    it("should return the default state", () => {
      const fakeProductId = 1;
      const action = new GetMachineOperations(fakeProductId);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Machine Operations Success", () => {
    it("should update machines, originalMachines with action payload and needsUpdate must be set to false", () => {
      const mockedMachineOperationList: MachineOperationModelUI[] =
        mockMachineOperationModelUI.buildList(2);
      const action = new GetMachineOperationSuccess(mockedMachineOperationList);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        machinesPage: {
          ...initialState.machinesPage,
          machines: mockedMachineOperationList,
          originalMachines: mockedMachineOperationList,
          needsUpdate: false,
        },
      });
    });
  });
  describe("[Configure] Add Machine Operation", () => {
    it("should return the default state", () => {
      const mockedMachineOperationModel: MachineOperationModelUI =
        mockMachineOperationModelUI.build();
      const action = new AddMachineOperation(mockedMachineOperationModel);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Add Machine Operations Success", () => {
    it("should add a entity to machine array state", () => {
      const mockedMachineOperationModel: MachineOperationModelUI =
        mockMachineOperationModelUI.build();
      const action = new AddMachineOperationSuccess(
        mockedMachineOperationModel
      );
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        machinesPage: {
          ...initialState.machinesPage,
          machines: [
            mockedMachineOperationModel,
            ...initialState.machinesPage.machines,
          ],
        },
      });
    });
  });
  describe("[Configure] Remove Machine Operation", () => {
    it("should return the default state", () => {
      const mockedMachineOperationModelId: number = 1;
      const action = new RemoveMachineOperation(mockedMachineOperationModelId);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Remove Machine Operations Success", () => {
    it("should remove the entity in machine array state", () => {
      const mockMachineOperationList: MachineOperationModelUI[] =
        mockMachineOperationModelUI.buildList(2);
      const stateWithAddedMachineOperations: ConfigureState = {
        ...initialState,
        machinesPage: {
          machines: [...mockMachineOperationList],
          needsUpdate: false,
          originalMachines: { ...mockMachineOperationList },
        },
      };
      const expectedMachineOperationsArrayAfterRemoval =
        mockMachineOperationList.filter((mop) => mop.Id !== 1);
      const action = new RemoveMachineOperationSuccess(1);
      const result = reducer(stateWithAddedMachineOperations, action);
      expect(result).toEqual({
        ...stateWithAddedMachineOperations,
        machinesPage: {
          ...stateWithAddedMachineOperations.machinesPage,
          machines: expectedMachineOperationsArrayAfterRemoval,
        },
      });
    });
  });
});

describe("Configure Reducer : Motes State", () => {
  let mockMoteModelUI;
  let mockMoteSelectBoxUI;
  beforeEach(() => {
    mockMoteModelUI = Factory.Sync.makeFactory<MoteModelUI>({
      Id: Factory.each((i) => i),
      MachineId: faker.random.number(),
      MachineName: faker.random.word(),
      ProductId: faker.random.number(),
      EdgeId: faker.random.number(),
      Name: faker.random.word(),
      PollInterval: faker.random.number(),
      EdgeName: faker.random.word(),
    });
    mockMoteSelectBoxUI = Factory.Sync.makeFactory<ConfigureSelectBoxModelUI>({
      name: faker.random.word(),
      selected: false,
      value: Factory.each((i) => i),
    });
  });
  describe("[Configure] Get Motes", () => {
    it("should return the default state", () => {
      const fakeProductId = 1;
      const action = new GetMotes(fakeProductId);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Motes Success", () => {
    it("should update motes and original motes with the action payload and set needsUpdate to false", () => {
      const fakeMoteList: MoteModelUI[] = mockMoteModelUI.buildList(2);
      const action = new GetMotesSuccess(fakeMoteList);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        motesPage: {
          ...initialState.motesPage,
          motes: fakeMoteList,
          originalMotes: fakeMoteList,
          needsUpdate: false,
        },
      });
    });
  });
  describe("[Configure] Get Motes SelectBox Success", () => {
    it("should update motesSelectBox", () => {
      const fakeMoteSelectBoxList: ConfigureSelectBoxModelUI[] =
        mockMoteSelectBoxUI.buildList(2);
      const action = new GetMotesSelectBoxSuccess(fakeMoteSelectBoxList);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        motesSelectBox: fakeMoteSelectBoxList,
      });
    });
  });
  describe("[Configure] Add Mote", () => {
    it("should return the default state", () => {
      const fakeMoteToAdd: MoteModelUI = mockMoteModelUI.build();
      const action = new AddMote(fakeMoteToAdd);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Add Mote Success", () => {
    it("should add a mote  to motes array and motesSelectBox", () => {
      const fakeMoteToAdd: MoteModelUI = mockMoteModelUI.build();
      const fakeMoteSelectBoxModel: ConfigureSelectBoxModelUI =
        mockMoteSelectBoxUI.build({
          value: fakeMoteToAdd.Id,
          name: fakeMoteToAdd.Name,
        });
      const action = new AddMoteSuccess(fakeMoteToAdd);
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        motesPage: {
          ...initialState.motesPage,
          motes: [...[fakeMoteToAdd], ...initialState.motesPage.motes],
        },
        motesSelectBox: [
          ...[fakeMoteSelectBoxModel],
          ...initialState.motesSelectBox,
        ],
      });
    });
  });
  describe("[Configure] Remove Mote", () => {
    it("should return the default state", () => {
      const fakeMoteIdToRemove = 1;
      const action = new RemoveMote(fakeMoteIdToRemove);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Remove Mote Success", () => {
    it("should remove the mote by id, passed in the action payload, in motes and motesSelectBox", () => {
      const fakeMotesArray: MoteModelUI[] = mockMoteModelUI.buildList(2);
      const fakeMotesSelectBoxArray: ConfigureSelectBoxModelUI[] =
        fakeMotesArray.map((op) => {
          const newSelectBoxMoteItem: ConfigureSelectBoxModelUI = {
            name: op.Name,
            selected: false,
            value: op.Id,
          };
          return newSelectBoxMoteItem;
        });

      const stateWithMotesAndMotesSelectBox: ConfigureState = {
        ...initialState,
        motesPage: {
          motes: [...fakeMotesArray],
          needsUpdate: false,
          originalMotes: [...fakeMotesArray],
        },
        motesSelectBox: [...fakeMotesSelectBoxArray],
      };
      const action = new RemoveMoteSuccess(1);
      const expectedMotesArray = fakeMotesArray.filter((op) => op.Id !== 1);
      const expectedMotesSelectBoxArray = fakeMotesSelectBoxArray.filter(
        (op) => op.value !== 1
      );

      const result = reducer(stateWithMotesAndMotesSelectBox, action);
      expect(result).toEqual({
        ...stateWithMotesAndMotesSelectBox,
        motesPage: {
          ...stateWithMotesAndMotesSelectBox.motesPage,
          motes: expectedMotesArray,
        },
        motesSelectBox: expectedMotesSelectBoxArray,
      });
    });
  });
});
describe("Configure Reducer : Sensors State", () => {
  let mockSensorModelUI;
  beforeEach(() => {
    mockSensorModelUI = Factory.Sync.makeFactory<SensorModelUI>({
      Id: Factory.each((i) => i),
      ContactMessageId: faker.random.number(),
      LineOut: faker.random.word(),
      MachineInputTerminal: faker.random.word(),
      MachineMCode: faker.random.word(),
      MoteId: faker.random.number(),
      ProductId: faker.random.number(),
    });
  });
  describe("[Configure] Get Sensors", () => {
    it("should return the default state", () => {
      const fakeProductId = 1;
      const action = new GetSensors(fakeProductId);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Sensors Success", () => {
    it("should update sensor and originalSensors with sensor list from action payload", () => {
      const fakeSensorsList: SensorModelUI[] = mockSensorModelUI.buildList(3);
      const action = new GetSensorsSuccess(fakeSensorsList);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        sensorsPage: {
          ...initialState.sensorsPage,
          sensors: [...fakeSensorsList],
          originalSensors: [...fakeSensorsList],
          needsUpdate: false,
        },
      });
    });
  });
  describe("[Configure] Add Sensor", () => {
    it("should return the default state", () => {
      const fakeSensor: SensorModelUI = mockSensorModelUI.build();
      const action = new AddSensor(fakeSensor);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Add Sensor Success", () => {
    it("should add a sensor entity contained in the action payload to sensors", () => {
      const fakeSensor: SensorModelUI = mockSensorModelUI.build();
      const action = new AddSensorSuccess(fakeSensor);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        sensorsPage: {
          ...initialState.sensorsPage,
          sensors: [fakeSensor, ...initialState.sensorsPage.sensors],
        },
      });
    });
  });
  describe("[Configure] Remove Sensor", () => {
    it("should return the default state", () => {
      const fakeSensor = mockSensorModelUI.build();
      const action = new RemoveSensor(fakeSensor);
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Remove Sensor Success", () => {
    it("should return the default state", () => {
      const fakeSensorList: SensorModelUI[] = mockSensorModelUI.buildList(2);
      const stateWithAddedSensors: ConfigureState = {
        ...initialState,
        sensorsPage: {
          needsUpdate: false,
          originalSensors: [...fakeSensorList],
          sensors: [...fakeSensorList],
        },
      };
      const action = new RemoveSensorSuccess(1);
      const result = reducer(stateWithAddedSensors, action);
      const expectedSensorsArrayAfterRemoval = fakeSensorList.filter(
        (mop) => mop.Id !== 1
      );
      expect(result).toEqual({
        ...stateWithAddedSensors,
        sensorsPage: {
          ...stateWithAddedSensors.sensorsPage,
          sensors: expectedSensorsArrayAfterRemoval,
        },
      });
    });
  });
});

describe("Configure Reducer : EdgesSelectBox State, MachineSelectBox State, MessagesSelectBox State, SubcontractorSelectBox State", () => {
  let mockSelectBox;
  beforeAll(() => {
    mockSelectBox = Factory.Sync.makeFactory<ConfigureSelectBoxModelUI>({
      selected: false,
      name: faker.random.word(),
      value: Factory.each((i) => i),
    }).buildList(3);
  });
  describe("[Configure] Get Edges Select Box", () => {
    it("should return the default state", () => {
      const action = new GetEdgesSelectBox({});
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Edges Select Box Success", () => {
    it("should update edgeSelectBox with a list of edge selectbox from the action payload", () => {
      const edgeFakeList = mockSelectBox;
      const action = new GetEdgesSelectBoxSuccess(edgeFakeList);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        edgeSelectBox: edgeFakeList,
      });
    });
  });
  describe("[Configure] Get Subcontractors Select Box", () => {
    it("should return the default state", () => {
      const action = new GetSubcontractorsSelectBox({});
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Subcontractors Select Box Success", () => {
    it("should update subcontractorsSelectBox with a list of subcontractors selectbox from the action payload", () => {
      const subContractorFakeList = mockSelectBox;
      const action = new GetSubcontractorsSelectBoxSuccess(
        subContractorFakeList
      );
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        subcontractorsSelectBox: subContractorFakeList,
      });
    });
  });
  describe("[Configure] Get Messages Select Box", () => {
    it("should return the default state", () => {
      const action = new GetMessagesSelectBox({});
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Messages Select Box Success", () => {
    it("should update messageSelectBox with a list of messages selectbox from the action payload", () => {
      const messagesFakeList = mockSelectBox;
      const action = new GetMessagesSelectBoxSuccess(messagesFakeList);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        messageSelectBox: messagesFakeList,
      });
    });
  });
  describe("[Configure] Get Machines Select Box", () => {
    it("should return the default state", () => {
      const action = new GetMachineSelectBox({});
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
  describe("[Configure] Get Machines Select Box Success", () => {
    it("should update machineSelectBox with a list of machines selectbox from the action payload", () => {
      const machinesFakeList = mockSelectBox;
      const action = new GetMachineSelectBoxSuccess(machinesFakeList);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        machineSelectBox: machinesFakeList,
      });
    });
  });
});
describe("Configure Reducer : Resume Page State () => ", () => {
  describe("[Configure] Get Resume Page Data", () => {
    let mockSensorModelUI;

    beforeEach(() => {
      mockSensorModelUI = Factory.Sync.makeFactory<SensorModelUI>({
        Id: Factory.each((i) => i),
        ContactMessageId: faker.random.number(),
        LineOut: faker.random.word(),
        MachineInputTerminal: faker.random.word(),
        MachineMCode: faker.random.word(),
        MoteId: faker.random.number(),
        ProductId: faker.random.number(),
      });
    });
    it("should generate the resume page with the removed sensor", () => {
      const fakeOriginalSensorList: SensorModelUI[] =
        mockSensorModelUI.buildList(3);
      const fakeSensorList: SensorModelUI[] = fakeOriginalSensorList.filter(
        (elem) => elem.Id !== 1
      );
      const removedSensor = {
        ...fakeOriginalSensorList.filter((elem) => elem.Id === 1)[0],
      };
      const stateWithRemovedSensorAndOriginalSensors: ConfigureState = {
        ...initialState,
        sensorsPage: {
          sensors: [...fakeSensorList],
          originalSensors: [...fakeOriginalSensorList],
          needsUpdate: false,
        },
      };
      const actionToGetResumePage = new GetResumePage({});
      const result = reducer(
        stateWithRemovedSensorAndOriginalSensors,
        actionToGetResumePage
      );
      expect(result).toEqual({
        ...stateWithRemovedSensorAndOriginalSensors,
        resumePage: {
          ...stateWithRemovedSensorAndOriginalSensors.resumePage,
          removedSensors: [removedSensor],
        },
      });
    });
    it("should generate the resume page with the added sensor", () => {
      const fakeOriginalSensorList: SensorModelUI[] =
        mockSensorModelUI.buildList(3);
      const addedSensor = mockSensorModelUI.build({ Id: 5 });
      const stateWithRemovedSensorAndOriginalSensors: ConfigureState = {
        ...initialState,
        sensorsPage: {
          sensors: [addedSensor, ...fakeOriginalSensorList],
          originalSensors: [...fakeOriginalSensorList],
          needsUpdate: false,
        },
      };
      const actionToGetResumePage = new GetResumePage({});
      const result = reducer(
        stateWithRemovedSensorAndOriginalSensors,
        actionToGetResumePage
      );
      expect(result).toEqual({
        ...stateWithRemovedSensorAndOriginalSensors,
        resumePage: {
          ...stateWithRemovedSensorAndOriginalSensors.resumePage,
          addedSensors: [addedSensor],
        },
      });
    });
    it("should generate the resume page with no data added", () => {
      const fakeOriginalSensorList: SensorModelUI[] =
        mockSensorModelUI.buildList(3);
      const stateWithRemovedSensorAndOriginalSensors: ConfigureState = {
        ...initialState,
        sensorsPage: {
          sensors: [...fakeOriginalSensorList],
          originalSensors: [...fakeOriginalSensorList],
          needsUpdate: false,
        },
      };
      const actionToGetResumePage = new GetResumePage({});
      const result = reducer(
        stateWithRemovedSensorAndOriginalSensors,
        actionToGetResumePage
      );
      expect(result).toEqual({
        ...stateWithRemovedSensorAndOriginalSensors,
        resumePage: {
          ...stateWithRemovedSensorAndOriginalSensors.resumePage,
        },
      });
    });
  });
});
