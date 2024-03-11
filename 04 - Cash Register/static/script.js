let price = 19.5;
    let cid = [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100]
    ];

    const exchange = [
      { name: 'ONE HUNDRED', val: 100.00 },
      { name: 'TWENTY', val: 20.00 },
      { name: 'TEN', val: 10.00 },
      { name: 'FIVE', val: 5.00 },
      { name: 'ONE', val: 1.00 },
      { name: 'QUARTER', val: 0.25 },
      { name: 'DIME', val: 0.10 },
      { name: 'NICKEL', val: 0.05 },
      { name: 'PENNY', val: 0.01 },
    ];

    const cashInput = document.getElementById("cash");
    const changeDue = document.getElementById("change-due");
    const purchaseBtn = document.getElementById("purchase-btn");

    const checkCashRegister = (price, cash, cid) => {
      let cashRegister = { status: null, change: [] };
      let change = cash - price;
      let sumCid = parseFloat(cid.map(x => x[1]).reduce((a, b) => a + b, 0).toFixed(2));

      cid = cid.reverse();
      let currentValue = 0;

      let changeArray = exchange.reduce((acc, next, index) => {
        let currentValueArray = 0;
        // For the final test case
        if (cid[index][1] === 0) {
          acc.push(cid[index]);
          return acc;
        } else {
          if (change >= next.val) {
            while (change >= next.val && cid[index][1] >= next.val) {
              change -= next.val;
              change = Math.round(change * 100) / 100;
              cid[index][1] = Math.round(cid[index][1] * 100) / 100;
              cid[index][1] -= next.val;
              currentValueArray += next.val;
            }
            currentValue = currentValueArray;
            acc.push([next.name, Math.round(currentValueArray * 100) / 100]);
            return acc;
          } else {
            return acc;
          }
        }
      }, []);

      if (change > sumCid || change > 0) {
        cashRegister.status = "INSUFFICIENT_FUNDS";
        cashRegister.change = [];
        return cashRegister;
      } else if (sumCid - Math.round(currentValue * 100) / 100 === 0) {
        cashRegister.status = "CLOSED";
        cashRegister.change = changeArray.reverse();
        return cashRegister;
      } else {
        cashRegister.status = "OPEN";
        cashRegister.change = changeArray;
        return cashRegister;
      }
    }

    const calculateChange = () => {
      const cashProvided = parseFloat(cashInput.value);

      if (cashProvided < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
      } else if (cashProvided === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
      }

      const result = checkCashRegister(price, cashProvided, cid);

      if (result.status === "INSUFFICIENT_FUNDS") {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      } else if (result.status === "CLOSED") {
        changeDue.textContent = "Status: CLOSED " + result.change.map(item => item.join(": $")).sort().join(" ");
      } else if (result.status === "OPEN") {
        changeDue.textContent = "Status: OPEN " + result.change.map(item => item.join(": $")).sort().join(" ");
      }
    };

    purchaseBtn.addEventListener("click", calculateChange);
