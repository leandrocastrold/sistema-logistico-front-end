import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/orders/order.service';
import { Separation } from 'src/app/orders/separation';
import { PositionService } from 'src/app/position-product/position.service';
import { GeneralService } from 'src/app/shared/general.service';
import { JsonConverterService } from 'src/app/shared/json-converter.service';

@Component({
  selector: 'app-expedition',
  templateUrl: './expedition.component.html',
  styleUrls: ['./expedition.component.scss']
})
export class ExpeditionComponent implements OnInit {

  separations?: Separation[]
  isEmpty: boolean = true;

  constructor(private orderService: OrderService,
    private positionService: PositionService,
    private jsonConverter: JsonConverterService, private generalService: GeneralService) { }



  ngOnInit(): void {
    this.orderService.get().subscribe(s => {
      this.separations = JSON.parse(this.jsonConverter.convertPageableToJson(s));
      this.separations?.forEach(s => {
        if (s.status == "CONFERIDO") {
          this.isEmpty = false;
        }
      })
    })
  }

  shipProducts(separationid: number) {
    this.orderService.getById(separationid.toString()).subscribe(sep => {
      this.confirmeShipping(sep);
      this.orderService.delete(Number(separationid))
      this.generalService.openSnackBar("Separação expedida!", true) 
    })

  }

  confirmeShipping(separation: Separation) {
    for (let o of separation.orderItems) {
      this.positionService.findPositionByProductId(o.product.id?.toString()!).subscribe(position => {
        this.positionService.removeFromReserve(position.id!, o.quantity);
      })
    }
  }

  cancelShipping(separationId: number) {
    this.orderService.getById(separationId.toString()).subscribe(sep => {
      for (let o of sep.orderItems) {
        this.positionService.findPositionByProductId(o.product.id?.toString()!).subscribe(position => {
          this.positionService.cancelOrder(position.id!, o.quantity);
        })
      }
    })
  }
}
