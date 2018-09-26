import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeChangerComponent } from './shape-changer.component';

describe('ShapeChangerComponent', () => {
  let component: ShapeChangerComponent;
  let fixture: ComponentFixture<ShapeChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
