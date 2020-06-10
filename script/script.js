'use strict';

let 
mission = 100500,
period = 11;



let showTypeOf = function(data) {
    console.log(typeof(data));
};

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let start = function () {
    do {
        start = prompt ('Ваш месячный доход?' , 30000);
    } while (!isNumber(start));
    return start;
};

let money = start();


let
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' , 'й, t, q, y'),
deposite = confirm('Есть ли у вас депозит в банке?');

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' крышек нюка колы');
console.log(addExpenses = addExpenses.toLocaleLowerCase().split(', '));


let 
expenses = [];


let getExpensesMonth = function () {
    let 
    sum,
    sunn = 0;
    
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', 'водичка'); 
        do {
            sum = +prompt('Во сколько это обойдется?', 450);
        } while (!isNumber(sum));
        sunn += sum;
    }
    
    return sunn;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function (money) {  
    return money - expensesAmount;
};

let  accumulatedMonth = getAccumulatedMonth(money);
console.log('Бюджет на месяц: ', accumulatedMonth);

let getTargetMonth = function (mission, accumulated) {
    if (accumulatedMonth > 0){
        return 'Цель будет достигнута через: ' + Math.ceil(mission/accumulated) + ' месяца';
    } else {
        return 'Цель не будет достигнута';
    }
};

console.log(getTargetMonth(mission, accumulatedMonth));

let getBudgetDay = function (accumulated) {
    return Math.floor(accumulatedMonth / 30)
};

let budgetDay = getBudgetDay(accumulatedMonth);
console.log('Бюджет на день:', budgetDay);

let getStatusIncome = function(budgetDay) {
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0 ) {
        return('Что то пошло не так');
    } 
};

console.log(getStatusIncome(budgetDay));