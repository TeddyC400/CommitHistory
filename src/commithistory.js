// Labels for months and weekdays
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export class Commit {
    constructor(date, description, contributionCount) {
        this.date = date;
        this.description = description;
        this.contributionCount = contributionCount;
    }
}
export class CommitHistory {
    constructor() {
        //this.commitDays = [];
        this.contributionDays = new Map();
        this.colors = {
            0: '#ebedf0',
            1: '#c6e48b',
            2: '#7bc96f',
            3: '#239a3b',
            4: '#196127',
        };
    }
    create(parentElement) {
        this.createElements(parentElement);
        this.updateChart();
        console.log('CommitHistory created');
    }
    createElements(parentElement) {
        this.commitHistory = document.createElement('div');
        this.commitHistory.setAttribute('id', 'commit-history');
        this.monthsContainer = document.createElement('div');
        this.monthsContainer.setAttribute('id', 'months');
        this.chartContainer = document.createElement('div');
        this.chartContainer.setAttribute('id', 'chart-container');
        this.weekdaysContainer = document.createElement('div');
        this.weekdaysContainer.setAttribute('id', 'weekdays');
        this.contributionChartContainer = document.createElement('div');
        this.contributionChartContainer.setAttribute('id', 'contribution-chart');
        this.chartContainer.appendChild(this.weekdaysContainer);
        this.chartContainer.appendChild(this.contributionChartContainer);
        this.commitHistory.appendChild(this.monthsContainer);
        this.commitHistory.appendChild(this.chartContainer);
        parentElement.appendChild(this.commitHistory);
    }
    setWeekdaysOnChart(hideWeekdays = new Set()) {
        var _a, _b;
        (_a = this.weekdaysContainer) === null || _a === void 0 ? void 0 : _a.replaceChildren();
        let index = 0;
        for (const name of weekdayNames) {
            if (hideWeekdays.has(name)) {
                continue;
            }
            const weekdayElement = document.createElement('div');
            weekdayElement.classList.add('contribution-weekday');
            weekdayElement.textContent = name;
            weekdayElement.style.gridRowStart = `${index + 1}`;
            (_b = this.weekdaysContainer) === null || _b === void 0 ? void 0 : _b.appendChild(weekdayElement);
            index++;
        }
    }
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    updateChart(hideWeekdays, showMonths = true) {
        var _a, _b, _c;
        this.setWeekdaysOnChart(hideWeekdays);
        (_a = this.monthsContainer) === null || _a === void 0 ? void 0 : _a.replaceChildren();
        // Get the date one year ago from today
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        oneYearAgo.setDate(oneYearAgo.getDate() - oneYearAgo.getDay());
        const colorsCount = Object.keys(this.colors).length;
        let currentMonth = oneYearAgo.getMonth();
        let currentDate = new Date(oneYearAgo);
        let week = 0;
        let day = 0;
        let dateString;
        let contributionDay;
        let description;
        let level;
        while (currentDate < today) {
            currentDate = this.addDays(oneYearAgo, day);
            dateString = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
            week = Math.floor(day / 7);
            if (this.contributionDays.has(dateString)) {
                contributionDay = this.contributionDays.get(dateString);
                description = contributionDay === null || contributionDay === void 0 ? void 0 : contributionDay.description;
                level = contributionDay === null || contributionDay === void 0 ? void 0 : contributionDay.contributionCount;
            }
            else {
                description = `No contributions on ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}`;
                level = 0;
            }
            const dayElement = document.createElement('div');
            dayElement.className = 'contribution-day';
            dayElement.dataset.desc = description;
            dayElement.dataset.level = `${level}`;
            dayElement.style.backgroundColor = level < colorsCount ? this.colors[level] : this.colors[colorsCount - 1];
            dayElement.dataset.date = dateString;
            dayElement.style.gridColumnStart = `${week + 1}`;
            dayElement.style.gridRowStart = `${currentDate.getDay() + 1}`;
            (_b = this.contributionChartContainer) === null || _b === void 0 ? void 0 : _b.appendChild(dayElement);
            // Add month label at the first day of each month
            if (currentDate.getDate() === 1 && showMonths) {
                const monthElement = document.createElement('div');
                monthElement.classList.add('contribution-month');
                monthElement.textContent = monthNames[currentDate.getMonth()];
                monthElement.style.gridColumnStart = `${week + 1}`;
                monthElement.style.gridRowStart = '1';
                (_c = this.monthsContainer) === null || _c === void 0 ? void 0 : _c.appendChild(monthElement);
                currentMonth = currentDate.getMonth();
            }
            day++;
        }
    }
    addCommit(commit) {
        //this.commitDays.push(commitDay);
        this.contributionDays.set(commit.date.toISOString().split('T')[0], commit);
    }
    setColors(colors) {
        this.colors = colors;
    }
}
