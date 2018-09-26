import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SasscodeComponent } from './sasscode.component';

describe('SasscodeComponent', () => {
  let component: SasscodeComponent;
  let fixture: ComponentFixture<SasscodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SasscodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SasscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
