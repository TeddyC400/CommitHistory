
import {addContributionDay, updateContributionChart, setCustomColors} from '../src/commithistory.js';

let todayDate = new Date();
let date;
for (let i = 0; i < 300; i++) {
    date = new Date();
    date.setDate(todayDate.getDate() + Math.random() * -364);
    addContributionDay(date, "Contribution Message", Math.floor(Math.random() * 5));
}

setCustomColors(
    {
        0: '#ffc0cb',
        1: '#ffb6c1',
        2: '#ff69b4',
        3: '#ff1493',
        4: '#db7093',
    }
);
updateContributionChart();