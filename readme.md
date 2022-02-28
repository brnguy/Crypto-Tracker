# NFT COLLECTION TRACKER

A platform listing the top NFT collections of each blockchain using the Covalent API, where users can track their favorite collections
---
### Technologies Used
Front-End: HTML, CSS, JavaScript
Back-End: SQL, Node, Express
API: Covalent
---
### ERDS

---
### RESTful Routing Chart
|VERB|URL PATTERN|ACTION|DESCRIPTION|
|----|-----------|------|-----------|
|GET|/|Index(Read)|List of all NFT collections|
|GET|/:id|Show(Read)|List details about a specific NFT collection|
|PUT|/:id|Add(Update)|Add NFT collection to Favorites|
|GET|/user/new|New(Read)|Shows form to create a new account|
|POST|/user/new|Create(Create)|Creates a new account|
|GET|/user/login|Login(Read)|Shows form to login|
|POST|/user/login|Authorization(Create)|Create authorization to login to account|
|GET|/user/favorites|Favorites(Read)|List of favorited NFT collections|
|DELETE|/user/favorites|Remove(Delete)|Remove NFT collection from Favorites|
|GET|/user/logout|Logout(Read)|Logout of account|
---
### Wireframes

---
### User Stories
- As a user, I want to see the most popular NFT collections so I can stay up to date on the latest trends
- As a user, I want to keep track of my favorite NFT collections so I can keep track of their activity
---
### MVP Goals
- Successful connection to Covalent API and importing data
- Home Page with list of NFT collections for each blockchain
- Pages for each specific NFT collection with more details
- Add to Favorites button to add to the user’s Favorites page
- New Account/Login Page with option to logout once logged in
- Ability to remove NFT collection from user’s Favorites page
---
### Stretch Goals
- Add Reddit/Twitter latest posts/tweets to NFT collection pages
- A Favorites page for posts/tweets
- Add Sorting and Filters/Search Bar
- Add “My Collection” tab to see collection in user’s wallet
