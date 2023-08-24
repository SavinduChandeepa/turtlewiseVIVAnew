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


const ticketAmounts = {
  'LankanChild': 0,
  'LankanAdult': 0,
  'ForeignChild': 0,
  'ForeignAdult': 0,
  'Infant': 0
};

const ticketPrices = {
  'LankanChild': {'normal': 2, 'peak': 3},
  'LankanAdult': {'normal': 4, 'peak': 6},
  'ForeignChild': {'normal': 5, 'peak': 8},
  'ForeignAdult': {'normal': 10, 'peak': 13},
  'Infant': {'normal': 0, 'peak': 0}
};

function stepperSLC(step) {
  const input = document.getElementById('SLC');
  input.value = Math.max(parseInt(input.value) + step, 0);
  updateTicketSummary();
}

function stepperSLA(step) {
  const input = document.getElementById('SLA');
  input.value = Math.max(parseInt(input.value) + step, 0);
  updateTicketSummary();
}

function stepperFC(step) {
  const input = document.getElementById('FC');
  input.value = Math.max(parseInt(input.value) + step, 0);
  updateTicketSummary();
}

function stepperFA(step) {
  const input = document.getElementById('FA');
  input.value = Math.max(parseInt(input.value) + step, 0);
  updateTicketSummary();
}

function stepperInf(step) {
  const input = document.getElementById('inf');
  input.value = Math.max(parseInt(input.value) + step, 0);
  updateTicketSummary();
}

function updateTicketSummary() {
  ticketAmounts['LankanChild'] = parseInt(document.getElementById('SLC').value);
  ticketAmounts['LankanAdult'] = parseInt(document.getElementById('SLA').value);
  ticketAmounts['ForeignChild'] = parseInt(document.getElementById('FC').value);
  ticketAmounts['ForeignAdult'] = parseInt(document.getElementById('FA').value);
  ticketAmounts['Infant'] = parseInt(document.getElementById('inf').value);

  slcTicketDisplay.textContent = ticketAmounts['LankanChild'];
  slaTicketDisplay.textContent = ticketAmounts['LankanAdult'];
  fcTicketDisplay.textContent = ticketAmounts['ForeignChild'];
  faTicketDisplay.textContent = ticketAmounts['ForeignAdult'];
  infantTicketDisplay.textContent = ticketAmounts['Infant'];

  updateSummary();
}

function updateSummary() {
  const selectedTimeS = Array.from(timeSCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const Time1 = selectedTimeS.length > 0 ? selectedTimeS[0].split('-')[0] : '---';
  const Time2= selectedTimeS.length > 0 ? selectedTimeS[selectedTimeS.length - 1].split('-')[1] : '---';

  timeSlotSelectionDisplay.textContent = `${Time1} - ${Time2}`;

  const normalHoursCount = selectedTimeS.filter(slot => normalHours.includes(slot)).length;
  const peakHoursCount = selectedTimeS.filter(slot => peakHours.includes(slot)).length;

  VisitDurationDisplay.textContent = `${selectedTimeS.length}hrs (${normalHoursCount} normal : ${peakHoursCount} peak)`;

  let totalCharge = 0;

  for (const ticketType in ticketAmounts) {
    const Amount = ticketAmounts[ticketType];

    const normalPrice = ticketPrices[ticketType]['normal'];
    const peakPrice = ticketPrices[ticketType]['peak'];
    const ticketCharge = (normalPrice * normalHoursCount + peakPrice * peakHoursCount) * Amount;
    totalCharge += ticketCharge;

    // Update charge displays for each category
    document.getElementById(`${ticketType}Charge`).textContent = ticketCharge;
  }

  PriceSummaryDisplay.textContent = `  ${totalCharge} USD`;
  LocalStorageUpdate(); // Update local storage with the latest data
}

function updateDateSelected() {
  const DateSelected = reservationDateInput.value;
  DateSelectedDisplay.textContent = DateSelected;
  updateSummary();
}

// Initialize the selected date and update summary
updateDateSelected();

// Function to update the local storage with user inputs
function LocalStorageUpdate() {
  const DateSelected = reservationDateInput.value;
  const selectedTimeS = Array.from(timeSCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  const LankanChildAmount = parseInt(document.getElementById('SLC').value);
  const LankanAdultAmount = parseInt(document.getElementById('SLA').value);
  const ForeignChildAmount = parseInt(document.getElementById('FC').value);
  const ForeignAdultAmount = parseInt(document.getElementById('FA').value);
  const InfantAmount = parseInt(document.getElementById('inf').value);

  // Store the data in local storage
  localStorage.setItem("DateSelected", DateSelected);
  localStorage.setItem("selectedTimeS", JSON.stringify(selectedTimeS));
  localStorage.setItem("LankanChildAmount", LankanChildAmount);
  localStorage.setItem("LankanAdultAmount", LankanAdultAmount);
  localStorage.setItem("ForeignChildAmount", ForeignChildAmount);
  localStorage.setItem("ForeignAdultAmount", ForeignAdultAmount);
  localStorage.setItem("InfantAmount", InfantAmount);
}

// Call the LocalStorageUpdate function whenever user actions are taken (e.g., checkbox changes)
timeSCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', LocalStorageUpdate);
});

// Call the LocalStorageUpdate function when the user changes ticket quantities
document.getElementById('SLC').addEventListener('change', LocalStorageUpdate);
document.getElementById('SLA').addEventListener('change', LocalStorageUpdate);
document.getElementById('FC').addEventListener('change', LocalStorageUpdate);
document.getElementById('FA').addEventListener('change', LocalStorageUpdate);
document.getElementById('inf').addEventListener('change', LocalStorageUpdate);

// Retrieve stored summary table HTML from local storage on page load
const storedSummaryTableHTML = localStorage.getItem("summaryTableHTML");
if (storedSummaryTableHTML) {
  document.getElementById("summary").innerHTML = storedSummaryTableHTML;
}

const storedSummaryTableStore = localStorage.getItem("SummaryTableStore");
if (storedSummaryTableStore) {
  document.getElementById("summary-table-22").innerHTML = storedSummaryTableStore;
}
// Update the 'Time' and 'Duration' fields based on selected checkboxes
function updateTimeAndDuration() {
  const selectedTimeS = Array.from(timeSCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const Time1 = selectedTimeS.length > 0 ? selectedTimeS[0].split('-')[0] : '---';
  const Time2 = selectedTimeS.length > 0 ? selectedTimeS[selectedTimeS.length - 1].split('-')[1] : '---';

  timeSlotSelectionDisplay.textContent = `${Time1} - ${Time2}`;

  const normalHoursCount = selectedTimeS.filter(slot => normalHours.includes(slot)).length;
  const peakHoursCount = selectedTimeS.filter(slot => peakHours.includes(slot)).length;

  VisitDurationDisplay.textContent = `${selectedTimeS.length}hrs (${normalHoursCount} normal : ${peakHoursCount} peak)`;

  updateSummary();
}

// Update the summary when checkboxes are clicked
timeSCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateTimeAndDuration);
});

