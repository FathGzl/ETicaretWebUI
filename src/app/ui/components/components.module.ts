import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { RegisterModule } from './register/register.module';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    LoginModule,
    PasswordResetModule,
    ProductsModule,
    RegisterModule,
    UpdatePasswordModule

  ]
})
export class ComponentsModule { }
