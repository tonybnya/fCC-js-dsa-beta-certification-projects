const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const romanNumerals = {};
let numbers = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
let symbols = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

for (let i = 0; i < numbers.length; i++) {
  romanNumerals[numbers[i]] = symbols[i];
}

const numberToRomanConverter = (number) => {
  let roman = '';

  for (let i = 0; i < numbers.length; i++) {
    if (number >= numbers[i]) {
      roman += symbols[i];
      number -= numbers[i];
      return roman + numberToRomanConverter(number);
    }
  }

  return roman;
};

const checkInvalidInput = () => {
  const number = parseInt(numberInput.value);

  if (isNaN(number) || number < 1 || number > 3999) {
    let text = '';

    if (isNaN(number)) text = 'Please enter a valid number';
    else if (number < 1) text = 'Please enter a number greater than or equal to 1';
    else if (number > 3999) text = 'Please enter a number less than or equal to 3999';

    output.innerText = text;
    numberInput.value = '';
  } else {
    output.innerText = `${numberToRomanConverter(number)}`;
  }
};

convertBtn.addEventListener('click', checkInvalidInput);

numberInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkInvalidInput();
  }
});
