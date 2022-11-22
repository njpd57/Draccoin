import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../sevices/loginService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
    user: string = '';

    Email : string = '';
    Clave: string = '';
    error: boolean;

    constructor(private loginService: AuthService, private router: Router) {
        this.error = false;
    }

    ngOnInit(): void {
        if (localStorage.getItem('token')) {
            this.router.navigateByUrl('/home');
        }
    }

    login() {
        this.loginService.auth(this.Email,this.Clave).subscribe({
            next: (res: any) => {
                if (res) {

                    if(res.error != null){
                        console.log(res);
                        Swal.fire({
                            icon: 'error',
                            title: 'Contraseña incorrecta',

                          });
                    }else{
                        this.loginService.login(res);
                        this.router.navigateByUrl('/home');
                    }

                } else {
                    this.error = true;

                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    cambiarEmail(val: any){
        console.log(val);

    }
}
