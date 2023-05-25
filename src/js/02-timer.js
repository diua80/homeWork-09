import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
//   defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  console.log(selectedDates[0]);
//   
    },
});

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.getElementById('d'),
    hours: document.getElementById('h'),
    minutes: document.getElementById('m'),
    seconds: document.getElementById('s'),
}

const datePicker = document.getElementById('datetime-picker');
let countdown;



datePicker.addEventListener('change', updateStartButtonState);
updateStartButtonState();
function updateStartButtonState() {
    
    const currentDate = new Date().getTime();

    const selectedDate = new Date(datePicker.value).getTime();

    if (selectedDate <= currentDate) {
        Notify.warning('Please choose a date in the future');
        refs.startBtn.disabled = true;
    } else {
        refs.startBtn.disabled = false;
        }
}

function startTimer () {
    const selectedDate = new Date(datePicker.value).getTime();
    countdown = setInterval(() => {
        const now = new Date();
        const distance = selectedDate - now;
    
        if (distance < 0) {
            clearInterval(countdown);
            return;
        }
    
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;
    }, 1000);
}

refs.startBtn.addEventListener('click', startTimer);