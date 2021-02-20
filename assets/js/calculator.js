/**
 * Logic for the calculator that populates a user friendly chart. 
 * Chart is built using the Chart.js library 
 * Calculator was inspired by several existing projects listed below.
 * Resources: 
 * https://www.chartjs.org/
 * https://jsfiddle.net/JackHuddlestoneDesign/yd0gwt7j/
 * 
 */



var labelOnj = '<label></label>';
var inputObj = '<input type="text" class="default" placeholder="Example: 1000" />';
var inputCostObj = '<input type="text" class="cost-type" placeholder="Food, Utilities, Rent" />';
var incomeObj = $('.additional-income'); 
var costObj = $('.additional-costs');
var i = 0;
var removeItem;

function createChart(data, labels) {
    var ctx = document.getElementById("createChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
  
     data: {
            labels: labels,
            datasets: [{
                label: 'Budget Outcome',
                data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: [
                'red',
                'green',
                      'blue',
                    
               
            ],
            }]
        },
    });
}

$(".start").click(function() {
    $('.income').show();
    $('.costs').show();
    return false;
});

$(".logout").click(function() {
    alert("Thank for coming, happy savings!")
    window.location = "index.html"
    return false;
});

$('.add-cost').click(function() {
    costObj.append('<br/>' + inputObj );
    addClassesAndText("cost");
    return false;
});

function addClassesAndText(x) {
    if (x == "income") {
        addIncomeText();
        addInputIncomeClass();
        addRemoveIncomeClass();
    } else if (x == "cost") {
        addRemoveCostClass();
    }
}

$('.add-income').click(function() {
    incomeObj.append('<br/>' + labelOnj + inputObj + removeObj);
    addClassesAndText("income");
    return false;
});

function calculateSavings(totalIncome, totalCosts) {
    var savings = totalIncome - totalCosts;
    return savings;
}

function calculateTotalIncome(income, addedIncome){
   income = income + addedIncome;
   return income; 
}

function calculateTotalCosts(costs, addedCosts){
    costs = costs + addedCosts;
    return costs; 
 }

$(".calculate").click(function() {
    var totalIncome = 0;
    var totalCosts = 0;

    $('.additional-income').children("input").each(function() {
        if ($(this).val() != "") {
          totalIncome = calculateTotalIncome(totalIncome, parseInt($(this).val()));
        }
    });

    $('.additional-costs').children("input.default").each(function() {
        if ($(this).val() != "") {
           totalCosts = calculateTotalCosts(totalCosts, parseInt($(this).val()));
        }
    });

        savings = calculateSavings(totalIncome, totalCosts);
        data = [totalCosts, totalIncome, savings, 0];
        labels =  ["Debt = $" + totalCosts, "Income = $" + totalIncome, "Savings = $" + savings];
        createChart(data, labels);
    
    
});

module.exports = {
    calculateSavings,
    calculateTotalIncome,
    calculateTotalCosts
};