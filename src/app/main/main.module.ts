import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducerName, mainReducers } from "./main.reducers.index";
import { RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { MimsUIModule } from "@mimsUI/mims-ui.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const MainRoutingModule = RouterModule.forChild([
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "products",
        loadChildren: "../features/products/products.module#ProductsModule",
      },
      {
        path: "data-warehouse",
        loadChildren:
          "../features/data-warehouse/data-warehouse.module#DataWarehouseModule",
      },
      {
        path: "production",
        loadChildren:
          "../features/production/production.module#ProductionModule",
      },
    ],
  },
]);

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MimsUIModule,
    StoreModule.forFeature(reducerName, mainReducers),
  ],
  declarations: [MainComponent],
})
export class MainModule {}
