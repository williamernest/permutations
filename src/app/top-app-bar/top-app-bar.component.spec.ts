import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAppBarComponent } from './top-app-bar.component';

describe('TopAppBarComponent', () => {
  let component: TopAppBarComponent;
  let fixture: ComponentFixture<TopAppBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAppBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
