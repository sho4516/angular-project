import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert/alert.component";
import { Dropdown } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        Dropdown        
    ],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        Dropdown,
        CommonModule 
    ]
})
export class SharedModule {

}