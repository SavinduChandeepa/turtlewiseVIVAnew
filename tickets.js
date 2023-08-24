//---------------------number spinner--------------------//
const SLC = document.getElementById("SLC");
function stepperSLC(btn){
    let id = btn.getAttribute("id");
    let min = SLC.getAttribute("min");
    let max = SLC.getAttribute("max");
    let step = SLC.getAttribute("step");
    let val = SLC.getAttribute("value");
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        SLC.setAttribute("value", newValue);
    }
}

const SLA = document.getElementById("SLA");
function stepperSLA(btn){
    let id = btn.getAttribute("id");
    let min = SLA.getAttribute("min");
    let max = SLA.getAttribute("max");
    let step = SLA.getAttribute("step");
    let val = SLA.getAttribute("value");
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        SLA.setAttribute("value", newValue);
    }
}
const FC = document.getElementById("FC");
function stepperFC(btn){
    let id = btn.getAttribute("id");
    let min = FC.getAttribute("min");
    let max = FC.getAttribute("max");
    let step = FC.getAttribute("step");
    let val = FC.getAttribute("value");
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        FC.setAttribute("value", newValue);
    }
}
const FA = document.getElementById("FA");
function stepperFA(btn){
    let id = btn.getAttribute("id");
    let min = FA.getAttribute("min");
    let max = FA.getAttribute("max");
    let step = FA.getAttribute("step");
    let val = FA.getAttribute("value");
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        FA.setAttribute("value", newValue);
    }
}
const INF = document.getElementById("INF");
function stepperINF(btn){
    let id = btn.getAttribute("id");
    let min = INF.getAttribute("min");
    let max = INF.getAttribute("max");
    let step = INF.getAttribute("step");
    let val = INF.getAttribute("value");
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        INF.setAttribute("value", newValue);
    }
}


//---------------------duration dropdown------------------//



//--------------------------------Summary table--------------------------------------------//
document.getElementById("chosen-date").innerHTML=reservation-id;
document.getElementById("list").innerHTML=time;






///add the values into the table
document.getElementById('chosenDateTable').innerHTML = chosenDate; 
document.getElementById('selectedTimeSlot').innerHTML = selectedTimeSlots.join(", "); //  array elements into a string
document.getElementById('totalnumhrs').innerHTML = startHour + " to " + endHour ;
document.getElementById('durationfull').innerHTML = totalHrs+" hour/s("+normalCount + " normal hour/s, " + peakCount + " peak hour/s)";

//this add how many guests are coming
document.getElementById('slAdultSummary').innerHTML = numlocalAdultTickets+" Sl adult";
document.getElementById('slChildSummary').innerHTML = numlocalChildTickets +" Sl child";
document.getElementById('fAdultSummary').innerHTML = numfAdultTickets+" foreigner adult";
document.getElementById('fChildSummary').innerHTML = numfChildTickets+" foreigner child";
document.getElementById('infantSummary').innerHTML = numinfantTickets+" infant";
//this add how much it is for each category 
document.getElementById('slAdultSummaryPrice').innerHTML = "$"+totalCostLocalAdult;
document.getElementById('slChildSummaryPrice').innerHTML = "$"+totalCostLocalChild ;
document.getElementById('fAdultSummaryPrice').innerHTML = "$"+totalCostFAdult;
document.getElementById('fChildSummaryPrice').innerHTML = "$"+totalCostFChild;
document.getElementById('infantSummaryPrice').innerHTML = "$"+totalCostinfant;

//to show the button after all the of the summary table has been correctly filled:
if (numlocalAdultTickets > 0 || numlocalChildTickets > 0 || numfAdultTickets > 0 || numfChildTickets > 0 || numinfantTickets > 0) {
  document.querySelector('.my-button').style.display = 'block';
}

//add a f#^k*ng event listener to everything please
document.getElementById("ticketsForm").addEventListener("submit", function(event) {
  event.preventDefault();
  calculateTotalAmount();
});

document.getElementById("timeSlots").addEventListener("change", function() {
  document.getElementById("ticketsForm").dispatchEvent(new Event('submit'));
});

["timeSlots", "sl-adult", "sl-child", "f-adult", "f-child", "infant"].forEach(function(id) {
  document.getElementById(id).addEventListener("change", function() {
      document.getElementById("ticketsForm").dispatchEvent(new Event('submit'));
  });
});
