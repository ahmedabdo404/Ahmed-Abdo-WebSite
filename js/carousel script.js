//#region catch elements
let nextBtn = document.getElementById("next")
let prevBtn = document.getElementById("prev")
let indecators = document.getElementById("indecators")
let ulElement = document.createElement("ul");
ulElement.setAttribute("id", "pagination")
// window.onload = () => {let pagination = document.querySelector("#pagination")};
//#endregion


//#region variables
let imgs = Array.from(document.querySelectorAll(".img-container img"));
let slidesCount = imgs.length;
let curSlide = 1;
//#endregion


//#region indecators
for (let index = 1; index <= slidesCount; index++) {
    let liElement = document.createElement("li");
    ulElement.appendChild(liElement);
}
indecators.appendChild(ulElement);
//#endregion


//#region pagination

function changeClass(){
    RemoveClass()
    imgs[curSlide-1].classList.add("active");
    pagination.children[curSlide-1].classList.add("active")
}
// firing the function to start showing images
changeClass()
//#endregion


//#region buttons
nextBtn.onclick = next;
prevBtn.onclick = prev;
// li clicks
for (let i = 0; i < slidesCount; i++) {
    pagination.children[i].onclick = () => {
        curSlide = i + 1;
        changeClass()
    }
}
//#endregion


//#region functions
function RemoveClass(){
    imgs.forEach((e)=> e.classList.remove("active"));

    for(let e of pagination.children)
        e.classList.remove("active");
}

function next(){
    if(curSlide == slidesCount)
        curSlide = 0;
    curSlide++;
    changeClass()
}

function prev(){
    if(curSlide == 1)
        curSlide = slidesCount+1;

    curSlide--;
    changeClass()
}
//#endregion

//#region change image interval
setInterval(next, 5000);
//#endregion