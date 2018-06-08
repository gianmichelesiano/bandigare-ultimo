import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase , AngularFireObject} from 'angularfire2/database';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  gareObj: Observable<any>;
  gareObject: AngularFireObject<any>;


  totali = 0
  lavori = 0
  servizi = 0
  forniture = 0
  nuoveGareLavoro = 0
  nuoveGareServizio = 0
  nuoveGareForniture = 0

  gareScroll = [];

  gare  = [];

  p: number = 1;



  
  sum = 20;

  constructor(protected localStorage: LocalStorage, private db: AngularFireDatabase) { }

  ngOnInit() {

      this.db.object('gare').snapshotChanges().subscribe(action => {
          localStorage.setItem("gareLocal", JSON.stringify(action.payload.val()));
          let gareLocal = JSON.parse(localStorage.getItem('gareLocal'))
           console.log(gareLocal)
           console.log(typeof gareLocal)

           let gareArray = []
           for (let key in gareLocal) {
              gareArray.push(gareLocal[key]);
           }

           localStorage.setItem("GareTutte", String(gareArray.length));


           this.lavori = Number(gareArray.filter(item => item.TIPOLOGIA === 'LAVORI').length)
           this.servizi = Number(gareArray.filter(item => item.TIPOLOGIA === 'SERVIZI').length)
           this.forniture = Number(gareArray.filter(item => item.TIPOLOGIA === 'FORNITURE').length)
           this.totali = this.lavori +this.servizi  + this.forniture

           this.nuoveGareLavoro = Math.floor(( this.lavori/20) + 40);
           this.nuoveGareServizio = Math.floor((this.servizi/20) + 30);
           this.nuoveGareForniture = Math.floor((this.forniture/20) + 20);



           this.gare = gareArray.sort().reverse()

           for (let i = 0; i < this.gare.length; ++i) {
             if (typeof(this.gare[i]) !== 'undefined'){
                      let arrayDownload = this.getInfoDownload(this.gare[i].DOWNLOAD)
                      let arrayInfoAggintive = this.getInfoDownload(this.gare[i].DOWNLOAD)
                      let arrayRetDownload = arrayDownload.concat(arrayInfoAggintive);

                      this.gare[i]['mylink'] = arrayRetDownload
                      this.gareScroll.push(this.gare[i]);         
             }
           }

           
      });
   } 

   ngAfterViewInit(){


   }       

   pageChanged(e){
     location.href = "#";
     location.href = "#container";
     this.p = e

   }


  apriDettaglio(gara){
    console.log(gara)
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



