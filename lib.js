
console.log("esercizo 2");
let stc =new XMLHttpRequest();
stc.onreadystatechange = function(){
  switch (stc.readyState) {
    case 1:console.log("istanza creata"); break;
    case 2:console.log(stc.getAllResponseHeaders());break;
    case 3:console.log("scaricamento dei dati");break
    case 4:console.log("Operazione completata");break

  }
}
stc.open('GET','ChargeItems.txt',true);
stc.send();

stc.onload =function(){
  if(stc.status === 200){
    console.log("tutto ok");
    console.log(stc.responseText);
    parseItem(stc.responseText)
  }
  else if (stc.status === 404) {
    console.log("risorsa non trovata");
  }
  else if (stc.status===500) {
    console.log("errore interno");
  }
}

function parseItem(item){
  const codici = JSON.parse(item);
  console.log(codici);
  FOReachItems(codici);
}

function FOReachItems(items){
  let finalList = new Array;
  if(items.length >0){
    console.log('FOReachItems methdos');
    for (var i = 0; i < items.length; i++) {
      let nomeCOdice=items[i];
      finalList.push(ReqREesp(nomeCOdice));
    }
    initBlog(finalList);
  }
  else {
    console.log('FOReachItems non ci sono articoli');
  }
}


function ReqREesp(items){
  let codice=items.codice;
  let prezzoAttuale=items.prezzoAttuale;
  let taglia=items.taglia;
  let marca=items.marca;
  let iniziale=codice.substring(0,2);
  let linkImmagine=`https://www.yoox.com/images/items/${iniziale}/${codice}_14_f.jpg?impolicy=crop&width=200&height=200`;
  let linkSito=`https://www.yoox.com/it/${codice}/item#cod10=${codice}`;
  let prezzoScontato=prezzoAttuale/2;
  // console.log(`codice: ${codice},taglia: ${taglia}, prezzoAttuale: ${prezzoAttuale}, prezzoScontato: ${prezzoScontato}, linkImmagine: ${linkImmagine} , linkSito: ${linkSito} `);
  let finalObj={
       codice:codice,
       prezzoAttuale:prezzoAttuale,
       prezzoScontato :prezzoScontato,
       linkImmagine:linkImmagine,
       linkSito:linkSito,
       taglia:taglia,
       marca:marca
    }
return finalObj;
}



const blog={
  itemPerPage :20,
  currentPage: 0,
  totalPage : 0,
  blogWrapper : document.getElementById('blog-w'),
  pagePositionWrapper: document.getElementById('page-position-w')
}

window.addEventListener('scroll',(e)=>{
  let scrollHeight,clientHeight,scrollTop;
  ({scrollHeight,clientHeight,scrollTop}=document.documentElement);
  let maxScroll=scrollHeight-clientHeight;
  let minScrool=scrollHeight /blog.totalPage;
  console.log(maxScroll);
  if( scrollTop >=maxScroll -1 && blog.currentPage < blog.totalPage -1){
    blog.currentPage++
    showPosts();
    setIndicatoreAttivo()
    }
})
async function initBlog(item) {
  blog.posts=item
 blog.totalPage=Math.ceil(blog.posts.length / blog.itemPerPage);
 initIndicatoriPaginazione()
  showPosts();
};

function showPosts() {
  let start=blog.currentPage * blog.itemPerPage
  for(let i= start; i< start + blog.itemPerPage; i++){
    //console.log(i);
  //creaimo la sezione article dinamicamente
    let Dom_post= document.createElement('article');
    Dom_post.setAttribute('class','blog-post');
    Dom_post.innerHTML=createPostHtml(blog.posts[i])
    blog.blogWrapper.appendChild(Dom_post);
  }
}

function createPostHtml({codice,prezzoAttuale,prezzoScontato,linkImmagine,linkSito,taglia,marca}) { //destrutturazione
  return `<h3 class="title">${codice}</h3>
  <div class="body"><img src="${linkImmagine}"></div>
<div class="body">marca: ${marca}</div>
  <div class="body">prezzo attuale: ${prezzoAttuale}</div>
  <div class="body">prezzo SCONTATO: ${prezzoScontato}</div>
  <div class="body"><a href="${linkSito}" target="_blank"> LINK</a></div>
  <div class="info">${taglia}</div>`;
}
//initBlog();

//definire dinamima degli indicatori laterali
function initIndicatoriPaginazione() {
  for (let i=0; i < blog.totalPage ; i++){
    let classi='position'
    let valP=i+1;
    i===0 ? classi+=' active':  "";
    let pagination=document.createElement('span');
    pagination.setAttribute('class',classi);
    pagination.innerHTML=i+1;
    blog.pagePositionWrapper.appendChild(pagination);
  }
}
function setIndicatoreAttivo(){
  let indicatori =document.querySelectorAll('span.position');
  indicatori.forEach((indicatore, i) => {
    if(blog.currentPage===i){
      indicatore.setAttribute('class','position active');
    }else{
      indicatore.setAttribute('class','position')
    }
  });

}
