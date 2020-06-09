'use strict';

let 
mission = 100500,
period = 11;

let showTypeOf = function(data) {
    console.log(typeof(data));
};



let money = function () {
        while (!parseInt(money)) {
        money = prompt('Ваш месячный доход?', 30000);
        if(money == null){
            alert('Это поле обезательно к заполнению');
            continue;
        }
        if(!money.trim()){
            alert('пустая строка (или только пробелы)');
            continue;
        }
        if(!Number(money)){
            alert('Только цифры');
            continue;
        }
        Number(money);
    }
}
money();

let
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposite = confirm('Есть ли у вас депозит в банке?');

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' крышек нюка колы');
console.log(addExpenses = addExpenses.toLocaleLowerCase().split(', '));

let 
expenses1 = prompt('Введите обязательную статью расходов'),
amount1 = +prompt('Во сколько это обойдется?', 2500),
expenses2 = prompt('Введите обязательную статью расходов'),
amount2 = +prompt('Во сколько это обойдется?', 500);



let getExpensesMonth = function (amountOne, amountTwo) {
    return amountOne + amountTwo;
};

let getAccumulatedMonth = function (money, amountOne , amountTwo) { // попробывал callback 
    return money - getExpensesMonth(amountOne, amountTwo);
};

let  accumulatedMonth = getAccumulatedMonth(money, amount2, amount1);
console.log('Бюджет на месяц: ', accumulatedMonth);

let getTargetMonth = function (mission, accumulated) {
    return 'Цель будет достигнута через: ' + Math.ceil(mission/accumulated) + ' месяца';
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