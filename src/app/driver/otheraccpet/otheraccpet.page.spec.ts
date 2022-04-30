import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtheraccpetPage } from './otheraccpet.page';

describe('OtheraccpetPage', () => {
  let component: OtheraccpetPage;
  let fixture: ComponentFixture<OtheraccpetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtheraccpetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtheraccpetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
