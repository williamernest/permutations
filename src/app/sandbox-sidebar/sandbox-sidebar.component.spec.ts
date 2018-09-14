import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxSidebarComponent } from './sandbox-sidebar.component';

describe('SandboxSidebarComponent', () => {
  let component: SandboxSidebarComponent;
  let fixture: ComponentFixture<SandboxSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
