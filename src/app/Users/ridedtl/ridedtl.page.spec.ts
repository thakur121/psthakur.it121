import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RidedtlPage } from './ridedtl.page';

describe('RidedtlPage', () => {
  let component: RidedtlPage;
  let fixture: ComponentFixture<RidedtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidedtlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RidedtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
