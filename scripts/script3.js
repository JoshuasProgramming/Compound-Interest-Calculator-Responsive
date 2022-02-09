const principle = document.getElementById('principle');
const interest = document.getElementById('interest');
const duration = document.getElementById('duration');
const output = document.getElementById('output');

//grab monthly id for monthly contributions
const daily = document.getElementById('daily');

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

//checking if the user has entered anything within 'daily input' 
daily.addEventListener("keyup", (e)=>{
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
    if((principle.value == "") || (interest.value == "") || (duration.value == "") || (daily.value == "")){
        disabled();
    } else {
        unDisableBtn();
    }
}




//Once the user presses the calculate button something happens...
btn_.addEventListener("click", (e)=>{

     /**
     * This calculates the future investment value
     * percentage is the interest rate 
     * n is the amount of times the investment compounds per year
     * A1 is the sum of the compound interest formula
     * pmt_v is the compound interest formula minus the yearly contributions, divided by interest rate over compounds per year
     */
    if((daily.value == "") || (daily.value == "0")){
        daily.value = 0;
    }

    let percentage = (interest.value / 100); //8 => 0.08 => 8%
    let n = 365; //365 => compounds 365 time per year (Daily compound interval)
    
    let A1 = (principle.value*(1 + (percentage/n)) ** (n * duration.value));
    let pmt_v = ((daily.value*(1 + (percentage/n)) ** (n * duration.value)) - daily.value) / (percentage/n);

    let A2 = (A1 + pmt_v);
    
    let A3 = A2.toLocaleString("en-US");
    
    output.value = "£" + A3;

    /**
     * Area below turns the html form and future investment value into its own pdf called 'FutureInvestmentValue.pdf'.
     * Step1. Created new div element and appended a button with the id of 'download_btn'.
     * Step2. Created a new constant which gets the 'download_btn' element and adds an event listener.
     * Step3. Once the user triggers the event, the options variable sets the options of the file.
     * Step4. the program then saves it to the user's computer
     */

     let downloadbtn = document.createElement('div');
     downloadbtn.innerHTML = "<button id='download_btn' class='download-btn'>Download</button>";
     
     download_area.append(downloadbtn);
     document.body.append(download_area);
 
     const download_btn = document.getElementById('download_btn').addEventListener("click", (e)=>{
         const main = document.getElementById('main');
 
         let options = {
             margin: [0,-3,0,-3], //top, left, bottom, right, 
             filename: 'FutureInvestmentValue(Daily).pdf', //creates the file name
             image: {type: 'jpeg', quality:0.98}, //set the type of file and quality
             html2canvas: {scale:2},
             jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
         }
     
         html2pdf().set(options).from(main).save(); //uploads the 'main' to the user's computer.
 
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