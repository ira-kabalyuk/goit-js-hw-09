import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.button.addEventListener('click', timer);

const ERROR_MESSAGE = 'Please choose a date in the future';

refs.button.setAttribute('disabled', '');

let selectDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    const oldDateCheck = selectedDates[0] - instance.now;
    if (oldDateCheck <= 0) {
      return alert(ERROR_MESSAGE);
    }
    refs.button.removeAttribute('disabled');
    selectDate = selectedDates[0];
  },
};

flatpickr("#datetime-picker", options);

let inrervalId = null;

function timer() {
  if (Date.parse(selectDate) > Date.now()) {
    inrervalId = setInterval(() => {
      const timeDifference = Date.parse(selectDate) - Date.now();
      const {days, hours, minutes, seconds} = convertMs(timeDifference)
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }, 1000);
    refs.button.setAttribute('disabled', '');
  }
  else {
    clearInterval(inrervalId);
  }
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

