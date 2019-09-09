// Call calculate function when window loads with default input values
window.onload = function() {
  calculate();
};

// Repayment object - used in tables, calculates total repayment (sum of principal and interest)
function Repayment(date, principal, interest) {
  this.date = date,
  this.principal = principal,
  this.interest = interest,
  this.total = principal + interest;
};

// Function to create and add rows and cells to tables, for each property in each monthly repayment
function createTableRows(table, monthlyRepayments) {
  for (let repayment of monthlyRepayments) {
    let row = table.insertRow();
    for (property in repayment) {
      let cell = row.insertCell();
      var text = ""
      if (property == "date") {
        text = document.createTextNode(repayment[property]);
      } else {
        // Remaining properties are in GBP
        text = document.createTextNode("£" + repayment[property]);
      }
      let cellText = text
      cell.appendChild(cellText);
    }
  }
}

// Function to delete table rows for monthly repayments except top header row
function removeTableRows(table) {
  while (table.rows.length > 1) {
     table.deleteRow(table.rows.length-1);
  }
}

// Function called when calculate button is pressed and form is submitted
function calculate() {
    event.preventDefault();

    // Set percentages on calculators
    document.getElementById("entered-rcp-interest").innerHTML = document.getElementById("revolving-credit-interest-rate").value
    document.getElementById("entered-bl-interest").innerHTML = document.getElementById("business-loan-interest-rate").value

    // User generated numbers
    var totalRequestedLoan = Number(document.getElementById("amount-requested").value)
    var duration = Number(document.getElementById("duration").value) // number of months
    var rcpInterestRate = Number(document.getElementById("revolving-credit-interest-rate").value) / 100 // percentage
    var businessLoanInterestRate = Number(document.getElementById("business-loan-interest-rate").value) / 100 // percentage

    // Create principal and interest var's
    var principal = Math.floor(totalRequestedLoan / duration)
    var remainingRequestedLoan = totalRequestedLoan
    var rcpInterest = totalRequestedLoan * rcpInterestRate
    var businessLoanInterest = totalRequestedLoan * businessLoanInterestRate

    // Monthly repayments arrays
    var rcpRepayments = []
    var businessLoanRepayments = []

    // Calculate monthly repayments, start with January (1) and increase based on user's entered duration
    var monthNumber = 1;
    for (i = 0; i < duration; i++) {

      // RCP Monthly Payments
      var rcpRepayment = new Repayment("30/" + monthNumber + "/2019", principal, Math.floor(remainingRequestedLoan * rcpInterestRate));

      // Business Loan Monthly Payments
      if (i == 0) {
        // Only add 10% to first month for business loan
        let upfrontFees = totalRequestedLoan * 0.10;
        var businessLoanRepayment = new Repayment("30/" + monthNumber + "/2019", principal, (Math.floor(remainingRequestedLoan * businessLoanInterestRate) + upfrontFees));
      } else {
        var businessLoanRepayment = new Repayment("30/" + monthNumber + "/2019", principal, Math.floor(remainingRequestedLoan * businessLoanInterestRate));
      }

      // Calculations needed
      remainingRequestedLoan = remainingRequestedLoan - principal;
      monthNumber += 1;

      // Add to arrays
      rcpRepayments.push(rcpRepayment);
      businessLoanRepayments.push(businessLoanRepayment)
    }

    // Add up totals
    var rcpTotalRepaymentPrincipal = 0;
    var rcpTotalRepaymentInterest = 0;
    var rcpTotalRepayment = 0;
    var businessLoanTotalRepaymentPrincipal = 0;
    var businessLoanTotalRepaymentInterest = 0;
    var businessLoanTotalRepayment = 0;

    for (i = 0; i < duration; i++) {
      rcpTotalRepaymentPrincipal += rcpRepayments[i].principal;
      rcpTotalRepaymentInterest += rcpRepayments[i].interest;
      rcpTotalRepayment += rcpRepayments[i].total;

      businessLoanTotalRepaymentPrincipal += businessLoanRepayments[i].principal;
      businessLoanTotalRepaymentInterest += businessLoanRepayments[i].interest;
      businessLoanTotalRepayment += businessLoanRepayments[i].total;
    }

    // Add RCP Total Repayment to array
    var rcpTotalRepayment = new Repayment("Total", rcpTotalRepaymentPrincipal, rcpTotalRepaymentInterest, rcpTotalRepayment);
    rcpRepayments.push(rcpTotalRepayment)

    // Add Business Loan Total Repayment to array
    var businessLoanTotalRepayment = new Repayment("Total", businessLoanTotalRepaymentPrincipal, businessLoanTotalRepaymentInterest, businessLoanTotalRepayment);
    businessLoanRepayments.push(businessLoanTotalRepayment)

    // Clear existing then add new RCP Loan Table rows with monthly repayment data
    let rcpTable = document.getElementById('rcpLoanTable');
    removeTableRows(rcpTable)
    createTableRows(rcpTable, rcpRepayments);

    // Clear existing then add new Business Loan Table rows with monthly repayment data
    let businessLoanTable = document.getElementById('businessLoanTable');
    removeTableRows(businessLoanTable)
    createTableRows(businessLoanTable, businessLoanRepayments);
}
