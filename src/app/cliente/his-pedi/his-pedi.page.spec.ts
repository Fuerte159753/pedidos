import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HisPediPage } from './his-pedi.page';

describe('HisPediPage', () => {
  let component: HisPediPage;
  let fixture: ComponentFixture<HisPediPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HisPediPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
