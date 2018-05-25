import { Component } from '@angular/core';
import { AngularFireDatabase , AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gare: Observable<any[]>;
  gareObject: AngularFireObject<any>;

  constructor(db: AngularFireDatabase) {
    this.gare = db.list('gare').valueChanges();
  }


chiudi(){
	console.log("cliudi")
	sidenav.toggle()
}


}
