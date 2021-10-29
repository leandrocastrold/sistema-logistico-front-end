import { Component, OnInit } from '@angular/core';
import { ProdPosition } from 'src/app/position-product/position';
import { PositionService } from 'src/app/position-product/position.service';
import { GeneralService } from 'src/app/shared/general.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  currentPosition?: ProdPosition
  constructor(private positionService: PositionService,
    private generalService: GeneralService) {
  }

  ngOnInit(): void {
  }


  findProductPosition(id: string): void {
    this.positionService.findPositionByProductId(id).subscribe(position => {
      this.currentPosition = position;
      console.log(position)
    })
  }

  addQuantity(positionId: number, amount: string) {
    this.positionService.patch(positionId, amount).subscribe(p => {
      this.generalService.openSnackBar(`Adicionado com sucesso.`,true)
      this.generalService.reloadCurrentRoute();
    })

  }

}
