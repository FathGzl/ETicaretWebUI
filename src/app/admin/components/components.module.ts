import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthroizeMenuComponent } from './authroize-menu/authroize-menu.component';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomersModule } from './customers/customers.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthroizeMenuModule } from './authroize-menu/authroize-menu.module';



@NgModule({
  declarations: [
    AuthroizeMenuComponent
  ],
  imports: [
    CommonModule,    
    AuthroizeMenuModule,
    CustomersModule,
    DashboardModule,    
    OrdersModule,
    ProductsModule,
    RolesModule,
    UsersModule
  ]
})
export class ComponentsModule { }
