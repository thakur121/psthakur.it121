import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartridePage } from './startride.page';

describe('StartridePage', () => {
  let component: StartridePage;
  let fixture: ComponentFixture<StartridePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartridePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartridePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
