form = document.querySelector('form');

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const amount = event.currentTarget.elements.amount.value;
  const delayInput = event.currentTarget.elements.delay.value;
  const step = event.currentTarget.elements.step.value;

   
  for (let position = 0; position < amount; position += 1) {
    let delay = +delayInput;
    const time = (+step*position);
    delay += time;
    createPromise(position, delay)
      .then(({ position, delay }) => {console.log(`✅ Fulfilled promise ${position+1} in ${delay}ms`)})
      .catch(({ position, delay }) => {console.log(`❌ Rejected promise ${position+1} in ${delay}ms`)});
  }
});


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay);
   
  }); 
};

