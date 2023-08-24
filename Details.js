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


//------------------------------------------------Form Validations-------------------------------



// Function to validate the name
var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var email2Error = document.getElementById('email2-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

function validateName(){
    var name = document.getElementById("contact-name").value;

    if (name.length == 0){
        nameError.innerHTML = "Name is required";
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = "Write full name";
        return false;
    }
    nameError.innerHTML = '<i class= "fas fa-check-circle"></i>';
    return true;
}
function validatePhone(){
    var phone = document.getElementById('contact-phone').value;
    
    if(phone.length == 0){
        phoneError.innerHTML = "Phone number is required";
        return false
    }
    
}
function validateEmail(){
    var email = document.getElementById('contact-email').value

    if(email.length == 0){
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML='Email Invalid';
        return false;
    }
    emailError.innerHTML = '<i class= "fas fa-check-circle"></i>';
    return true;
}
function ConfirmEmail(){
    var email2 = document.getElementById('contact-email2').value
    var email = document.getElementById('contact-email').value

    if (email2 !== email) {
       email2Error.innerHTML='Emails do not match';
       return false;
}
if (email2.length== 0){
    email2Error.innerHTML='Confirm Email';
    return false;
}
    email2Error.innerHTML='<i class= "fas fa-check-circle"></i>';
    return true;
}
document.addEventListener('DOMContentLoaded', function () {
    const personalInfoForm = document.getElementById('personalInfoForm');

    personalInfoForm.addEventListener('submit', function (event) {
      event.preventDefault();

     

      // Redirect to payment page
      window.location.href = 'Payment.html'; 
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const detailsForm = document.getElementById('personalInfoForm');

    detailsForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const confirmedName = document.getElementById('contact-name').value;
        const confirmedPhone = document.getElementById('contact-phone').value;
        const confirmedEmail = document.getElementById('contact-email').value;

        // Store form values in local storage
        localStorage.setItem("confirmedName", confirmedName);
        localStorage.setItem("confirmedPhone", confirmedPhone);
        localStorage.setItem("confirmedEmail", confirmedEmail);

        // Redirect to the confirmation page
       
    });
});






