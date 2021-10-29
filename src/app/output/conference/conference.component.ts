import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/orders/order.service';
import { Separation } from 'src/app/orders/separation';
import { GeneralService } from 'src/app/shared/general.service';
import { JsonConverterService } from 'src/app/shared/json-converter.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {


  separations?: Separation[]
  isEmpty: boolean = true;

  constructor(private jsonConverter: JsonConverterService,
    private orderService: OrderService,
    private generalService: GeneralService) { }


  ngOnInit(): void {
    this.orderService.get().subscribe(sep => {

      this.separations = JSON.parse(this.jsonConverter.convertPageableToJson(sep));
      this.separations?.forEach(s => {
        if (s.status == 'SEPARADO') {
          this.isEmpty = false;
        }
      })
    })
  }

  changeStatus(id: number, status: string) {
    this.orderService.changeStatus(id, status);
    this.generalService.reloadCurrentRoute();
  }

  cancelSeparation(separationId: number) {
    this.orderService.cancelSeparation(separationId)
  }

}
