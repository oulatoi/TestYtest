class finalObj{
  constructor(c10,prezzoAttuale,taglia){
    this.c10=c10;
    this.prezzoAttuale=prezzoAttuale;
    prezzoScontato=null;
    linkImmagine=null;
    linkSito=null;
    this.taglia=taglia;
  }
  AddingImage(c10){
    let iniziale=c10.substring(0,2);
    this.linkImmagine=`https://www.yoox.com/images/items/${this.iniziale}/${this.c10}_14_f.jpg?impolicy=crop&width=387&height=490`;
    this.linkSito=`https://www.yoox.com/it/${this.c10}/item#cod10=${this.c10}`;
    this.prezzoScontato=(prezzoAttuale*40)/100;
  }


}
