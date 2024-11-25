import { CommitHistory } from "../src/commithistory.js";

const commitHistory = new CommitHistory();

const testContainer = document.getElementById('test-container');

commitHistory.create(testContainer!);

const todayDate = new Date();
let date;
for (let i = 0; i < 300; i++) {
    date = new Date();
    date.setDate(todayDate.getDate() + Math.random() * -364);
    commitHistory.addCommit({
        date: date,
        description: 'Contribution message',
        contributionCount: Math.floor(Math.random() * 5),
    });
}

commitHistory.updateChart();
