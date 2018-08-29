import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChangerComponent } from './color-changer.component';

describe('ColorChangerComponent', () => {
  let component: ColorChangerComponent;
  let fixture: ComponentFixture<ColorChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
