const colors = ['#CBE4F9', '#CDF5F6', '#EFF9DA', '#F9EBDF', '#F9D8D6', '#D6CDEA'];


let p_grande;
let sfocatura;
let popup;


function init() {  
    fetch("http://chiacchiere.figliolo.it/php/getData.php")
        .then(response => response.json())
        .then(data => {
            loadPost(data.reverse());
        });

    p_grande = document.getElementById("post_grande");
    sfocatura= document.getElementById("sfocatura");
    popup = document.getElementById("popup");
}

function loadPost(data) {
    for(let i=0; i<data.length; i++){
        createPostIt(data[i].testo,i);
    }
}


function createPostIt(testo,id) {
    id="post_"+id;

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
    quad.style.backgroundColor = fromStringToColor(testo);

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
    testo = document.getElementById(id).innerHTML;
    story = document.getElementById("story");
    story.innerHTML = testo;
}

function closePost() {
    p_grande.classList.remove("post_grande_visibile");
    sfocatura.classList.remove("sfocatura_on");
}





function getRandomColor() {
    return colori[Math.floor(Math.random() * colori.length)];
}




//--prove Luca--
//----------------------------------------------------------------------------------------------------------------------------------


//finestra per inserire una storia
//-----------------------------------------------------------------------------------------------



function openPopup() {
    //console.log("Cliccato");
    popup.classList.add("openpopup");
    sfocatura.classList.add("sfocatura_on");
}

function closePopup() {
    popup.classList.remove("openpopup");
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
    popup.classList.remove("openpopup");
    info.classList.remove("openinfo");
    sfocatura.classList.remove("sfocatura_on");
}

//----------------------------------------------------------------------------------------------------------------------------------

function onchangeInpt(e) {
    console.log(e);
}

const fromStringToColor= (s)=>{
    const ris = s.split("").map((ch)=>ch.charCodeAt(0));

    const somma = ris.reduce((somma, ele)=>{return somma+ele}, 0);

    const index=(s.length+somma)%colors.length;

    return colors[index];
};

addEventListener("input", (event) => {console.log(event)});