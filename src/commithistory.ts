
// Labels for months and weekdays
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export class Commit {
    date: Date;
    description: string;
    contributionCount: number;

    constructor(date: Date, description: string, contributionCount: number) {
        this.date = date;
        this.description = description;
        this.contributionCount = contributionCount;
    }
}

export class CommitHistory {
    contributionDays: Map<string, Commit>;
    colors: Record<number, string>;

    private commitHistory?: HTMLElement;
    private monthsContainer?: HTMLElement;
    private chartContainer?: HTMLElement;
    private weekdaysContainer?: HTMLElement;
    private contributionChartContainer?: HTMLElement;

    constructor() {
        this.contributionDays = new Map();
        this.colors = {
            0: '#ebedf0',
            1: '#c6e48b',
            2: '#7bc96f',
            3: '#239a3b',
            4: '#196127',
        }
    }

    public create(parentElement: HTMLElement) {
        this.createElements(parentElement);
        this.updateChart();
    }

    private createElements(parentElement: HTMLElement) {
        this.commitHistory = document.createElement('div');
        this.commitHistory.setAttribute('class', 'commit-history');

        this.monthsContainer = document.createElement('div');
        this.monthsContainer.setAttribute('class', 'months');

        this.chartContainer = document.createElement('div');
        this.chartContainer.setAttribute('class', 'chart-container');

        this.weekdaysContainer = document.createElement('div');
        this.weekdaysContainer.setAttribute('class', 'weekdays');

        this.contributionChartContainer = document.createElement('div');
        this.contributionChartContainer.setAttribute('class', 'contribution-chart');

        this.chartContainer.appendChild(this.weekdaysContainer);
        this.chartContainer.appendChild(this.contributionChartContainer);

        this.commitHistory.appendChild(this.monthsContainer);
        this.commitHistory.appendChild(this.chartContainer);

        parentElement.appendChild(this.commitHistory);
    }

    private setWeekdaysOnChart(hideWeekdays: Set<string> = new Set()) {
        this.weekdaysContainer?.replaceChildren();

        let index = 0;
        for (const name of weekdayNames) {
            if (hideWeekdays.has(name)) {
                continue;
            }

            const weekdayElement = document.createElement('div');
            weekdayElement.classList.add('contribution-weekday');
            weekdayElement.textContent = name;
            weekdayElement.style.gridRowStart = `${index + 1}`;
            this.weekdaysContainer?.appendChild(weekdayElement);

            index++;
        }
    }

    private addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result
    }

    public updateChart(hideWeekdays?: Set<string>, showMonths = true) {
        this.setWeekdaysOnChart(hideWeekdays);
        this.monthsContainer?.replaceChildren();

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
        let dateString: string;
        let contributionDay: Commit;
        let description: string;
        let level: number;
        while (currentDate < today) {
            currentDate = this.addDays(oneYearAgo, day);
            dateString = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
            week = Math.floor(day / 7);

            if (this.contributionDays.has(dateString)) {
                contributionDay = this.contributionDays.get(dateString)!;
                description = contributionDay?.description!;
                level = contributionDay?.contributionCount!;
            } else {
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
            this.contributionChartContainer?.appendChild(dayElement);

            // Add month label at the first day of each month
            if (currentDate.getDate() === 1 && showMonths) {
                const monthElement = document.createElement('div');
                monthElement.classList.add('contribution-month');
                monthElement.textContent = monthNames[currentDate.getMonth()];
                monthElement.style.gridColumnStart = `${week + 1}`;
                monthElement.style.gridRowStart = '1';
                this.monthsContainer?.appendChild(monthElement);
                currentMonth = currentDate.getMonth();
            }

            day++;
        }
    }

    public addCommit(commit: Commit) {
        //this.commitDays.push(commitDay);
        this.contributionDays.set(commit.date.toISOString().split('T')[0], commit);
    }

    public setColors(colors: Record<number, string>) {
        this.colors = colors;
    }
}
