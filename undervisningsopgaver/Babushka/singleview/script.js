document.addEventListener("DOMContentLoaded", getJson);


/*variablen skal kaldes uden for functionen for ikke at nulstille*/
let filter = "all";

async function getJson() {
    console.log("Dom er loaded");
    const jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json&fbclid=IwAR2t7vutuUa-MLP-b4wahlRwAZ-JJ91RbXZjYBWXm-EtKVslXEL7Yi4nwzM");
    console.log("jsonData", jsonData);


    menu = await jsonData.json();
    console.log("menu");
    showDish();
    addEventlistenersToButtons();
}


function showDish() {

    const list = document.querySelector(".list");
    const temp = document.querySelector("template");
    list.innerHTML = "";

    menu.feed.entry.forEach((dish) => {


        if (filter == "all" || filter == dish.gsx$kategori.$t) {

            const klon = temp.cloneNode(true).content;

            klon.querySelector("img").src = `imgs/small/${dish.gsx$billede.$t}-sm.jpg`;
            klon.querySelector("h2").textContent = dish.gsx$navn.$t;
            klon.querySelector(".short").textContent = dish.gsx$kort.$t;
            klon.querySelector(".price").textContent = `Pris: ${dish.gsx$pris.$t} kr`;

            list.appendChild(klon);


            list.lastElementChild.addEventListener("click", () => {
                location.href = `moreindex.html?singleDish=${dish.gsx$id.$t}`;
            });

        }
    })

}



function addEventlistenersToButtons() {
    console.log("addEventlistener loaded");
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtering);
    })
}

function filtering() {
    console.log("filtering loaded");
    filter = this.dataset.kategori;

    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("selected");
    })

    this.classList.add("selected");


    console.log(filter);
    showDish();
}
