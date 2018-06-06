

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'importo'})
export class ImportoPipe implements PipeTransform {
  transform(value: string) : string {
    value =  value.replace("â‚","")
    value = value.replace(".","")
    let ret = ''
    let decimali = "00"
    if (value.includes(',')){
    	let a = value.split(',')

    	if (a.length > 1) {
    		decimali = a[1].substring(0, 2)	
    	}
    	ret = a[0]+"."+decimali
    } else {
    	ret = value+"."+decimali
    }
    value = value.replace(",",".")
    if (value.includes("ND")){
    		ret = "0.00"
    }

    return ret;
  }
}
