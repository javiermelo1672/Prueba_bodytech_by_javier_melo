import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';
  constructor(private authser:AuthService) { }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  login(){
    Swal.fire({
      text:'Autenticando su usuario',
      imageUrl:'/assets/icons/carga.gif',
      imageWidth:90,
      showConfirmButton:false,
      allowOutsideClick:false
    })
    let that=this;
    this.authser.IniciarSesion(this.email,this.password).then(res=>{
      Swal.close();

      that.showToasts("Autenticación correcta","success");
    }).catch(function(reject)
    {
      console.log(reject);
      that.email="";
      that.password="";
      Swal.close();
     reject.code=='auth/user-not-found'?that.showToasts("No existe usuario","error"):null;
     reject.code=="auth/wrong-password"?that.showToasts("Error de contraseña","error"):null;
     reject.code=="auth/invalid-email"?that.showToasts("Formato de correo incorrecto","error"):null;
     reject.code=="auth/too-many-requests"?that.showToasts("Necesita verificación","error"):null;
    });
    
  }
  
  showToasts(m,type){

    type=="success"?this.showSuccesToast(m):this.showerrorToast(m);
  }

  showSuccesToast(m){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    Toast.fire({
      icon: 'success',
      title: m
    });
  }

  showerrorToast(m){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    
    Toast.fire({
      icon: 'error',
      title: m
    });
  }

}
