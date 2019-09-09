// Repayment object - used in tables
// Properties: date, principal, interest
// Will calculate total repayment (sum of principal and interest)
function Repayment(date, principal, interest) {
  this.date = date,
  this.principal = principal,
  this.interest = interest,
  this.total = principal + interest;
};

// Create table rows for monthly repayments
// Properties: table, monthly repayments
// Will create and add rows and cells for each property in each monthly repayment
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

// User generated numbers
var totalRequestedLoan = 10000
var duration = 4 // number of months
var rcpInterestRate = 0.03 // percentage
var businessLoanInterestRate = 0.03 // percentage

// Create principal and interest var's
var principal = totalRequestedLoan / duration
var remainingRequestedLoan = totalRequestedLoan
var interest = remainingRequestedLoan * rcpInterestRate

// Revolving Credit Facility (RCP) monthly repayments array
var rcpRepayments = []
var businessLoanRepayments = []


// Calculate RCP repayments, start with June and increase based on user's entered duration
var monthNumber = 6;
for (i = 0; i < duration; i++) {

  //Create new monthly repayment obj
  var rcpRepayment = new Repayment("30/0" + monthNumber + "/2019", principal, remainingRequestedLoan * rcpInterestRate);

  if (i == 0) {
    // Only add 10% to first month
    let upfrontFees = (totalRequestedLoan * 0.10);
    var businessLoanRepayment = new Repayment("30/0" + monthNumber + "/2019", principal, (totalRequestedLoan * rcpInterestRate) + upfrontFees);
  } else {
    var businessLoanRepayment = new Repayment("30/0" + monthNumber + "/2019", principal, remainingRequestedLoan * rcpInterestRate);
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
// Add RCP Total Repayment to array
var businessLoanTotalRepayment = new Repayment("Total", businessLoanTotalRepaymentPrincipal, businessLoanTotalRepaymentInterest, businessLoanTotalRepayment);
businessLoanRepayments.push(businessLoanTotalRepayment)

// Add RCP Loan Table rows with monthly repayment data
let rcpTable = document.getElementById('rcpLoanTable');
createTableRows(rcpTable, rcpRepayments);

// Add RCP Loan Table rows with monthly repayment data
let businessLoanTable = document.getElementById('businessLoanTable');
createTableRows(businessLoanTable, businessLoanRepayments);
