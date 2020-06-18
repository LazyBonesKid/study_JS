'use strict';

let

    // ЛЕВЫЙ БЛОК
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('[class="income-title"]'),
    buttonPlusIncome = document.getElementsByTagName('button')[0],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('[class="expenses-title"]'),
    expensesAmount = document.querySelector('.expenses-amount'),
    buttonPlusExpenses = document.getElementsByTagName('button')[1],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    checkbox = document.querySelector('#deposit-check'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodNumber = document.querySelector('.period-amount'),
    // DIV
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    // placeholder
    placeholderNumber = document.querySelectorAll('[placeholder="Сумма"]'),
    placeholderText = document.querySelectorAll('[placeholder="Наименование"]'),


    // ПРАВЫЙ БЛОК  
    budgetMonthValue = document.getElementsByClassName('result-total')[0],
    budgetDayValue = document.getElementsByClassName('result-total')[1],
    expensesMonthValue = document.getElementsByClassName('result-total')[2],
    additionalIncomeValue = document.getElementsByClassName('result-total')[3],
    additionalExpensesValue = document.getElementsByClassName('result-total')[4],
    incomePeriodValue = document.getElementsByClassName('result-total')[5],
    targerMonthValue = document.getElementsByClassName('result-total')[6],
    start = document.getElementById('start');


console.log('                    ЛЕВЫЙ БЛОК');
console.log(salaryAmount);
console.log(incomeTitle);
console.log(buttonPlusIncome);
console.log(additionalIncomeItem);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(buttonPlusExpenses);
console.log(additionalExpensesItem);
console.log(checkbox);
console.log(targetAmount);
console.log(periodSelect);
// div
console.log('                         DIV');
console.log(expensesItems);
console.log(incomeItems);
//placeholder
console.log('                    PLACEHOLDER');
console.log(placeholderNumber);
console.log(placeholderText);

console.log('                    ПРАВЫЙ БЛОК');
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targerMonthValue);
console.log(start);






let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



let isString = function (n) {
    let re = /[!@#$%^&*()_+-=}{]|[0-9]|[A-z]/g;
    return re.test(n) || n === null || !n.trim()
}


let appData = {
    income: {},
    expenses: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    incomeMonth: 0,
    budget: 0,
    percentDeposit: 0,
    percentMoney: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showRezult();
    },

    /////////////// ВЫВОД НА СТРАНИЦУ //////////////////////////

    showRezult: function () {
        document.querySelector('.period-select').addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targerMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
    },

    //////////// ДОБАВЛЕНИЕ РАСХОДОВ И ДОХОДОВ /////////////////////////////

    getAddExpenses: function () { // Возможные расходы !
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () { // Возможный доход !
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    //////////////////   СОЗДАНИЕ БЛОКОВ    ///////////////////////////////////

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input')[0].value = '';
        cloneIncomeItem.querySelectorAll('input')[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlusIncome.style.display = 'none';
        }
    },

    addExpensesBlock: function () {

        let cloneExpesesItem = expensesItems[0].cloneNode(true);
        cloneExpesesItem.querySelectorAll('input')[0].value = '';
        cloneExpesesItem.querySelectorAll('input')[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpesesItem, buttonPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlusExpenses.style.display = 'none';
        }
    },

    ////////////////////////////////////////////////////////////////    

    getExpenses: function () { // Обязательные расходы
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ' ') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function () { //  Дополнительный доход
        incomeItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.income-title').value;
            let cashExpenses = item.querySelector('.income-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ' ') {
                appData.income[itemExpenses] = cashExpenses;
            }
        })
    },

    /////////////////  ВЫЧИСЛЕНИЯ  ////////////////////////////////

    getExpensesMonth: function () {

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getIncomeMonth: function () {
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    ///////////////////////////////////////////////////////////////////

    getBudget: function () {

        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {

        if (appData.budgetDay > 0) {
            return 'Цель будет достигнута через: ' + Math.ceil(targetAmount.value / appData.budgetMonth) + ' месяца';
        } else {
            return 'Цель не будет достигнута';
        }
    },

    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
            return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
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
    },

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
};

placeholderNumber.forEach(function (item) {
    return item.addEventListener('input', function () {
        if (!isNumber(item.value)) {
            item.value = item.value.slice(0, -1);
        } 
    });
});

placeholderText.forEach(function (item) {
    return item.addEventListener('input', function () {
        if (isString(item.value)) {
            console.log('privet');
            item.value = item.value.slice(0, -1);
        }
    });
});

start.addEventListener('click', function () {
    if (salaryAmount.value.trim() == '') {
        return alert('Заполните "Месячный доход"');
    }
    appData.start();
});

document.querySelector('.period-select').addEventListener('input', function () {
    periodNumber.innerHTML = periodSelect.value;
});
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);