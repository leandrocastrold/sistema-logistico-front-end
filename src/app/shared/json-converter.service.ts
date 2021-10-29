import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonConverterService {

  constructor() { }
  
  convertPageableToJson(jsonData: any) : string {
      let jsonPageableResponse = JSON.stringify(jsonData)
      let strTemp = jsonPageableResponse.split('"content":')[1]
      .split(',"pageable"')[0]
      return `${strTemp}`;
  }
}
