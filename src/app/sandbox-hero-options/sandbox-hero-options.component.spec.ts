import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxHeroOptionsComponent } from './sandbox-hero-options.component';

describe('SandboxHeroOptionsComponent', () => {
  let component: SandboxHeroOptionsComponent;
  let fixture: ComponentFixture<SandboxHeroOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxHeroOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxHeroOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
