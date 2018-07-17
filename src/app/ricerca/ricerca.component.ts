import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { MyDataService } from '../services/mydataservice';
import { Tipologia } from '../services/tipologia';
import { Categoria } from '../services/categoria';
import { Regione } from '../services/regioni';
import { Provincia } from '../services/provincia';
import {AppSettings} from '../appSettings';
import {MatSnackBar} from '@angular/material';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

//import {ApiService} from '../api.service';
import { environment } from '../../environments/environment'; 
  


interface ricercaModel {
  organization_country: string;
  provincia: string;

}

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  gareObs: Observable<any[]>;

  selectedTipologia:Tipologia = new Tipologia(0, '');
  selectedCategoria:Categoria = new Categoria('TT', 0, '');
  selectedRegione:Regione = new Regione(0, '');
  selectedProvincia:Provincia = new Provincia('TT', 0, '' );


  tipologie: Tipologia[];
  categorie: Categoria[];
  regioni: Regione[];
  provincie: Provincia[];

  countries = AppSettings.COUNTRY
  organization_country = ''
  selectedValue: string;

  message = ''

  finished = false

  public gare :any = [];

  
  gareScroll = [];
  sum = 20;

  moduloVisibile = true

  panelOpenState: boolean = false;

  p: number = 1;


  constructor(private _mydataService: MyDataService, public snackBar: MatSnackBar) { 


    this.tipologie = this._mydataService.getTipologia();
    //this.categoriaId = 'TT'
    this.regioni = this._mydataService.getRegioni();

  	
  }

  Pulisci(){
   
    this.selectedTipologia.id = 1
    this.selectedCategoria.id = 'TT'
    this.selectedRegione.id = 0
    this.selectedProvincia.id = 'TT'

  }




  onSelectTipologia(tipologiaid) {

    //this.tipologie = this._mydataService.getTipologia();
    this.categorie = this._mydataService.getCategoria().filter((item)=> item.tipologiaid == tipologiaid);
  }

  onSelectRegione(regioneid) {
    this.provincie = this._mydataService.getProvincia().filter((item)=> item.regioneid == regioneid);
  }

  ngOnInit() {
    
  }

 doRicerca(tipologiaId, categoriaId, regioneId, provinciaId){
   
   this.moduloVisibile = false

   let tip = ''
   if (tipologiaId==1){
   	tip='LAVORI'
   }
   if (tipologiaId==2){
   	tip='SERVIZI'
   }
   if (tipologiaId==3){
   	tip='FORNITURE'
   }

   //let 


   
   let gareTipologia = []
   let gareCategoria = []
   let gareRegioni = []
   let gareProvincia = []
   this.gare = []
   this.gareScroll = [];
   if (tipologiaId == 0){
         this.moduloVisibile = true
         this.snackBar.open('Inserire almeno una tipologia', '', {duration: 3000,}); 
   } else {

       let regioneName = '';
       if (regioneId == 0){
             regioneName = 'tutte'
       } else  {
      
       	     let regioneNameArr = this.regioni.filter(item => item.id === parseInt(regioneId))
       	     regioneName = regioneNameArr[0].name
       }

       let gareLocal = JSON.parse(localStorage.getItem('gareLocal'))


       let gareArray = []
       for (let key in gareLocal) {
          gareArray.push(gareLocal[key]);
      }

       	   gareTipologia = gareArray.filter(item => item.TIPOLOGIA === tip);
            if (categoriaId === 'TT') {
                gareCategoria = gareTipologia
            } else if (categoriaId.length > 2){ 
                gareCategoria = gareTipologia.filter(item => item.CATEGORIA_PREVALENTE === categoriaId);
            } else if (categoriaId.length == 2) {
                gareCategoria = gareTipologia.filter(item => item.CPV.substring(0, 2) === categoriaId);
            }

            if (regioneName.toUpperCase() == 'TUTTE'){
            	gareRegioni = gareCategoria
            } else {
            	gareRegioni = gareCategoria.filter(item => item.REGIONE === regioneName.toUpperCase());
            }

            if(provinciaId === 'TT' ){
				        gareProvincia = gareRegioni
            } else {
            	gareProvincia = gareRegioni.filter(item => item.PROVINCIA === provinciaId);
            }
            this.gare = gareProvincia

    			  for (let i = 0; i < this.gare.length; ++i) {
    			  	 if (typeof(this.gare[i]) !== 'undefined'){
    		                let arrayDownload = this.getInfoDownload(this.gare[i].DOWNLOAD)
    		                let arrayInfoAggintive = this.getInfoDownload(this.gare[i].INFO_AGGIUNTIVE)
    		                let arrayRetDownload = arrayDownload.concat(arrayInfoAggintive);

    		                this.gare[i]['mylink'] = arrayRetDownload
    		                this.gareScroll.push(this.gare[i]);	  	 	
    			  	 }
    			  }

  		      if (this.gareScroll.length>0){
  		          this.message = 'Sono state trovate '+this.gare.length+' gare.'
  		      } else {
  		         this.message = 'Nessuna gara trovata'
  		      } 

       
    }

    this.selectedTipologia.id = 1
    this.selectedCategoria.id = 'TT'
    this.selectedRegione.id = 0
    this.selectedProvincia.id = 'TT'
 }

 nuovaRicerca(){

   this.message = ''
   this.gareScroll = [];
   this.gare = [];
   this.moduloVisibile = true
   this.p = 1

 }


   pageChanged(e){
     document.getElementById("onTop").scrollIntoView();
     this.p = e

   }


  apriDettaglio(gara){

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

  getInfoAggiuntive(garaInfoAggiuntive){

      let arrayRetInfoAggiuntive = []
      let etichetta = ''
      let tipo = ''

      if (garaInfoAggiuntive != '{}' && garaInfoAggiuntive != ''){
     
        
         let objectInfoAggiuntive = JSON.parse(garaInfoAggiuntive);
         for (var key in objectInfoAggiuntive) {
           if (key.toUpperCase().includes('MAIL')){
                 let mail = objectInfoAggiuntive[key]
    
           } else {
                if (key.toUpperCase().includes('LINK')){
                  etichetta = "Apri sito web";
                  tipo = 'link'
                } else if (key.toUpperCase().includes('SITO_GURI')){
                   etichetta = "Gazzetta Ufficiale";
                   tipo = 'link'
                } else if (key.toUpperCase().includes('SITO_WWW')){
                   etichetta = "Apri sito web";
                   tipo = 'link'
                }  else if (key.toUpperCase().includes('SITO_HTTP')){
                   etichetta = "Apri sito web";
                   tipo = 'link'
                }  else {
                  console.log('non ce risorsa aggiuntiva')
                }
                if (objectInfoAggiuntive[key] != '' && arrayRetInfoAggiuntive['valore'] != objectInfoAggiuntive[key]) {
                 arrayRetInfoAggiuntive.push({chiave:etichetta, valore : objectInfoAggiuntive[key], tipo: tipo})
                }
           }

         }
      }
      return arrayRetInfoAggiuntive
  }

}
