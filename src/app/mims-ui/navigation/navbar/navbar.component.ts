import { NavBarContextItemModel } from "./models/navbar-context-item.model";
import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonNavigationService } from "../common/services/navigation.service";
import { EventEmitter } from "@angular/core";
import { NavBarSettingsModel } from "@mimsUI/navigation/navbar/models/navbar-settings.model";
import { Subscription } from "rxjs";

@Component({
  selector: "mims-navbar",
  templateUrl: "./navbar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  public contextMenu!: NavBarContextItemModel[];
  public settings!: NavBarSettingsModel;
  @Output() public navigate = new EventEmitter();
  @Input() private menuPath: string = "";
  private menuSubscription!: Subscription;

  public constructor(
    private navbarService: CommonNavigationService,
    private ref: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.menuSubscription = this.navbarService.getMenu(this.menuPath).subscribe(
      (menu) => {
        this.settings = menu.settings;
        this.contextMenu = menu.contextMenu;
        this.ref.markForCheck();
      },
      () => {
        this.menuSubscription.unsubscribe();
      }
    );
  }
  public onContextMenuClick(clickedElement: NavBarContextItemModel): void {
    this.navigate.emit(clickedElement.url);
  }
}
