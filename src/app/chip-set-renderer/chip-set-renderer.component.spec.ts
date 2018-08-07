import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipSetRendererComponent } from './chip-set-renderer.component';

describe('ChipSetRendererComponent', () => {
  let component: ChipSetRendererComponent;
  let fixture: ComponentFixture<ChipSetRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipSetRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipSetRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
