import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthroizeMenuComponent } from './authroize-menu.component';

describe('AuthroizeMenuComponent', () => {
  let component: AuthroizeMenuComponent;
  let fixture: ComponentFixture<AuthroizeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthroizeMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthroizeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
