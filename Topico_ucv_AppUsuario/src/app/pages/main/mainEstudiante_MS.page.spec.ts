import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPage } from './mainEstudiante_MS.page';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
