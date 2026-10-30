//Muhammad Haris Syahmi Bin Mohd Rafizal
//2024231026, CDCS2405B

// 1. declare base service

const basePrices = {

    underground: {
        name: "Underground Bunker",
        price: 500
    },

    volcano: {
        name: "Volcano Fortress",
        price: 1200
    },

    sky: {
        name: "Sky Tower Penthouse",
        price: 900
    },

    island: {
        name: "Private Island Compound",
        price: 1500
    }

};


// 2. declare optionsl add on

const addonPrices = {

    laser: {
        name: "Laser Security Grid",
        price: 180
    },

    laboratory: {
        name: "Mad Science Laboratory",
        price: 250
    },

    ai: {
        name: "AI Command System",
        price: 120
    },

    helipad: {
        name: "Private Helipad",
        price: 300
    }

};


// 3. using document.getElementById()

const quotationForm =
    document.getElementById("quotationForm");

const resultSection =
    document.getElementById("resultSection");

const resultDetails =
    document.getElementById("resultDetails");

const grandTotal =
    document.getElementById("grandTotal");

const resetButton =
    document.getElementById("resetButton");

const printButton =
    document.getElementById("printButton");


// 4. declare currency format

function formatRM(amount) {

    return new Intl.NumberFormat("en-MY", {

        style: "currency",

        currency: "MYR",

        minimumFractionDigits: 2,

        maximumFractionDigits: 2

    }).format(amount);

}


// 5. display result

function addResultRow(label, value, className = "") {

    const row = document.createElement("div");

    row.className = "result-row " + className;

    const labelElement = document.createElement("span");

    labelElement.textContent = label;

    const valueElement = document.createElement("strong");

    valueElement.textContent = value;

    row.appendChild(labelElement);

    row.appendChild(valueElement);

    resultDetails.appendChild(row);

}


// 6. submit form and validation

quotationForm.addEventListener("submit", function(event) {

    // Prevent page refresh

    event.preventDefault();


    // retrieve cut details

    const customerName =

        document.getElementById("customerName")
        .value.trim();

    const customerEmail =

        document.getElementById("customerEmail")
        .value.trim();


    // retrieve base service selected

    const baseKey =

        document.getElementById("baseService")
        .value;


    // retrieve quantity

    const rentalDays = Number(

        document.getElementById("rentalDays")
        .value

    );

    // validate cust name

    if (customerName.length < 2) {

        alert("Please enter a valid customer name.");

        document.getElementById("customerName").focus();

        return;

    }


    // validate email 

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail)) {

        alert("Invalid email address. Please try again.");

        document.getElementById("customerEmail").focus();

        return;

    }


    // validate base service

    if (!basePrices[baseKey]) {

        alert("Please select a headquarters.");

        document.getElementById("baseService").focus();

        return;

    }


    // validate quantity

    if (
        !Number.isInteger(rentalDays) ||
        rentalDays < 1 ||
        rentalDays > 365
    ) {

        alert("Rental duration must be between 1 and 365 days.");

        document.getElementById("rentalDays").focus();

        return;

    }

    // 7. get base price

    const selectedBase = basePrices[baseKey];

    const basePrice = selectedBase.price;


    // 8. get optional service

    const selectedCheckboxes =

        document.querySelectorAll(
            'input[name="addons"]:checked'
        );

    let addonDailyTotal = 0;

    let selectedAddonNames = [];


    selectedCheckboxes.forEach(function(checkbox) {

        const addon = addonPrices[checkbox.value];

        if (addon) {

            addonDailyTotal += addon.price;

            selectedAddonNames.push(addon.name);

        }

    });


    // 9. formula 

    const dailyTotal = basePrice + addonDailyTotal;

    const grandTotalAmount = dailyTotal * rentalDays;


    // 10. orint cust info

    resultDetails.replaceChildren();

    addResultRow("Customer Name", customerName);

    addResultRow("Email Address", customerEmail);

    addResultRow("Selected Headquarters", selectedBase.name);


    // 11. print optional service

    const addonDisplay =

        selectedAddonNames.length > 0

        ? selectedAddonNames.join(", ")

        : "No additional facilities";


    addResultRow("Additional Facilities", addonDisplay);


    // 12. print price

    addResultRow(
        "Base Service (Per Day)",
        formatRM(basePrice)
    );

    addResultRow(
        "Additional Facilities (Per Day)",
        formatRM(addonDailyTotal)
    );

    addResultRow(
        "Daily Subtotal",
        formatRM(dailyTotal),
        "total-daily"
    );

    addResultRow(
        "Rental Duration",
        rentalDays + " day(s)"
    );

    addResultRow(
        "Number of Henchmen",
        henchmen + " person(s)"
    );


    // 13. print total price

    grandTotal.textContent = formatRM(grandTotalAmount);


    // 14. print result card

    resultSection.hidden = false;


    // 15. notify user

    alert("Calculation complete! Your quotation is ready.");


    // 16. auto acroll to result card

    resultSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});


// 17. reset button

resetButton.addEventListener("click", function() {

    resultSection.hidden = true;

    resultDetails.replaceChildren();

    grandTotal.textContent = formatRM(0);

});

