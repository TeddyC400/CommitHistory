# CommitHistory

CommitHistory replicates GitHub's contribution chart by being much more lightweight and convenient to use.

## How To Use

Insert ```id="contribution-container"``` into an HTML tag.
```js
<div id="contribution-container"></div>
```

Import the following functions from the CommitHistory script:
```js
import {addContributionDay, updateContributionChart, setCustomColors} from '/commithistory.js';
```

After that, just call ```addContributionDay``` to add a day with the following date, description, and contribution count.
```js
let today = new Date(2024, 10, 5);
addContributionDay(date, "4 contributions on October 5", 4);

// This function will update the chart to render the contributions
updateContributionChart();

// If you don't like including certain weekdays on the sidebar
updateContributionChart(['Sun', 'Tue', 'Thu', 'Sat']); // Excludes Sunday, Tuesday, Thursday, and Satuday

// If you don't like including months on the top bar
updateContributionChart([], false);
```

Want to change the color scheme of the contribution counts?
```js
setCustomColors(
    {
        0: '#ffc0cb',
        1: '#ffb6c1',
        2: '#ff69b4',
        3: '#ff1493',
        4: '#db7093',
    }
);
```

Note: If the contribution count goes past the maximum value, the last key-value pair set in the list will be used for the color.

That's it! To customize the style of the chart, just select specific element IDs inside the contribution chart. 