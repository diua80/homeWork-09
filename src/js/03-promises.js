import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  submitButton: document.querySelector('button[type="submit"]'),
}

refs.form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  
  let delay = parseInt(refs.delayInput.value);
  const step = parseInt(refs.stepInput.value);
  const amount = parseInt(refs.amountInput.value);
  
  const promises = createPromises(amount, delay, step);

  Promise.all(promises.map((promise, index) => {
    return promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }))
    // .catch(error => {
    //   console.error('Error:', error);
    // });
}

function createPromises(amount, delay, step) {
  const promises = [];
  // let delay = initialDelay;
  
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promise = createPromise(position, delay);
    promises.push(promise);
    delay += step;
  }
  
  return promises;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}