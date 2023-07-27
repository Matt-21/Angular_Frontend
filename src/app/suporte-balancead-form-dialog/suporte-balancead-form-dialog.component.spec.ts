import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuporteBalanceadFormDialogComponent } from './suporte-balancead-form-dialog.component';

describe('SuporteBalanceadFormDialogComponent', () => {
  let component: SuporteBalanceadFormDialogComponent;
  let fixture: ComponentFixture<SuporteBalanceadFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuporteBalanceadFormDialogComponent]
    });
    fixture = TestBed.createComponent(SuporteBalanceadFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
