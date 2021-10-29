import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputToolbarComponent } from './output-toolbar.component';

describe('OutputToolbarComponent', () => {
  let component: OutputToolbarComponent;
  let fixture: ComponentFixture<OutputToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
