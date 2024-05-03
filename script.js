const colori = ['#b25825', '#60773d', '#b8d8d8', '#d88715', '#ffe28c', '#2'];
//              arancionino, verdognolo, azzurrino, ocra, postit, 

let p_grande;
let sfocatura;
let popup;


function init() {  
    fetch("http://chiacchiere.figliolo.it/php/getData.php")
        .then(response => response.json())
        .then(data => {
            loadPost(data);
        });

    p_grande = document.getElementById("post_grande");
    sfocatura= document.getElementById("sfocatura");
    popup = document.getElementById("popup");
}

function loadPost(data) {
    for(let i=0; i<data.length; i++){
        createPostIt(data[i].testo,i);
    }
    setColor();
}


function setColor() {
    document.querySelectorAll('.quadrato').forEach( element => {
        element.style.backgroundColor = getRandomColor();
    });
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

    quad.appendChild(p);
    ombra.appendChild(quad);
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
    info.classList.add("openinfo");
    sfocatura.classList.add("sfocatura_on");
}

function closeInfo() {
    info.classList.remove("openinfo");
    sfocatura.classList.remove("sfocatura_on");
}



//----------------------------------------------------------------------------------------------------------------------------------