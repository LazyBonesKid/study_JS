'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let isString = function (n) {
    let re = /[0-9]/g;
    return re.test(n) || n === null || !n.trim()
}

let start = function () {
    do {
        start = prompt ('Ваш месячный доход?' , 30000);
    } while (!isNumber(start));
    return start;
};

let
money = start();

let appData = {
    income: {},
    expenses: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    mission: 100500,
    period: 11,
    budget: money,
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

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' , 'интеРнет, таКси, комМунальные расходы');
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

appData.asking();
appData.getBudget();
console.log('Расходы за месяц:', appData.expensesMonth);
console.log('Период равен ' + appData.period + ' месяцев');
console.log('Цель заработать ' + appData.mission + ' крышек нюка колы');
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

/* console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log('Свойство ' + key + ' Значение ' + appData[key]);
} */

appData.getInfoDeposit();

console.log(appData.addExpenses.map(function(item, i , arr1) {
    return `${item[0].toUpperCase()}${item.slice(1)}`;
}).join(', '));

console.log(appData.calcSavedMoney(), appData.percentDeposit, appData.moneyDeposit);