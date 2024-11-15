
class ContributionDay {

    /**
     * 
     * @param {*} date Date object
     * @param {*} description Description of the contributed day
     * @param {*} contributionCount How many contributions were made that day
     */
    constructor(date, description, contributionCount) {
        this.date = date;
        this.description = description;
        this.contributionCount = contributionCount;
    }

}

const contributionContainer = document.getElementById('contribution-container');
const monthsContainer = document.createElement('div');
monthsContainer.setAttribute("id", "months");

const chartContainer = document.createElement('div');
chartContainer.setAttribute("id", "chart-container");

const weekdaysContainer = document.createElement('div');
weekdaysContainer.setAttribute("id", "weekdays");

const contributionChartContainer = document.createElement('div');
contributionChartContainer.setAttribute("id", "contribution-chart");

chartContainer.appendChild(weekdaysContainer);
chartContainer.appendChild(contributionChartContainer);

contributionContainer.appendChild(monthsContainer);
contributionContainer.appendChild(chartContainer);

// Labels for months and weekdays
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Get the date one year ago from today
const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);
oneYearAgo.setDate(oneYearAgo.getDate() - oneYearAgo.getDay());

const contributionDays = new Map();
const contributionCountColors = {
    0: '#ebedf0',
    1: '#c6e48b',
    2: '#7bc96f',
    3: '#239a3b',
    4: '#196127'
};

/**
 * Adds a specified amount of days to the date
 * @param {*} date Date to add
 * @param {*} days Amount of days to add
 * @returns 
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

/**
 * Adds a contribution day. This does not update the chart.
 * @param {*} date Date object
 * @param {*} description Describes the day
 * @param {*} contributionCount How many contributions were made that day
 */
function addContributionDay(date, description, contributionCount) {
    const contributionDay = new ContributionDay(date, description, contributionCount);
    contributionDays.set(date.toISOString().split('T')[0], contributionDay);
};

/**
 * Displays the weekdays on the chart.
 * @param {*} hideWeekdays Set of weekdays to hide from the chart
 */
function setWeekdaysOnChart(hideWeekdays = []) {
    weekdaysContainer.replaceChildren();

    weekdayNames.forEach((weekday, index) => {
        if (hideWeekdays.includes(weekday)) {
            return;
        }
        const weekdayElement = document.createElement('div');
        weekdayElement.classList.add("contribution-weekday");
        weekdayElement.textContent = weekday;
        weekdayElement.style.gridRowStart = index + 1;
        weekdaysContainer.appendChild(weekdayElement);
    });
}

/**
 * Updates the contribution chart.
 * @param {*} hideWeekdays Set of weekdays to hide from the chart, the rest will be visible
 * @param {*} showMonths Shows all the months on the chart
 */
function updateContributionChart(hideWeekdays = [], showMonths = true) {
    setWeekdaysOnChart(hideWeekdays);
    monthsContainer.replaceChildren();

    let currentMonth = oneYearAgo.getMonth();
    let currentDate = new Date(oneYearAgo);
    let week = 0;
    let day = 0;
    let dateString;
    let contributionDay;
    let description;
    let level;
    while (currentDate < today) {
        currentDate = addDays(oneYearAgo, day);
        dateString = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
        week = Math.floor(day / 7);

        if (contributionDays.has(dateString)) {
            contributionDay = contributionDays.get(dateString);
            description = contributionDay.description;
            level = contributionDay.contributionCount;
        } else {
            description = "No contributions on " + currentDate.toLocaleString('default', { month: 'long' }) + " " + currentDate.getDate();
            level = 0;
        }

        const dayElement = document.createElement('div');
        dayElement.className = 'contribution-day';
        dayElement.dataset.desc = description;
        dayElement.dataset.level = level;
        dayElement.style.backgroundColor = contributionCountColors[level];
        dayElement.dataset.date = dateString;
        dayElement.style.gridColumnStart = week + 1;
        dayElement.style.gridRowStart = currentDate.getDay() + 1;
        contributionChartContainer.appendChild(dayElement);

        // Add month label at the first day of each month
        if (currentDate.getDate() === 1 && showMonths === true) {
            const monthElement = document.createElement('div');
            monthElement.classList.add("contribution-month");
            monthElement.textContent = monthNames[currentDate.getMonth()];
            monthElement.style.gridColumnStart = week + 1;
            monthElement.style.gridRowStart = 1;
            monthsContainer.appendChild(monthElement);
            currentMonth = currentDate.getMonth();
        }

        day++;
    }

}

export {addContributionDay, updateContributionChart};