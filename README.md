# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution. 
Feel free to modify the current codebase as needed, including adding or removing dependencies. 
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

When tackling this problem, it seemed to me like it was split into two fairly distinct processes. Firstly I needed to think about the database and how to access data quickly and efficiently. Secondly, there was implementation of the features whilst refactoring the program to keep code quality high.

#### The Database

I started by trying to understand the terminologies and approaches around search so that I could establish my goal, in terms of features and performance. The following are the features/solutions that I gave some consideration towards. With more time, I'm sure there would have been other areas to research.

- **Full Text Search**
  This is a database approach where an inverted index of some text is made, mapping words back to the documents where they were found. It is very useful for searching large text e.g. blog posts.
  *Pros*: Very quick. MongoDB native support.
  *Cons*: Only works for full words, meaning that a search for Franc will not match France.
- **Fuzzy Search**
  This is a category of different techniques which try to produce results which are similar to the search term. For example, correcting typos or finding words which sound similar like John and Juan.
  *Pros*: Seems very useful.
  *Cons*: That's a very deep rabbit hole...
- **Partial Search**
  This generally seems to mean "Nothing matched but here's something that's vaguely similar". This could be from querying part of the search term or other techniques.
  *Pros*: Seems very useful.
  *Cons*: That's a somewhat deep rabbit hole.
- **Wildcard Search**
  Search the database looking for results where the letters of the search term are all included in order, but where there may be other characters in between. For example, "Swed" will match both `Swed`en and `Sw`itz`e`rlan`d`.
  *Pros*: Simple to implement. Useful for the user.
  *Cons*: Not as smart as fuzzy and partial search. Potentially very slow as MongoDB will not use an index at all for regex search.
- **ngrams**
  This involves indexing fragments of the searchable field for a speed boost.
  *Pros*: Potential to use a MongoDB index whilst still being fairly trivial.
  *Cons*: After some experimentation it seemed as though the number of grams needed for the dataset in this project would be considerably too large to be useful.
- **Elasticsearch or similar**
  Elasticsearch is a premade product which is designed to handle this exact scenario.
  *Pros*: Made for this problem. Very quick. Enables fuzzy and partial search as well as extra features like autocomplete.
  *Cons*: Learning curve is supposedly steep. Costs are unclear.

#### Choosing a database strategy

I tried to consider combinations of these features and approaches but ultimately was reduced to one choice for the purpose of this test.

Firstly, I ruled out full text search and ngrams as they were not fit for purpose. Further, I came to the conclusion that if I was interested in fuzzy search and partial search then I would be best to use Elasticsearch.

Wildcard search seemed like a bad option because there was no indexing in use at all. However, for this search feature specifically, I had a feeling that it could still be considered. This is because the size of the dataset seemed likely to be fairly constrained. I made some estimates for the amount of entities which we could be dealing with.

- **Countries**: There are only around **200** countries.
- **Cities**: There are roughly **4,000** cities in the world with a population over 100,000.
- **Hotels**: If there was an average of 10 hotels in every single city (over 100,000 people) then we would need to handle **40,000** hotels. This may be a low estimate in which case we should consider, say, **100,000** hotels. However, if the service grows to handle this many hotels, then I think it is fair to say that it has been a huge success and will have the resources to refactor for scale.

Whilst inexact, I believe these figures are good enough to make decisions against.

#### Validating Wildcard Search approach

Firstly, I was aware that regex wildcard matching could grow unweildy. However, this becomes a problem as the searched field grows very large. In our case, this would be the hotel, country or city name. I validated that performance was completely negligable with even very long hotel names. 

I then moved on to real database querying. After some benchmarking I came up with the following. All of these were performed on a Macbook Pro M3 Pro, which would likely not perform as well as a production database.

