# GitHub Fetcher: Fullstack Exercise

You are given a skeleton of frontend and backend code. On the frontend, you have jQuery and some html. On the backend, you have express and knex.

Your task is to fetch data from an API, store that data in a database, and display it on your app's index page.

### Takeaways

The primary purpose of this sprint is to give you the opportunity to compose together all the isolated concepts you've learned in the past 5 weeks; that's why this is an **exercise**, not an assessment. It'll be the first time you build a full-stack app from near-scratch.

## Getting Started

```bash
$ npm install
$ npm start
```

Tip: See the **Tips** section before you start writing any code.

## Overview

You are building a toy app that takes data from GitHub's API and stores it in your database. The way you will implement it is a bit roundabout, but that's ok – the required flow is designed to give you experience in specific areas. Here is an overview of what you'll need to do:

- When a user types in a **GitHub username** and submits the form, your app should:
  - GET that user's repos from GitHub's API using jQuery in the frontend,
  - And take those repos and POST them to your express server.
  - Your express server should then save them to the database.

- When a user visits / refreshes your page, your app should:
  - GET the top 25 repos in your express server's database.
  - Take those repos and put them on the page (i.e. render them)

Here are diagrams of the above two main points:

![onsubmit](onsubmit.png)

![onload](onload.png)

## Basic Requirements:

- [ ] Fix the error that happens when you start the server / visit the page (hint: google the error)

- [ ] Use [knex migrations](http://knexjs.org/#Migrations-CLI) to create a `repos` table. It should have columns for the repo's name, the owner's username, and the repo's number of stargazers.

- [ ] When a user types a github username into the text field, use jQuery to fetch that user's GitHub repositories from the [GitHub API](https://developer.github.com/v3/).

- [ ] Still using jQuery, send the data you get from GitHub to your express server via `POST /repos/import`. This endpoint should store that data in the database.

    - [ ] Ensure there are no duplicate repos. If you happen to import the same repo twice, it should only show up once in your database. See the tips section about considering unique columns.

- [ ] Write a `GET /repos` endpoint that retrieves the top 25 repos stored in your database, sorted by most stargazers

- [ ] When the page loads, you should fetch `GET /repos` using jQuery and display the repo information on the page in an HTML table.

- [ ] Make each repo's name in the table link to that repo's page on GitHub.

- After an import, update the page with the latest top 25 **without requiring a page refresh**.
  - Make sure there are no duplicates.

- [ ] After completing all of the above requirements, put in a help ticket to demo your app to a Hacker in Residence.

**DO NOT MOVE ON TO Extra Credit UNTIL YOU HAVE DEMOED YOUR APP!**

## Extra Credit:

- Use [AuthPort](https://github.com/mindeavor/authport) to implement a "Sign in with GitHub" button. Be sure to:
  - Store the GitHub access token into the user's session when they signs in
  - Use the user's GitHub access token to make any GitHub API requests
  - Display a "sign out" button when the user is signed in.

- After an import, display a "X new repos imported, Y repos updated" message.
  - This will require the server to send back this information in the POST response.


## Advanced Content:

Add the following additional pages, complete with navigation (you can use a frontend framework if you'd like):

- When importing a repo, store the contributors for each repo as well. This will require at least one more table.
- A users page that lists all the users in your database
  - Each user's username should be a link that takes you to that user's page (see next bullet)
- A user page that displays that user's top 10 repos (in your database)
  - Each repo should be linked to its respective page on GitHub.com
  - Display a "friends list", where each friend is a contributor of any of the user's repos.

## Tips

- Don't use any 3rd party libraries on the frontend; just stick with jQuery.
  - Write all your frontend code in `index.html`. Don't worry about build systems or anything of the sort.

- Try not to reference any code in your past projects. Instead, use google as your primary source of information.

```
Example: "How do I create a migration in knex?"

Solution:
  1. Google the above question
  2. Prioritize official docs
    – In this case, knex docs
    - Do a search (command + f) on the docs page and search for your subject (migrations)
    - Read
  3. If official docs are too obscure, look for a stack overflow question
     (from the google page you brought up earlier)
  4. Read the question content and make sure it's relevant
  5. If you find a good answer:
    - Try to understand it conceptually
    - Copy/paste into your own project
    - Tweak pasted code to work with your project
```

- You should learn how to be autonomous on the "how to do" (see previous bullet). However, if you don’t know “what to do", you should open a help ticket pretty quick.

  - It’ll be the same on the job. Your co-workers won’t have time to go over every "how to do" question you might have, but they will always be willing to go over the “what to do” strategies and approaches.

- The GitHub API endpoint you need to fetch from is a public endpoint, so you won't need any API keys (unless you make too many requests in one day. In that case you'll need to create and use a [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)).

- To avoid duplicate repos, you first must decide which column(s) you should use to determine uniqueness. Then, you can take one of the following approaches:
  - Attept to find the repo you are importing. If it exists, update. Otherwise, insert.
  - Use SQLite's `INSERT OR REPLACE` feature.

- Don't forget you can use [SQLite Browser](http://sqlitebrowser.org/) to inspect and debug the contents of your database.
