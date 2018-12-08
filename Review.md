# Review Questions

## What is Node.js?
    It's a JavaScript Runtime Environment that allows us to run JavaScript outside of the browser.

## What is Express?
    It is a JavaScript Framework that makes making servers easier. (And faster. Hence the name Express)

## Mention two parts of Express that you learned about this week.
    I learned that Express could allow us to easily make middleware, and I learned that it would allow
    us to make servers. I didn't know anything about express prior to this sprint.

## What is Middleware?
    Middleware is essentially a function that runs on our data before it reaches our API calls.
    It's software that assists the developer so that we can focus on the purpose of our application
    and not have to "rebuild the wheel"

## What is a Resource?
    A resource is something that the user might want to work with or need to experience our website. It might be receiving a list of users or posts from a database (users or posts being resources) or it could be the need to add (to) remove (from) or update any of these.

## What can the API return to help clients know if a request was successful?
    Status codes. (success codes typically start with a 2)

## How can we partition our application into sub-applications?
    With different routes.

## What is express.json() and why do we need it?
    It parses the body so that it can be read as a json object.
