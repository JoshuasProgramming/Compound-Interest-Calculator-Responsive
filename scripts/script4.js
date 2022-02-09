const principle = document.getElementById('principle');
const interest = document.getElementById('interest');
const duration = document.getElementById('duration');
const output = document.getElementById('output');

//Grabbing the element which will be used to store the download button later on (for html2pdf)
const download_area = document.getElementById('download_area');


//grabbing the calculate button (btn_)
const btn_ = document.getElementById('btn_');

//checking if the user has entered anything within 'principle input' 
principle.addEventListener("keyup", (e)=>{
    check()
});

//checking if the user has entered anything within 'interest input' 
interest.addEventListener("keyup", (e)=>{
    check()
});

//checking if the user has entered anything within 'duration input' 
duration.addEventListener("keyup", (e)=>{
    check()
});


//Creating a function that will un-disable the calculate button when every input area has a value
//check the 'check' function for details
function unDisableBtn(){
    btn_.classList = [] 
    btn_.classList.add("btn");
    btn_.innerText = "Calculate";
    btn_.disabled = false;
}

//Creating a function that will disable the calculate button when one or more inputs are empty
//check the 'check' function for details
function disabled(){
    btn_.classList = [] 
    btn_.classList.add("disabled");
    btn_.innerHTML = "&#128274";
    btn_.disabled = true;
}

//'check' function will check for if an input area is empty. If it is it will disable the calculate button
// If not, it'll un-disable the calculate button.
function check(){
    if((principle.value == "") || (interest.value == "") || (duration.value == "")){
        disabled();
    } else {
        unDisableBtn();
    }
}

//Once the user presses the calculate button something happens...
btn_.addEventListener("click", (e)=>{

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
            html2canvas: {scale:3},
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