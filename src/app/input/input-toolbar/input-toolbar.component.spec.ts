import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputToolbarComponent } from './input-toolbar.component';

describe('InputToolbarComponent', () => {
  let component: InputToolbarComponent;
  let fixture: ComponentFixture<InputToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
