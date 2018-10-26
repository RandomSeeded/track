## What features would you need to find this useful?

### Some way to actually make use of the data

- check out the daylio stats, that's a good start:
- activity count
- correlation between activities)
- chart of things over time

----

I'm thinking different types of metrics:

1. See individual entries (aka what did you answer today? What did you answer yesterday?) [done]
2. Aggregates
3. SQL :)

### Misc feature requests:

- reminders section (add phone / email)
- something better for after you've answered the questions
- canonical host url
- a name for the project [longitude]
- a description for the project
- need to provide canonical host URL: right now frontend is hardcoding in 17792
- and you can't just use relative because then you're hitting webpack dev server
- reordering of questions
- ordering of answers matches order of questions
- non-google auths
- favicons
- a logo
- deploy
- multiple select for tags questions
- How do you want to handle deleted questions? Do you want to display data for those deleted questions when you look at those previous days or not?
- TESTS TESTS TESTS (need this)
- Conditional questions

### Known bugs

- If you add a question and modify it (save or don't save) then add another question, the text from the previous question is lost
- Everything's a little wonky around question addition, because of confusion around where state is stored. If you addquestion._idquestion._id a question you cannot delete it without refreshing the page. If you change key from uuid to based on question._id, it resolves the above bug. Why? Not quite sure. Because the re-render of the parent component has a diff uuid causing the child component to rerender and it's not in the state as passed from the parent component.
- If you use question._id instead this should be solved. But we need to update the parent's question ids on successful question submission. This is doable.
- One issue: we kind of have duplicate state then between the question form and the question page - both are keeping a copy of all the questions. This is not ideal. It probably should be moved entirely to the parent.

### Bugs you actually wrote down and then actually fixed (wow)

- You really need a 'are you sure' prompt for delete [done]

### Different types of questions

Different things I want to track:

- what type of exercise? (options) [done]
- how much sleep? (numeric freeform) [done]
- happiness (done) [done]
- what activities? [done]
- Checkbox questions [done]
- deploy [done]

### Done backlog
- need a front page & sign in with google prompt [done-ish]
- Mark active page in navbar [done]


Temp stopping point:
- You need to create a new AWS user and set up config / credentials so you can log in with that user from the command line
- You need to figure out how to get tasks working correctly from the CLI
- You then need to update task definitions from the CLI to point the new task definition to the new docker image
- You then need to make a short script which builds, tags, pushes, and updates task definitions on AWS

