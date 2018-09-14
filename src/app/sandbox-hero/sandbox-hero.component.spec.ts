import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxHeroComponent } from './sandbox-hero.component';

describe('SandboxHeroComponent', () => {
  let component: SandboxHeroComponent;
  let fixture: ComponentFixture<SandboxHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
