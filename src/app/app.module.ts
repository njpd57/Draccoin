import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input'
import {MatSidenavModule} from '@angular/material/sidenav';

import 'chartjs-adapter-moment';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { DetallePreciosComponent } from './detalle-precios/detalle-precios.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { CustomPaginator } from './customPaginator';
import { ParticularPreciosComponent } from './particular-precios/particular-precios.component';

import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
    declarations: [
        AppComponent,
        IndicadoresComponent,
        DetallePreciosComponent,
        ParticularPreciosComponent,
        FooterComponent,
        LoginComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,

        HttpClientModule,
        MatToolbarModule,
        MatListModule,
        MatDividerModule,
        NgChartsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatNativeDateModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSidenavModule
    ],
    providers: [MatPaginator, { provide: MatPaginatorIntl, useValue: CustomPaginator() }],
    bootstrap: [AppComponent, FooterComponent]
})
export class AppModule { }
