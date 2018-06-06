import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable()
export class ApiService {


  public apiAddress = environment.apiUrl;
  constructor(private http: HttpClient) { 


  }


  getSimpleGare(tipologiaId, categoriaId, regioneName, provinciaId){
    console.log(this.apiAddress + '/getGare/?tipologiaId='+tipologiaId+'&categoriaId='+categoriaId+'&regioneName='+regioneName+'&provinciaId='+provinciaId)
  	this.http.get(this.apiAddress + '/getGare/?tipologiaId='+tipologiaId+'&categoriaId='+categoriaId+'&regioneName='+regioneName+'&provinciaId='+provinciaId)

  }

 makePayment(amount,token){

	  this.http.get(this.apiAddress + '/makePayment/?amount='+amount+'&token='+token).subscribe((data) => {
		   //let retVal = JSON.parse(data)
		   console.log("data")
		   console.log(data)
	  })
 }

}
