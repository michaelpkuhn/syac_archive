    
document.getElementById("form")
    .addEventListener("submit", submitIt);

const output = document.getElementById("output").children[0]

function submitIt(e){
    e.preventDefault();
    let input = document.getElementById("url")
    let url = input.value;
    input.value = "";
    output.innerHTML = ""
    console.log(url);
    archiveIt(url)
}

async function archiveIt(url){

    try {
        await fetch(url, {
            mode: 'no-cors'
        });
        
        checkAvail(url)
            .then((respJson) => {
                console.log(respJson)
                let snp = respJson.archived_snapshots
                let link = document.createElement("a");
                link.target = "_blank"
                link.rel = "noreferrer"

                if (snp.hasOwnProperty("closest")) {
                    link.href = snp.closest.url;
                    link.innerText = link.href;
                    outputMsg = "That URL is archived. Here is the most recent archive URL: <br>";                    
                } else {
                    link.href = "https://web.archive.org/save/" + url;
                    link.innerText = link.href
                    outputMsg = "That URL is not archived. Please archive it using the link below: <br> <em>Note: archive.org may be overloaded, in that case try archive.is</em><br><br>";
                    let isLink = document.createElement("a");
                    isLink.href = "https://archive.is"
                    isLink.innerHTML = "<br><br>" + isLink.href

                    link.appendChild(isLink)
                }
                output.innerHTML = outputMsg;
                output.appendChild(link);
            })
    } catch (e) {
        console.log(e)
        errMsg = "An error has occurred, unable to process: " + url;
        output.innerHTML = errMsg;
    }
    
}

async function checkAvail(url = "") {
    let aurl = "https://archive.org/wayback/available?url="
    console.log('furl', aurl+url)

    return fetch(aurl + url)
        .then((resp) => {
            if (resp.ok){
                return resp.json()
            }
            throw new Error(resp)
        });
}
