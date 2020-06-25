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


    //////////
    let depositCheck = document.getElementById('deposit-check');
    //////////





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
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showRezult();
        this.blockingInputs();
        this.reset();
    },

    /////////////// ВЫВОД НА СТРАНИЦУ //////////////////////////

    showRezult: function () {
        document.querySelector('.period-select').addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targerMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
    },

    //////////// ДОБАВЛЕНИЕ РАСХОДОВ И ДОХОДОВ /////////////////////////////

    getAddExpenses: function () { // Возможные расходы !
        let addExpenses = additionalExpensesItem.value.split(',');
        for (let i = 0; i < addExpenses.length; i++) {
            addExpenses[i] = addExpenses[i].trim();
            if(addExpenses[i] !== '') {
                this.addExpenses.push(addExpenses[i]);
            }
        }
    },

    getAddIncome: function () { // Возможный доход !
        for (let i = 0; i < additionalIncomeItem.length; i++) {
            let itemValue = additionalIncomeItem[i].value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }

    },

    //////////////////   СОЗДАНИЕ БЛОКОВ    ///////////////////////////////////

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input')[0].value = '';
        cloneIncomeItem.querySelectorAll('input')[1].value = '';

        cloneIncomeItem.querySelectorAll('input')[0].addEventListener('input', function(item) {
            if (isString(cloneIncomeItem.querySelectorAll('input')[0].value)) {
                cloneIncomeItem.querySelectorAll('input')[0].value = cloneIncomeItem.querySelectorAll('input')[0].value.slice(0, -1);
            }
        });

        cloneIncomeItem.querySelectorAll('input')[1].addEventListener('input', function(item) {
            if (!isNumber(cloneIncomeItem.querySelectorAll('input')[1].value)) {
                cloneIncomeItem.querySelectorAll('input')[1].value = cloneIncomeItem.querySelectorAll('input')[1].value.slice(0, -1);
            } 
        });

        console.log(cloneIncomeItem.querySelectorAll('input')[0]);
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

        cloneExpesesItem.querySelectorAll('input')[0].addEventListener('input', function(item) {
            if (isString(cloneExpesesItem.querySelectorAll('input')[0].value)) {
                cloneExpesesItem.querySelectorAll('input')[0].value = cloneExpesesItem.querySelectorAll('input')[0].value.slice(0, -1);
            }
        });

        cloneExpesesItem.querySelectorAll('input')[1].addEventListener('input', function(item) {
            if (!isNumber(cloneExpesesItem.querySelectorAll('input')[1].value)) {
                cloneExpesesItem.querySelectorAll('input')[1].value = cloneExpesesItem.querySelectorAll('input')[1].value.slice(0, -1);
            } 
        });

        expensesItems[0].parentNode.insertBefore(cloneExpesesItem, buttonPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlusExpenses.style.display = 'none';
        }
    },
    ////////////////////////////////////////////////////////////////    

    getExpenses: function () { // Обязательные расходы

        for (let i = 0; i < expensesItems.length; i++) {
            let itemExpenses = expensesItems[i].querySelector('.expenses-title').value;
            let cashExpenses = expensesItems[i].querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ' ') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }
    },

    getIncome: function () { //  Дополнительный доход

        for (let i = 0; i < incomeItems.length; i++) {
            let itemExpenses = incomeItems[i].querySelector('.income-title').value;
            let cashExpenses = incomeItems[i].querySelector('.income-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ' ') {
                this.income[itemExpenses] = cashExpenses;
            }
        }
    },

    /////////////////  ВЫЧИСЛЕНИЯ  ////////////////////////////////

    getExpensesMonth: function () {

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },

    getIncomeMonth: function () {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    ///////////////////////////////////////////////////////////////////

    getBudget: function () {

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    getTargetMonth: function () {

        if (this.budgetDay > 0) {
            return 'Цель будет достигнута через: ' + Math.ceil(targetAmount.value / this.budgetMonth) + ' месяца';
        } else {
            return 'Цель не будет достигнута';
        }
    },

    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    },

    blockingInputs: function () {
        let 
        inputs = document.querySelectorAll('[type="text"]'),
        leftInputsCount = inputs.length - 7,
        count = 0;

        inputs.forEach(function(item) {
            if(count !== leftInputsCount ){
                count++;
                item.setAttribute('readonly',0);
            } else {
                return;
            }
        });
    },

    reset: function() {
        start.style.display = 'none';
        let cancel = document.getElementById('cancel');
        cancel.style.display = 'block';
        cancel.textContent = 'Сбросить';
        cancel.addEventListener('click', function() {
            let inputs = document.querySelectorAll('[type="text"]');

            inputs.forEach(function(item) {
                    item.value = '';
                    item.removeAttribute('readonly',0);
            });

            periodSelect.value = '1';
            periodNumber.textContent = '1';

            let
            incomeItemsCopy = document.querySelectorAll('.income-items'),
            expensesItemsCopy = document.querySelectorAll('.expenses-items');

            for (let i = 0; i < incomeItemsCopy.length - 1; i++){
                incomeItemsCopy[i].parentNode.removeChild(incomeItemsCopy[i]);
                
            }

            for (let i = 0; i < expensesItemsCopy.length - 1; i++){
                expensesItemsCopy[i].parentNode.removeChild(expensesItemsCopy[i]);
            }

            buttonPlusExpenses.style.display = '';
            buttonPlusIncome.style.display = '';

            if (depositCheckValue == true) {
                depositCheck.click();
            }
            

            for (let key in appData) {
                if(typeof appData[key] !== 'function') {
                    appData[key] = appDataCopy[key];
                }
            }


            start.style.display = '';
            cancel.style.display = 'none';
        });
    },

    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    },

    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },
};


let 
appDataCopy = JSON.parse(JSON.stringify(appData)),
depositCheckValue = false;


depositCheck.addEventListener('click', function() {
    depositCheckValue = !depositCheckValue;
})

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
