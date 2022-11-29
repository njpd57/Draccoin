import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallePreciosComponent } from './detalle-precios/detalle-precios.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ParticularPreciosComponent } from './particular-precios/particular-precios.component';

const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
    },
    {
        path: "home",
        component: IndicadoresComponent,
    },
    {
        path: "precios/:indicador",
        component: DetallePreciosComponent,
    },
    {
        path: "particular/:indicador",
        component: ParticularPreciosComponent,
    },

    {
        path: "**",
        component: PageNotFoundComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,  { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }


