# ANWB Case

A small tool to help users calculate the cheapest plan options when adjusting their continuous travel insurance.

## Getting Started

To install this application, follow these steps in the CLI:

1. Clone this repository

```sh
$ git clone https://github.com/WesselSmit/anwb-case.git
```

2. Navigate to the local folder root

```sh
$ cd anwb-case
```

3. Install the dependencies

```sh
$ npm install-clean
```

4. Run the application

```sh
$ npm run start
```

## Testing

The codebase currently only has unit tests, which use vitest. Only lib functions are currently tested. This is because they are likely to change and are critical to the project. Testing UI components seems less critical.

### Using tests

To run the unit test suite, run:

```sh
$ npm run test:unit
```

I tried to focus on testing whether the getAdvice function actually returns the correct advice in various contexts and with different parameters. For this, I set up mocks to mock the actual matrix that is being used, this because it might change over time and we do not want to update our test files only because a value has been changed (and/or maybe the matrix is even managed by another source; keep the tests pure).

Besides testing whether the correct values are returned, it's also important to test the error handling since this function depends on user input.

## Decisions and thought processes

### Mindset

I tried to keep things simple and ready to be expanded if necessary, but on the other hand, I want to show that I like to work modular and reusability is, of course, also very important.

I am not one to quickly reach for packages because it introduces a lot of possible problems and responsibility in the long term. The only dependencies I added, besides what Vite, TS, and React use out-of-the-box, are:
- `vitest` for testing
- `nanoid` for creating unique IDs
- `clsx` for applying multiple classes/conditionally adding classes to elements

I tried to implement all the necessary accessibility tricks to give the end user a nice experience and make sure as many people as possible can use the app.

### Business logic

For this case, I received 2 tables with different combinations, they are likely to change over time and should thus be easy to adjust.

There are multiple ways you can interpret this statement. Either the values in the tables can change and/or the tables themselves can change (e.g. more parameters/conditions).

> I based my design around the assumption that only the values are likely to change. If more than the values change, some modifications would need to be made to the business logic.

The easiest way to implement is a bunch of if/else statements, but this does not scale, is hard to grasp, prone to errors, and will be a pain in the ass to maintain. So I tried to find other ways to approach the problem.

I went with a 'matrix' which is essentially a table created with arrays. I chose this approach because:
- it's easy to change; it does not take up a lot of (mental) space and is easy to understand for developers.
- the values can be easily updated/swapped, without duplication. This makes it less prone to errors.

If the matrix values need to be updated in other ways than foreseen, you'd need a more advanced API around the matrix, and other solutions might be more viable options. But with the correct parameters, those options would be overkill.

> I separated the rules-matrix into its own file, to illustrate it could also be provided by a 3rd party/outside source.

I think a more visual editor would be a great way to manage decision trees like these. It offers a better overview and this makes it possible to manage it outside of the codebase, which would mean no developer would be necessary to make (small) changes to the decision tree. Visual editors could easily output a matrix like this (which could then be fetched in this app to ensure the latest matrix changes are used).

<details>
<summary>Other alternatives I considered:</summary>

#### If/else statements
Hard to read and error-prone.
```js
function getAdviceTraditional(numberOfPeople, duration, isEU) {
  if (isEU) {
    if (numberOfPeople === 1) {
      if (duration <= 13) {
        return 'tijdelijke dekking afsluiten';
      } else {
        return 'dekking op huidige verzekering wijzigen';
      }
    } else if (numberOfPeople === 2) {
      // ...
    }
  } else {
    // ...
  }
}
```

#### Decision trees
More verbose (and thus slightly harder to read) and overkill when using simple conditions. Would be a good solution if the matrix has more complex conditions.
```js
const decisionTree = {
  EU: {
    1: {
      condition: (days) => days <= 13,
      trueResult: 'tijdelijke dekking afsluiten',
      falseResult: 'dekking op huidige verzekering wijzigen'
    },
    2: {
      // ...
    }
  },
  NON_EU: {
    // ...
  }
};

function getAdviceTree({ numberOfPeople, duration, isEU }) {
  const region = isEU ? 'EU' : 'NON_EU';
  const rule = decisionTree[region][numberOfPeople];
  return rule.condition(duration) ? rule.trueResult : rule.falseResult;
}
```

</details>

### Managing content

This is a proof of concept and not a production app. For a production-grade app, I would use a CMS or some other way to manage the content (and rules-matrix).

For the proof of concept, I have separated the messages/copy into its own file (`src/data/messages.json`). In a production app, this would be fetched/dumped pre-build and imported at runtime. For now, it's hardcoded.

These messages have types thanks to `src/types/global.d.ts`. In a production-ready app, these would be generated pre-build using a tool like Swagger.

### Expanding the app

Further ideas to improve the app would be:
- improve the test setup, e.g., run tests on each commit/PR and prevent committing/merging if a test fails (e.g., GitHub Actions)
- implement more tests/different kinds of testing (e.g., e2e)
- implement linting/formatting on commits (can also be coupled with GitHub Actions)
- implement a 3rd-party system for managing content and/or matrix
