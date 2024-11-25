# CommitHistory

CommitHistory replicates GitHub's contribution chart by being much more lightweight and convenient to use.

## How To Use

Setup a parent HTML element for the commit history chart to be inserted into:
```html
<div id="commit-history-container"></div>
```

Import the class, reference the parent element, and initialize the object:
```ts
import { CommitHistory } from '/commithistory.js';

const container = document.getElementById('commit-history-container');
const commitHistory = new CommitHistory();
commitHistory.create(container); // This will build the chart in HTML
```

However, just creating the chart is not enough:
```ts
// Add a new commit to the chart
commitHistory.addCommit({
    date: new Date(2024, 10, 5),
    description: '4 new contributions on October 5th',
    contributionCount: 4,
});

// Customize the contribution description when there are no commits on that particular day
commitHistory.setEmptyDayDescription((date: Date) => `No contributions on ${date}`);

// Don't like the default color schemes, call this method to change the colors
commitHistory.setColors(
    {
        0: '#ffc0cb',
        1: '#ffb6c1',
        2: '#ff69b4',
        3: '#ff1493',
        4: '#db7093',
    }
);

// Update the chart with new changes made
commitHistory.updateChart();
```
