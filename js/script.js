//#region Vars
let year = document.getElementById("year");
let GetDate = new Date()

let AnimationInnerHeader = document.querySelector("#animation .inner-header")
let AnimationWaves = document.querySelector("#animation .waves")
let InfoDiv = document.querySelector("#info")

let upBtn = document.querySelector(".back-top")
//#endregion 


//#region Methods
year.innerText = GetDate.getFullYear()

function ReSizeAnmationHeight() {
  AnimationInnerHeader.style.height = `calc(${InfoDiv.offsetHeight}px - ${AnimationWaves.clientHeight}px)`
}
//#endregion 


//#region Events
window.onresize = ReSizeAnmationHeight
window.onload = ReSizeAnmationHeight
window.onscroll = () => {
  // console.log(window.scrollY)
  if(window.scrollY >= 650){
      upBtn.style = ("opacity: 1;")
  }else{
      upBtn.style = ("opacity: 0;")
  }
}
upBtn.onclick = () =>{
  scrollTo({ top: 0, behavior: "smooth"});
}
//#endregion 