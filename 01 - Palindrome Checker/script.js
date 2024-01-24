const textInput = document.querySelector('#text-input');
const checkBtn = document.querySelector('#check-btn');
const result = document.querySelector('#result');

const log = (arg) => console.log(arg);

const cleaner = (text) => {
  const regex = /[^a-zA-Z0-9]/g;

  return text.replace(regex, '').toLowerCase();
};

const checker = () => {
  let textValue = textInput.value;

  if (!textValue) {
    log('Please input a value');
    alert('Please input a value');
  } else {
    const string = cleaner(textValue);
    const reversedString = [...string].reverse().join('');
    log(string);
    log(reversedString);

    const output = string === reversedString ? `${textValue} is a palindrome.` : `${textValue} is not a palindrome.`;

    result.innerText = output;
  }
};

checkBtn.addEventListener('click', checker);
