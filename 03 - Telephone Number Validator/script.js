const userInput = document.getElementById('user-input');
const results = document.getElementById('results-div');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');

const regex = /^(?:\+?1\s?)?(?:\((\d{3})\)|(\d{3}))?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const alertMsg = 'Please provide a phone number';

const isUS = (phoneNumber) => regex.test(phoneNumber);


checkBtn.addEventListener('click', () => {
  if (userInput.value === '') {
    alert(alertMsg);
    return;
  }

  const value = userInput.value;
  const match = isUS(value);
  const span = document.createElement('span');

  if (!match || value.length < 10) {
    span.classList.add('is-us-false');
    span.innerText = `Invalid US number: ${value}`
    results.appendChild(span);
  } else {
    span.classList.add('is-us-true');
    span.innerText = `Valid US number: ${value}`
    results.appendChild(span);
  }

  results.appendChild(document.createElement('br'));

  userInput.value = '';
});

clearBtn.addEventListener('click', () => {
  results.innerHTML = '';
});
