import gql from 'graphql-tag'

//  --------------------------------------------
//  USER
//  --------------------------------------------

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      username
      email
      token
      createdAt
    }
  }
`

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`

//  --------------------------------------------
//  COMPANY
//  --------------------------------------------

export const GET_COMPANY_PROFILE = gql`
  query getCompanyProfileInfo($symbol: String!) {
    getCompanyProfile(input: { symbol: $symbol }) {
      country
      currency
      exchange
      ipo
      marketCapitalization
      name
      phone
      shareOutstanding
      ticker
      weburl
      logo
      finnhubIndustry
    }
  }
`

export const GET_COMPANY_BY_TEXT = gql`
  query getCompaniesByTextQuery($text: String!) {
    getCompaniesByText(input: { text: $text }) {
      description
      symbol
      displaySymbol
    }
  }
`

export const GET_COMPANY_CANDLES = gql`
  query getCompanyCandles(
    $symbol: String!
    $resolution: String!
    $from: String!
    $to: String!
  ) {
    getCandles(symbol: $symbol, resolution: $resolution, from: $from, to: $to) {
      o
      l
      c
      h
      t
    }
  }
`

export const GET_STOCK_QUOTE = gql`
  query getStockQuoteInfo($symbol: String!) {
    getStockQuote(getStockQuoteInput: { symbol: $symbol }) {
      c
      h
      l
      o
      pc
      t
    }
  }
`

export const CREATE_OPERATION_MUTATION = gql`
  mutation createOperationMutation(
    $createOperationInput: CreateOperationInput
  ) {
    createOperation(createOperationInput: $createOperationInput) {
      id
      description
      createdAt
      pricePerAction
      numberOfActions
      companySymbol
      username
    }
  }
`

export const DELETE_OPERATION = gql`
  mutation deleteOperationMutation($operationId: ID!) {
    deleteOperation(operationId: $operationId) {
      id
      companySymbol
      description
      numberOfActions
      pricePerAction
      createdAt
    }
  }
`

export const FETCH_ALL_OPERATIONS = gql`
  {
    getOperations {
      id
      companySymbol
      description
      numberOfActions
      pricePerAction
      createdAt
    }
  }
`

export const FETCH_MY_OPERATIONS = gql`
  {
    getMyOperations {
      id
      companySymbol
      description
      numberOfActions
      pricePerAction
      createdAt
    }
  }
`
