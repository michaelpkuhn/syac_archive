


document.getElementById("submit")
    .addEventListener("click", submitIt);
console.log("test")

function submitIt(e){
    let url = document.getElementById("url").value;
    console.log(url);
    archiveIt(url)
}

async function archiveIt(url){
    let snapshots;

    await checkAvail(url)
        .then((rsp)=>{rsp.archived_snapshots})
        .then((result)=>{
            console.log(rsp, result)
            snapshots = result
            if(snapshots == {}){
                saveIt(url)
            } else {
                console.log(snapshots.closest.url)
            }
        })
        .catch((error) => console.log("error", error))
}

async function checkAvail(url = "") {
    let aurl = "https://archive.org/wayback/available?url="

    let rsp

    const response = await fetch(aurl + url)
        .then((data) => {rsp = data.json()})
        .catch((error) => console.log("error", error));
    
    
    console.log(rsp)
    
    return rsp
}

function saveIt(url){
    console.log('save ', url)
}