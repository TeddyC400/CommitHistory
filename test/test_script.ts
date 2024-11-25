import { CommitHistory } from "../src/commithistory.js";

function createTestCommitHistory(parentElement: HTMLElement): CommitHistory {
    const commitHistory = new CommitHistory();
    commitHistory.create(parentElement);

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

    return commitHistory;
}

const testContainer = document.getElementById('test-container');

const history1 = createTestCommitHistory(testContainer!);
const history2 = createTestCommitHistory(testContainer!);

history1.updateChart();

history2.setColors({
    0: '#ebedf0',
    1: '#add8e6',
    2: '#87ceeb',
    3: '#4682b4',
    4: '#4169e1',
    5: '#0000ff',
});
history2.updateChart();
