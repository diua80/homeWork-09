import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    const currentDate = new Date().getTime();
    const selectedDate = selectedDates[0].getTime();

    if (selectedDate <= currentDate) {
      Notify.warning('Please choose a date in the future');
      this.clear();
    }
  },
});

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.getElementById('d'),
    hours: document.getElementById('h'),
    minutes: document.getElementById('m'),
    seconds: document.getElementById('s'),
}

let countdown;

function pad(value) {
  return value.toString().padStart(2, '0');
}

function startTimer() {
  const selectedDate = new Date(flatpickr("#datetime-picker").selectedDates[0]).getTime();
  countdown = setInterval(() => {
    const now = new Date();
    const distance = selectedDate - now;

    if (distance < 0) {
      clearInterval(countdown);
      return;
    }

    const days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));

    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
  }, 1000);
}



refs.startBtn.addEventListener('click', startTimer);