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

- migrate from fargate to ec2 (way cheaper)
- need frontpage [have a better title, what else do you need? Images showing what it is. Collection of heros, probably]
- need wizard / template [blocker]
- reminders should have a link to the service [blocker]
- reminders don't actually follow the 6pm EST functionality right now
- reminders need to have unsubscribe functionality
- reminders should be more customizeable
- edit previous answers [blocker]
- when session expires something should happen - you shouldn't lose your progress in answering questions
- need to add logs
- something better for after you've answered the questions (currently: 'all done')
- a description for the project
- reordering of questions
- ordering of answers matches order of questions
- non-google auths
- favicons
- multiple select for tags questions [e.g: what activities did you do today? would be good to be able to select multiple]
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
- reminders section (add phone / email) [done]
- a name for the project [longitude] [done]
- canonical host url [done]
- deploy [done]
- answers page should work before any answers saved [blocker] [done]
- should be able to add multiple questions without shit breaking [blocker]
- a logo [done]
- display of long freeform answers goes off page [blocker] [done]
- reminders need to look up phone numbers instead of sending all texts to me [blocker]
- ssl [blocker]
- fix port [blocker] [done]
- phone numbers should get formatted correctly automatically [blocker]
- setting a phone number should make it clear that it's been set (disable save button? display current phone number on record?) [done]
- jump to first and last answer [done]
