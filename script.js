const colors = ['#CBE4F9', '#CDF5F6', '#EFF9DA', '#F9EBDF', '#F9D8D6', '#F9D8D6'];
let array = [];

let p_grande;
let sfocatura;
let popup;


function init() {      
    fetch("http://chiacchiere.figliolo.it/php/getData.php")
        .then(response => response.json())
        .then(data => {
            array = data;
            loadPost(data.reverse());
        });

    p_grande = document.getElementById("post_grande");
    sfocatura= document.getElementById("sfocatura");
    popup = document.getElementById("popup");

    if(!foundCookie("first")) {
        const popIngresso = document.getElementById("popup_ingresso");
        popIngresso.style.visibility = "visible";
        
        sfocatura.classList.add("sfocatura_on");

        var scadenza = new Date();
        scadenza.setDate(scadenza.getDate() + 9999); // Scadenza tra 7 giorni
        document.cookie = "first=1; expires=" + scadenza.toUTCString();
        //console.log(scadenza.toUTCString());
    }
}


function foundCookie(name) {

    const cookies = document.cookie.split(';');
    
    for(var i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if(cookie.indexOf(name+"=") === 0) {
            //const valCookie = cookie.substring((name+"=").length, cookie.length);
            //console.log("Valore del cookie: " + valCookie);
            return true;
        }
    }
    return false;
}


function loadPost(data) {
    for(let i=0; i<data.length; i++){
        createPostIt(data[i].testo, data[i].id, data[i].color);
    }
}


function createPostIt(testo,id, color) {
    id="post_"+id;
    console.log(id);

    cont = document.createElement("div");
    cont.className = "contenitore";

    ombra=document.createElement("div");
    ombra.className="ombra";

    quad=document.createElement("div");
    quad.className="quadrato";
    quad.onclick = () => openPost(id);

    p=document.createElement("p");
    p.innerHTML=testo;
    p.className="testo";
    p.id=id;
    quad.style.backgroundColor = ("#"+color);

    console.log("Colore: "+color);

    quad.appendChild(p);
    cont.appendChild(quad);
    cont.appendChild(ombra);

    container = document.getElementById("container");
    container.appendChild(cont); 
}

function openPost(id) {
    console.log(id);
    p_grande.classList.add("post_grande_visibile");
    sfocatura.classList.add("sfocatura_on");

    const par = document.getElementById(id);
    testo = par.innerHTML;

    let col;
    for (let i = 0; i < array.length; i++) {
        if(testo==array[i].testo){
            col=array[i].color;
        }
    }

    console.log(col);
    
    story = document.getElementById("story");

    /*p_grande.style.backgroundColor=fromStringToColor(testo);*/

    p_grande.style.backgroundColor=("#"+col);

    story.innerHTML = testo;
}

function closePost() {
    p_grande.classList.remove("post_grande_visibile");
    sfocatura.classList.remove("sfocatura_on");
}

function getRandomColor() {
    return colori[Math.floor(Math.random() * colori.length)];
}

//finestra per inserire una storia
//-----------------------------------------------------------------------------------------------
function openPopup() {
    //console.log("Cliccato");
    cont_popup_storia.classList.add("openpopup");
    sfocatura.classList.add("sfocatura_on");
}

function closePopup() {
    cont_popup_storia.classList.remove("openpopup");
    sfocatura.classList.remove("sfocatura_on");
}

function inviaStoria() {
    input = document.getElementById("storia");
    pippo = document.getElementById("pippo");

    storia = input.value;
    //pippo.innerHTML = storia;
    //console.log(tx);
    createPostIt(storia);
    closePopup();
    //document.getElementById("storia").value = "";
}

//finstra per le info
//-----------------------------------------------------------------------------------------------
function openInfo() {
    closeAll();
    info.classList.add("openinfo");
    sfocatura.classList.add("sfocatura_on");
}

function closeInfo() {
    info.classList.remove("openinfo");
    sfocatura.classList.remove("sfocatura_on");
}


function closeAll() {
    p_grande.classList.remove("post_grande_visibile");
    cont_popup_storia.classList.remove("openpopup");
    info.classList.remove("openinfo");
    sfocatura.classList.remove("sfocatura_on");
    popup_ingresso.classList.add("close_popup_ingresso")
    document.getElementById("storia").value="";
}

//----------------------------------------------------------------------------------------------------------------------------------


const fromStringToColor= (s)=>{
    const ris = s.split("").map((ch)=>ch.charCodeAt(0));

    const somma = ris.reduce((somma, ele)=>{return somma+ele}, 0);

    const index=(s.length+somma)%colors.length;

    return colors[index];
};

function change_color(color){
    colore = document.getElementById("colore");
    colore.value = color;
    storia = document.getElementById("storia");
    storia.style.backgroundColor = colors[color];
    //document.querySelectorAll("scelta_colore").classList.remove("scelta_colore_on");
    

    for (let i = 0; i < 6; i++) {
        const but = document.getElementById("butt_"+i);
        but.classList.remove("scelta_colore_on");

        if (color==i){
            but.classList.add("scelta_colore_on");
        }
    }

}
