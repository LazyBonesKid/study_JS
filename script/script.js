'use strict';

const 
calculation              = document.getElementById('start'),
buttonPlusIncome         = document.getElementsByTagName('button')[0],
buttonPlusExpenses       = document.getElementsByTagName('button')[1],
checkbox                 = document.querySelector('#deposit-check'),
possibleIncome           = document.querySelectorAll('.additional_income-item'),
budgetMonthValue         = document.getElementsByClassName('result-total')[0],
budgetDayValue           = document.getElementsByClassName('result-total')[1],
expensesMonthValue       = document.getElementsByClassName('result-total')[2],
additionalIncomeValue    = document.getElementsByClassName('result-total')[3],
additionalExpensesValue  = document.getElementsByClassName('result-total')[4],
incomePeriodValue        = document.getElementsByClassName('result-total')[5],
targerMonthValue         = document.getElementsByClassName('result-total')[6],
salaryAmount             = document.querySelector('.salary-amount'),
incomeTitle              = document.querySelector('[class="income-title"]'),
incomeAmount             = document.querySelector('.income-amount'),
expensesTitle            = document.querySelector('[class="expenses-title"]'),
expensesAmount           = document.querySelector('.expenses-amount'),
additionalExpensesItem   = document.querySelector('.additional_expenses-item'),
targetAmount             = document.querySelector('.target-amount'),
periodSelect             = document.querySelector('.period-select');


console.log(Value);
console.log(calculation);
console.log(buttonPlusIncome);
console.log(buttonPlusExpenses);
console.log(checkbox);
console.log(possibleIncome);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targerMonthValue);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(targetAmount);
console.log(periodSelect);

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let isString = function (n) {
    let re = /[!@#$%^&*()_]|[0-9]/g;
    return re.test(n) || n === null || !n.trim()
}

let start = function () {
    do {
        start = prompt ('Ваш месячный доход?' , 30000);
    } while (!isNumber(start));
    return start;
};


let appData = {
    income: {},
    expenses: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    mission: 100500,
    period: 11,
    budget: 0,
    percentDeposit: 0,
    percentMoney: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function() {
        
        if(confirm('Есть ли у вас дополнительный заработок?')) {
            let  itmeIncome, 
            cashIncome;

            do {
                itmeIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (isString(itmeIncome));
            do {
                cashIncome = prompt('сколько в месяц вы на этом зарабатываете?', 15000);
            } while (!isNumber(cashIncome));
            
            appData.income[itmeIncome] = cashIncome;
        }

        let addExpenses;
        
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' , 'интеРнет, таКси, комМунальные расходы');
        } while (isString(addExpenses));
        
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for (let i = 0; i < 2; i++) {
            let key,
            sum;

            do {
                key = prompt('Введите обязательную статью расходов', 'водичка');
            } while (isString(key));

            do {
                sum = prompt('Во сколько это обойдется?', 450);
            } while (!isNumber(sum));

            appData.expenses[key] = +sum;
        }
        
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },


    getBudget: function () {  
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
    
        if (appData.budgetDay > 0){
            return 'Цель будет достигнута через: ' + Math.ceil(appData.mission/appData.budgetMonth) + ' месяца';
        } else {
            return 'Цель не будет достигнута';
        }
    },

    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0 ) {
            return('Что то пошло не так');
        } 
    },

    getInfoDeposit: function () {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};
