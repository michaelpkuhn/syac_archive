


// document.getElementById("submit")
//     .addEventListener("click", submitIt);

    
document.getElementById("form")
    .addEventListener("submit", submitIt);

// console.log("test")
const output = () => 
    document.getElementById("output").children[0];
console.log(output())
// output().innerHTML = "test"


function submitIt(e){
    e.preventDefault();
    let input = document.getElementById("url")
    let url = input.value;
    input.value = "";
    console.log(url);
    archiveIt(url)
}

async function archiveIt(url){
    let snapshots;

    checkAvail(url)
        .then((respJson) => {
            if (respJson == '') {
                output().innerHTML = "An Error Has Occured";
            } else {

                console.log(respJson)
                console.log(respJson.archived_snapshots)
            }
        })
}

async function checkAvail(url = "") {
    let aurl = "https://archive.org/wayback/available?url="

    // let rsp
    console.log('furl', aurl+url)

    fetch(url)

    return fetch(aurl + url)
        .then((resp) => {
            if (resp.ok){
                return resp.json()
            }
            throw new Error(resp)
        })
        // .then((respJson) => {rsp = respJson})
        .catch((error) => {
            console.log("error", error)
            return ''
        });
    
    
    // console.log('rsp', rsp)
    
    // return rsp
}

function saveIt(url){
    console.log('save ', url)
}