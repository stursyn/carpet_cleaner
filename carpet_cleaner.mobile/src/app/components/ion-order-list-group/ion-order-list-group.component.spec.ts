import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonOrderListGroupComponent } from './ion-order-list-group.component';

describe('IonOrderListGroupComponent', () => {
  let component: IonOrderListGroupComponent;
  let fixture: ComponentFixture<IonOrderListGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonOrderListGroupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonOrderListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
