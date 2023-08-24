document.querySelector('.card-number-input').oninput = () =>{
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () =>{
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}


document.addEventListener('DOMContentLoaded', function () {
    // Retrieve total price from the summary table
    const totalPrice = parseFloat(document.getElementById('chargeSummary').innerText);

    // Set the "Pay" button text
    const payButton = document.querySelector('.submit-btn');
    payButton.value = `Pay $${totalCharge}`;

  
  });
  document.addEventListener('DOMContentLoaded', function () {
    // Add submit event listener to the form
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Redirect to the confirmation page
        window.location.href =  'Confirmation.html'; // Replace with your confirmation page URL
    });
  });


  







  const normalHours = ["7.00am-8.00am", "8.00am-9.00am", "9.00am-10.00am", "1.00pm-2.00pm", "2.00pm-3.00pm"];
const peakHours = ["10.00am-11.00am", "11.00am-12.00pm", "12.00pm-1.00pm", "3.00pm-4.00pm", "4.00pm-5.00pm", "5.00pm-6.00pm"];

const timeSCheckboxes = document.querySelectorAll('.timeS');
const timeSlotSelectionDisplay = document.getElementById('timeSlotSelection');
const VisitDurationDisplay = document.getElementById('VisitDuration');
const slcTicketDisplay = document.getElementById('LankanChildTicket');
const slaTicketDisplay = document.getElementById('LankanAdultTicket');
const fcTicketDisplay = document.getElementById('ForeignChildTicket');
const faTicketDisplay = document.getElementById('ForeignAdultTicket');
const infantTicketDisplay = document.getElementById('InfantTicket');
const slcChargeDisplay = document.getElementById('LankanChildCharge');
const slaChargeDisplay = document.getElementById('LankanAdultCharge');
const fcChargeDisplay = document.getElementById('ForeignChildCharge');
const faChargeDisplay = document.getElementById('ForeignAdultCharge');
const infantChargeDisplay = document.getElementById('InfantCharge');
const PriceSummaryDisplay = document.getElementById('PriceSummary');
const DateSelectedDisplay = document.getElementById('DateSelected');
const reservationDateInput = document.getElementById('reservation-id');


// Retrieve data from local storage
const DateSelected = localStorage.getItem("DateSelected");
const selectedTimeS = JSON.parse(localStorage.getItem("selectedTimeS"));
const LankanChildAmount = parseInt(localStorage.getItem("LankanChildAmount"));
const LankanAdultAmount = parseInt(localStorage.getItem("LankanAdultAmount"));
const ForeignChildAmount = parseInt(localStorage.getItem("ForeignChildAmount"));
const ForeignAdultAmount = parseInt(localStorage.getItem("ForeignAdultAmount"));
const InfantAmount = parseInt(localStorage.getItem("InfantAmount"));

// Update displayed values with retrieved data
DateSelectedDisplay.textContent = DateSelected;
timeSlotSelectionDisplay.textContent = selectedTimeS ? getFormattedTimeRange(selectedTimeS) : '---';
const normalHourCount = selectedTimeS ? selectedTimeS.filter(slot => normalHours.includes(slot)).length : 0;
const peakHourCount = selectedTimeS ? selectedTimeS.filter(slot => peakHours.includes(slot)).length : 0;
VisitDurationDisplay.textContent = `${selectedTimeS ? selectedTimeS.length : 0}hrs (${normalHourCount} normal : ${peakHourCount} peak)`;

slcTicketDisplay.textContent = LankanChildAmount;
slaTicketDisplay.textContent = LankanAdultAmount;
fcTicketDisplay.textContent = ForeignChildAmount;
faTicketDisplay.textContent = ForeignAdultAmount;
infantTicketDisplay.textContent = InfantAmount;

// Calculate charges
let totalCharge = 0;
totalCharge += (LankanChildAmount * (normalHourCount * 2 + peakHourCount * 3));
totalCharge += (LankanAdultAmount * (normalHourCount * 4 + peakHourCount * 6));
totalCharge += (ForeignChildAmount * (normalHourCount * 5 + peakHourCount * 8));
totalCharge += (ForeignAdultAmount * (normalHourCount * 10 + peakHourCount * 13));
// Infant charges are always 0

// Update charge displays
slcChargeDisplay.textContent = LankanChildAmount * (normalHourCount * 2 + peakHourCount * 3);
slaChargeDisplay.textContent = LankanAdultAmount * (normalHourCount * 4 + peakHourCount * 6);
fcChargeDisplay.textContent = ForeignChildAmount * (normalHourCount * 5 + peakHourCount * 8);
faChargeDisplay.textContent = ForeignAdultAmount * (normalHourCount * 10 + peakHourCount * 13);
infantChargeDisplay.textContent = 0; // Infants are free

PriceSummaryDisplay.textContent = ` ${totalCharge} USD`;

// Function to format time range
function getFormattedTimeRange(timeSlots) {
const Time1 = timeSlots[0].split('-')[0];
const Time2 = timeSlots[timeSlots.length - 1].split('-')[1];
return `${Time1} - ${Time2}`;
}

function updateDateSelected() {
const DateSelected = reservationDateInput.value;
DateSelectedDisplay.textContent = DateSelected;
}