|Description|Representative Time (milliseconds)|Notes|
|-|-|-|
|4,000 cities|10|
|40,000 hotels|100|
|100,000 hotels|230|
|100,000 hotels with simple regex filter|60-130|Even though we are still visiting every document, the time comes down significantly with filtering|
|100,000 hotels with very long wildcard regex filter|150|
|100,000 hotels with 6-character wildcard regex filter|100|This is representative of real results if there are 100,000 hotels|
|40,000 hotels with 6-character wildcard regex filter|50|This is representative of real results if there are 40,000 hotels|

It seems to me that building towards 50-100 milliseconds per query as the product scales is perfectly fine when coupled with caching. No-one will have a terrible experience, whilst most will have a much better experience. **This is a creative decision - I consider this acceptable for the quality of wildcard search vs the difficulty to build and the performance - however this decision would usually be made with a team and other opinions will vary.**

#### Database Conclusion

In real life, I would almost certainly look to implement Elasticsearch as the solution to this problem. However, for the purposes of this test, I have decided to implement wildcard search using a regex scan in MongoDB.

#### Notes on Caching

Whilst I made the above decision based on the need for caching, I did not get round to giving the actual solutions needed much thought. Suffice it to say that mapping an input search query to a list of results would do plenty to reduce the load on the database. Further to this, there is the potential to do something smarter by understanding which results are subsets of which other results.

Caching should be done at both the API level, to reduce hits to the database, and the client level, to reduce hits to the API.

#### Development

I won't say too much here beyond my general approach. As in real life, the work I did was a mix of adding features and gradually improving the codebase. I try to move as much logic as I can into small testable modules where the functionality is pure and therefore easy to test. I have heard this approach called "large core; thin shell" meaning that the majority of the program is cold-hard data manipulation, well away from the world of side-effects such as input and output, networking, interaction with libraries and the like. This isn't always possible but I find that it is always helpful to move futher in this direction. 

The following is a list of features/requirements I worked towards:

- Limit number of results returned from the Api
- Add search endpoint
- Consume search endpoint and show all results
- Highlight search input within results
- Fix race condition problem
- Clear search results when pressing the x button
- Show spinner when loading data
- Multiple pages
- Load single entity on the relevant page
- Caching (I have created a very very simple version in the client but not the API)
- End to end testing via Cypress

On top of this, I tried to achieve the following as I went:

- More small, pure components
- Tidiness and reduce code repetition
- Improved workflows: state, actions, reducers, routing etc

#### A Note on Testing

I generally believe that testing should be prioritised on the very small and the very large. This means the small, pure functionality mentioned above which is very simple to test as well as full browser testing. The former allows us to organise our code well and make programming simpler. The latter means we can fully trust that our customers will see a working product. I would have liked to have done a lot more testing in this demo but time constraints meant I could only do so much. Hopefully you can see enough evidence of my approach to testing.

#### Things I Didn't Do

The following are things which I made a note of but didn't do any work towards:

- Caching database hits. This is the most important job I didn't do. The solution would probably involve something like a Redis database or even some in-memory solution.
- Debouncing or throttling the search requests.
- Smart caching on the client. I made some notes in the cache I did make about how it could be smarter.
- No-results state. The results section remains hidden if there are no results. This could be an opportunity to show popular searches or promoted search results.
- Elasticsearch. As mentioned, I believe this would be a good addition to the product.
- Changing the design of the page to move the search bar upwards when there are results to show. Currently, they appear in the bottom half of the page and aren't all show on common screen sizes.
- More testing.
- Writing READMEs

Please also note that I have demonstrated close to zero knowledge around design and CSS. I would have liked to have done this but I placed it low on my priority list. The small changes I did make leant into the existing styling approach instead of refactoring it.

#### Final Thoughts

- Whilst I am very happy with what I am presenting here, I know that further research could have changed what I built. This was a solution for the time scale given.
- I have made an effort to make my git commit messages quite clear. To understand everything I have done, I would recommend git log.
- Thank you for allowing me to share my work with you!

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
