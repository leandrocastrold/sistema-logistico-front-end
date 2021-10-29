import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private router: Router, private _snackBar: MatSnackBar) { 
}

reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}

openSnackBar(msg: string,isSuccess:boolean) {
  this._snackBar.open(msg, "",{
    duration: 3000,
    panelClass: isSuccess? 'success-snackbar' : 'error-snackbar',
    horizontalPosition: "right",
    verticalPosition:"top"
  });
}
}
