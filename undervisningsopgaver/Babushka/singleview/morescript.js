const urlParams = new URLSearchParams(window.location.search);


/*singleDish kommer fra det andet script dokument script.js, der hvor vi linker over til den nye side */
const id = urlParams.get("singleDish");
console.log(id);

let menu;

const url = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json&fbclid=IwAR2t7vutuUa-MLP-b4wahlRwAZ-JJ91RbXZjYBWXm-EtKVslXEL7Yi4nwzM"

document.addEventListener("DOMContentLoaded", getJson);



async function getJson() {
    const jsonData = await fetch(url);
    console.log("jsonData", jsonData);
    menu = await jsonData.json();
    viewDish();


}

function viewDish() {
    console.log("view dish", menu);



    menu.feed.entry.forEach((dish) => {

        console.log(dish.gsx$id.$t);
        if (dish.gsx$id.$t == id) {
            console.log(dish);
            document.querySelector("#view img").src = `imgs/large/${dish.gsx$billede.$t}.jpg`;
            document.querySelector("#view h2").textContent = dish.gsx$navn.$t;
            document.querySelector("#view .short").textContent = dish.gsx$kort.$t;
            document.querySelector("#view .price").textContent = `Pris: ${dish.gsx$pris.$t} kr`;
            document.querySelector("#view .long").textContent = dish.gsx$lang.$t;


        }
    })

}
document.querySelector(".close").addEventListener("click", () => {
    history.back();
});
