import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendererComponent } from './list-renderer.component';

describe('ListRendererComponent', () => {
  let component: ListRendererComponent;
  let fixture: ComponentFixture<ListRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
