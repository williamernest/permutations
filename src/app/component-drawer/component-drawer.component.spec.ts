import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDrawerComponent } from './component-drawer.component';

describe('ComponentDrawerComponent', () => {
  let component: ComponentDrawerComponent;
  let fixture: ComponentFixture<ComponentDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
