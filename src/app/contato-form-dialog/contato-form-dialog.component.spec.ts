import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoFormDialogComponent } from './contato-form-dialog.component';

describe('ContatoFormDialogComponent', () => {
  let component: ContatoFormDialogComponent;
  let fixture: ComponentFixture<ContatoFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContatoFormDialogComponent]
    });
    fixture = TestBed.createComponent(ContatoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
