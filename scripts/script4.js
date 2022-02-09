const principle = document.getElementById('principle');
const interest = document.getElementById('interest');
const duration = document.getElementById('duration');
const output = document.getElementById('output');

const download_area = document.getElementById('download_area');

const btn_ = document.getElementById('btn_').addEventListener("click", (e)=>{
    let answer = (principle.value * (1 + ((interest.value / 100) * duration.value)));

    output.value = "£" + answer.toLocaleString('en-US');

    let downloadbtn = document.createElement('div');
    downloadbtn.innerHTML = "<button id='download_btn' class='download-btn'>Download</button>";
    
    download_area.append(downloadbtn);
    document.body.append(download_area);

    const download_btn = document.getElementById('download_btn').addEventListener("click", (e)=>{

        const main = document.getElementById('main');

        let options = {
            margin: [0,-3,0,-3], //top, left, bottom, right, 
            filename: 'SimpleInterest.pdf', //creates the file name
            image: {type: 'jpeg', quality:0.98}, //set the type of file and quality
            html2canvas: {scale:2},
            jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
        }
    
        html2pdf().set(options).from(main).save(); //uploads the 'container_info' to the user's computer.

        document.body.removeChild(downloadbtn); //removes the download button so we don't get duplications if the users calculates again.
    });
});

function toggle(){
    let body_element = document.body;
    body_element.classList.toggle("dark-mode-background");

    //let list_items = document.getElementsByTagName("a");
    //list_items.classList.toggle("hover-link-dark");
    document.linkColor="white";
    //document.getElementsByClassName('main-nav').style.color = "white";
    //links.classList.toggle("hover-link-dark");
}