
Containers
1. DashboardContainer
2. app.js // this should become _AppContainer
3. ResultContainer
4. root.js // can probably better find a better home for this as well
5. SearchContainer

Components:
  Here we have our dashboard component
  props:
    queryResults: Object with nested objects
    query: an Object
  we define two functions componentWillMount() and render()
  render has some logic in it, which isn't very good for reusability, then again this is a container component so having logic is kind of okay. 
  inside render, we define two initial variables: 
  1. result,
  2. query
  then we have an if statements.
    What's the purpose of this if statement? Can i do without it, what could i use here instead? Nah that's not important lets first figure out what the purpose of this if statement is.
    So it looks like that dashboard is being passed queryResults which seems to be an object that holds other objects. This observation is based on the fact that we have to use the Object.keys function to actually map out each child object inside queryResults. But what's weird is that we're only ever using the first query result so why the fuck do we not just change data structure for queryResults. If at any given time we only want to listen for one query result than that would mean that we would only ever need to just hold one query result, i mean you could just set the queryResult to one object instead of an object, with an expected interior of multiple objects if that makes sense. So here, my code review says that we should probably think through the data structures a little bit.
    but any way lets continue for a second. Remember how we defined result as the first line inside of render()? Well now we assign that variable to the value of the first Object.key(). If we do keep this, is there a more elegant way to write this line?
    then we console.log() the result which should be removed at some point.
    We also are not writiing and tests thus far, maybe you should just start from scratch with the actual dashboard. Code reuse is really important though.

1. code reuse is minimal
