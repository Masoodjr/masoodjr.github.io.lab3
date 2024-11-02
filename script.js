const slider = document.querySelector("input[type='range']");
slider.addEventListener("input", calculateTip);

const billInput = document.getElementById("bill");
billInput.addEventListener("input", calculateTip);

const currencySelect = document.getElementById("currency");
currencySelect.addEventListener("change", calculateTip);

const error = document.getElementById("error");

function calculateTip() {
    let tipAmount;
    let totalBill;
    let conversionRate = parseFloat(currencySelect.value);

    // Extract currency symbol from the dropdown text (using regex to remove parentheses)
    let currencySymbol = currencySelect.options[currencySelect.selectedIndex].text.split(' ')[1].replace(/[()]/g, '');

    let tipPercent = document.getElementById("tip").value;
    document.getElementById("tip_percentage").value = `${tipPercent}%`;

    let bill1 = document.querySelector("#bill");
    if (bill1.value === '') {
        error.innerText = "";
        document.getElementById("tip_amount").value = `${currencySymbol} 0.00`;
        document.getElementById("bill_with_tip").value = `${currencySymbol} 0.00`;
        return;
    }
    if (isNaN(bill1.value) || bill1.value < 0) {
        error.innerText = "Enter a valid bill amount!";
        document.getElementById("tip_amount").value = `${currencySymbol} 0.00`;
        document.getElementById("bill_with_tip").value = `${currencySymbol} 0.00`;
        return;
    }

    error.innerText = "";

    let bill = parseFloat(billInput.value);

    // Calculate tip amount and total bill in selected currency
    tipAmount = parseFloat((bill * (tipPercent / 100) * conversionRate).toFixed(2));
    totalBill = parseFloat((bill * conversionRate + tipAmount).toFixed(2));

    document.getElementById("tip_amount").value = `${currencySymbol} ${tipAmount.toFixed(2)}`;
    document.getElementById("bill_with_tip").value = `${currencySymbol} ${totalBill.toFixed(2)}`;
}

// Initial call to set default values when the page loads
calculateTip();
