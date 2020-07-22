# Stock App Web Client
This project is a simple porfolio/open source app that simulates a trading site. Providing live stock information and ability to buy and sell stocks, keeping track of all the stock operations performed by the user.

## Description
This project has the following functionalities:

- Login and Register users
- (Home page) Search by company name or ticker in the US market
- (Company page) Show the following info and interactions:
    * Show meta information for the company (logo, website, capitalization, market...)
    * Show current numerical stock quotation
    * Show interactive graph with multiple timeframes and data visualizations (multi line and candles)
    * Show list of company based operation summaries
    * Provide buy functionallity for logged users
    * Provide sell functionallity for logged users with previous purchased stocks
- (MyWallet) Show a detailed list of company operations performed by the logged user

## Tech stack:
- React > v16.8 (Hooks)
- SemanticUI
- D3
- Apollo
- MongoDB (Atlas)
- GraphQl

## Live sites:
Live App on (Netlify): https://sad-rosalind-bc9990.netlify.app/

Live GraphQL API on (Heroku): https://immense-hamlet-51418.herokuapp.com/

## Related repos:
This web client project works conjunction with this repo

(Server) https://github.com/Albertoggdm/stock-app-server

## Additional Notes:
- The state management is based on Apollo cache and Pure React Hook based functional components
- Authentication based on JWT token and localstorage (1 day expiration token)
- GraphQL centralise all queries to internal project server (users and operations data) and to third-party API (Finaltial live data)
- Main Desktop focused but some responsive features for mobile.
- (Finnhub) For live stock data https://finnhub.io/ (in order to proper fork repo create a new API Key)
- (MongDB Atlas) For cloud data base storing https://www.mongodb.com/ (in order to proper fork repo create a new account)

## Potential next steps:
- Add Typescript
- Use React GraphQL code generator
- Add tests (react-testing-library)
- Create Native React app side repo
- Improve CSS with Styled-components or similar
- Improve component decomposition and reusability
- Add Storybook for visual component representation
- Improve UI and functionallity

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
This will use the live heroku Apollo GraphQL server

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### running locally
For running locally, launch on dev mode the aside server project (start:dev) https://github.com/Albertoggdm/stock-app-server
Changing ApolloProvider httpLink uri to localhost:5000
Cloud MongoDB and FinnhubAPI key still needs to be modified on server project for complete ownership of local forked project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

