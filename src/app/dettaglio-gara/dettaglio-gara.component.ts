import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettaglio-gara',
  templateUrl: './dettaglio-gara.component.html',
  styleUrls: ['./dettaglio-gara.component.css']
})

// http://localhost:4200/dettaglio?iden=ID101017
export class DettaglioGaraComponent implements OnInit {

  param1: string;
  gara:any
  constructor(private route: ActivatedRoute) { 


    this.route.queryParams.subscribe(params => {
        this.param1 = params['iden'];
  		console.log("this.param1")
  		console.log(this.param1)

  		let gareLocal = JSON.parse(localStorage.getItem('gareLocal'))

  		this.gara = gareLocal[this.param1]
  		console.log(gareLocal[this.param1])

  		let arrayDownload = this.getInfoDownload(this.gara.DOWNLOAD)
        let arrayInfoAggintive = this.getInfoDownload(this.gara.INFO_AGGIUNTIVE)
        let arrayRetDownload = arrayDownload.concat(arrayInfoAggintive);

        this.gara['mylink'] = arrayRetDownload
    });
  }

  ngOnInit() {
  }

  getInfoDownload(garaDownload){

    let arrayRetDownload = []
    let etichetta = 'Link'
    let tipo = 'link'
    if (garaDownload != ''){
      let i = 1
      let objectDownload = JSON.parse(garaDownload);

      for (var key in objectDownload) {
        if (key.toUpperCase().includes('AVVISO')){
          etichetta = "Avviso";
          tipo = 'download'
        } else if (key.toUpperCase().includes('DISCIP')){
              etichetta = "Disciplinare di gara";
              tipo = 'download'
        } else if (key.toUpperCase().includes('BANDO')){
           etichetta = "Bando di gara";
           tipo = 'download'
        } else if (key.toUpperCase().includes('RETTI')){
           etichetta = "Rettifica";
           tipo = 'download'
        } else if (key.toUpperCase().includes('SCHEMA')){
           etichetta = "Schema di gara";
           tipo = 'download'
        } else if (key.toUpperCase().includes('PLANIM')){
           etichetta = "Planimetria";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('COMPUT')){
           etichetta = "Computo Metrico";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('PDF')){
           etichetta = "Documento";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('URL')){
           etichetta = "Apri sito web";
           tipo = 'link'
        }  else if (key.toUpperCase().includes('ANAC')){
           etichetta = "Pagina ANAC";
           tipo = 'link'
        } else if (key.toUpperCase().includes('FASCICOLO')){
           etichetta = "Fascicolo di gara";
           tipo = 'link'
        }  else {
          etichetta = "LINK " + i;
          tipo = 'link'
          i++
        }
        if (objectDownload[key] != '') {
          arrayRetDownload.push({chiave:etichetta, valore : objectDownload[key], tipo: tipo})
        }
      }
    }

    return arrayRetDownload

  }

}
