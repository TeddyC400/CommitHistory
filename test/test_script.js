
import {addContributionDay, updateContributionChart} from '../src/commithistory.js';

let todayDate = new Date();
let date;
for (let i = 0; i < 300; i++) {
    date = new Date();
    date.setDate(todayDate.getDate() + Math.random() * -364);
    addContributionDay(date, "Contribution Message", Math.floor(Math.random() * 5));
}

updateContributionChart();