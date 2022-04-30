import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtheraccpetridePage } from './otheraccpetride.page';

describe('OtheraccpetridePage', () => {
  let component: OtheraccpetridePage;
  let fixture: ComponentFixture<OtheraccpetridePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtheraccpetridePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtheraccpetridePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
