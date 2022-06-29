import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-per',
  templateUrl: './show-per.component.html',
  styleUrls: ['./show-per.component.css']
})
export class ShowPerComponent implements OnInit {

  constructor(private service:SharedService) { }
  PersonelList:any=[];

  ModalTitle: string | undefined;
  ActivateAddEditPerComp:boolean=false;
  per:any;

  ngOnInit(): void { 
    
    this.refreshPerList();//component çağrıldığında çalışır!
    
  }

  addClick(){
    this.per={
      PersonelId:0,
      PersonelAd:"",
      Departman:"",
      GirisTarihi:"",
      FotografAd:"genel.png"

    }
    this.ModalTitle="Personel Ekle";
    this.ActivateAddEditPerComp=true;
  }
  editClick(item: any){
    this.per=item;
    this.ModalTitle="Personel Düzenle";
    this.ActivateAddEditPerComp=true;
  }
  deleteClick(item: { PersonelId: any; }): void{
    if(confirm('Emin misiniz?')){
      this.service.deletePersonel(item.PersonelId).subscribe(data=>{
        alert(data.toString());
        this.refreshPerList();
      })
    }
  }
  closeClick(){
    this.ActivateAddEditPerComp=false;
    this.refreshPerList();
  }


  refreshPerList(){
    this.service.getPerList().subscribe(data=>{

      this.PersonelList=data;
    });
  }

}
