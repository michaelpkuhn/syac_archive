


document.getElementById("submit")
    .addEventListener("click", validateIt);


function archiveIt(url){
    console.log(url)
}


function validateIt(e){
    console.log(e);
    let url = document.getElementById("url").value;
    console.log(url);
   if(isValidHttpUrl(url)){
        archiveIt(url)
   } else {
       console.log("invalid url: ", url)
   }
}



function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }