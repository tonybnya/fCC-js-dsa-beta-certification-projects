let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKLE", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", function() {
  const cashProvided = parseFloat(cashInput.value);

  let change = cashProvided - price;
  let changeArray = [];
  let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);

  if (cashProvided < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashProvided === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  cid.reverse().forEach(curr => {
    const currency = curr[0];
    const unitValue = curr[1];
    let amountToReturn = 0;

    while (change >= unitValue && (curr[1] > 0 || change >= 0.25)) {
      if (change > 0 && change < 0.01 && curr[1] > 0) {
  amountToReturn = Math.floor(change * 100);
  curr[1] -= amountToReturn / 100;
}
      change -= unitValue;
      curr[1] -= unitValue;
      amountToReturn += unitValue;
      change = Math.round(change * 100) / 100;
    }

    if (amountToReturn > 0) {
      changeArray.push([currency, amountToReturn]);
    }
  });

  if (change > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (change === 0) {
    changeDue.textContent = "Status: CLOSED";
  } else {
    changeDue.textContent = "Status: OPEN " + changeArray.map(item => item.join(": $")).sort().join(" ");
  }
});
