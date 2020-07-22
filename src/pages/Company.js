import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Modal,
  Label,
  Transition,
} from 'semantic-ui-react'

import ChartCompanyStocks from '../components/Charts/ChartCompanyStocks/ChartCompanyStocks'
import CompanyInfo from '../components/CompanyInfo/CompanyInfo'
import CompanyOperationItem from '../components/CompanyOperationItem/CompanyOperationItem'
import DimmerFreeAccountLimit from '../components/Dimmers/DimmerFreeAccountLimit'
import {
  LogoPlaceholder,
  HeaderPlaceholder,
  MyOperationsPlaceholder,
  ProfilePlaceholder,
  QuotePlaceholder,
} from '../components/Placeholders'

import companyPlaceholder from '../img/companyPlaceholder.png'

import { isFreeAccountExceededError } from '../utils/errorUtils'
import {
  DELETE_OPERATION,
  GET_COMPANY_PROFILE,
  GET_STOCK_QUOTE,
  FETCH_MY_OPERATIONS,
} from '../utils/graphql'
import CompanyInteractiveQuotes from '../components/CompanyInteractiveQuotes/CompanyInteractiveQuotes'

function Company(props) {
  const companySymbol = props.match.params.companySymbol || ''

  const [operationToDelete, setOperationToDelete] = useState(null)

  const [numberOfActions, setNumberOfActions] = useState(100)

  /* PROFILE */
  const companyProfile = useQuery(GET_COMPANY_PROFILE, {
    variables: { symbol: companySymbol },
  })
  const {
    loading: profileLoading,
    data: profileData,
    error: profileError,
  } = companyProfile
  const currency = companyProfile.data
    ? companyProfile.data.getCompanyProfile.currency
    : null
  const companyName = companyProfile.data
    ? companyProfile.data.getCompanyProfile.name
    : null
  const companyIndustry = companyProfile.data
    ? companyProfile.data.getCompanyProfile.finnhubIndustry
    : null
  const companyTicker = companyProfile.data
    ? companyProfile.data.getCompanyProfile.ticker
    : null
  const companyLogo = companyProfile.data
    ? companyProfile.data.getCompanyProfile.logo
    : null

  /* QUOTE */
  const stockQuote = useQuery(GET_STOCK_QUOTE, {
    variables: { symbol: companySymbol },
  })
  const {
    loading: quoteLoading,
    data: quoteData,
    error: quoteError,
  } = stockQuote
  const currentPrice = stockQuote.data ? stockQuote.data.getStockQuote.c : null

  /* MY OPERATIONS */
  const myOperations = useQuery(FETCH_MY_OPERATIONS)
  const {
    loading: myOperationsLoading,
    data: myOperationsData,
    error: myOperationsError,
  } = myOperations

  const myCompanyOperations = myOperationsData
    ? myOperationsData.getMyOperations.filter(
        (op) => op.companySymbol === companySymbol
      )
    : []

  /* DELETE OPERATION */
  const [deleteOperationMutation] = useMutation(DELETE_OPERATION, {
    update(proxy, result) {
      const cacheMyOperations = proxy.readQuery({
        query: FETCH_MY_OPERATIONS,
      })

      const newCacheMyOperations = {
        getMyOperations: cacheMyOperations.getMyOperations.filter(
          (op) => op.id !== result.data.deleteOperation.id
        ),
      }
      proxy.writeQuery({
        query: FETCH_MY_OPERATIONS,
        data: newCacheMyOperations,
      })
    },
  })

  /* HANDLERS - SELL */
  const onSellOperation = (operation) => {
    deleteOperationMutation({
      variables: {
        operationId: operation.id,
      },
    })
    setOperationToDelete(null)
  }

  if (
    (myOperationsError && isFreeAccountExceededError(myOperationsError)) ||
    (profileError && isFreeAccountExceededError(profileError)) ||
    (quoteError && isFreeAccountExceededError(quoteError))
  ) {
    return <DimmerFreeAccountLimit page />
  }

  /* RENDER */
  return (
    <div>
      {companyProfile.loading ? (
        <HeaderPlaceholder />
      ) : (
        companyProfile.data && (
          <h1 color="orange">
            {`${companyName} `}
            <Label color="orange" content={companyTicker} />
            <Label color="green" basic>
              {companyIndustry}
            </Label>
          </h1>
        )
      )}

      <Grid divided="vertically">
        <Grid.Row columns={2} stretched>
          <Grid.Column mobile={16} computer={8}>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column mobile={16} computer={8}>
                  {companyProfile.loading ? (
                    <LogoPlaceholder />
                  ) : (
                    companyProfile.data && (
                      <Image src={companyLogo || companyPlaceholder} fluid />
                    )
                  )}
                </Grid.Column>
                <Grid.Column mobile={16} computer={8}>
                  {stockQuote.loading ? (
                    <QuotePlaceholder />
                  ) : (
                    stockQuote.data &&
                    companyProfile.data && (
                      <CompanyInteractiveQuotes
                        companyProfileData={profileData.getCompanyProfile}
                        companyQuoteData={quoteData.getStockQuote}
                        numberOfActions={numberOfActions}
                        setNumberOfActions={setNumberOfActions}
                      />
                    )
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {stockQuote.loading ? (
                    <ProfilePlaceholder />
                  ) : (
                    companyProfile.data && (
                      <CompanyInfo
                        companyProfileData={profileData.getCompanyProfile}
                      />
                    )
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <ChartCompanyStocks
              companySymbol={companySymbol}
              title="Stocks Chart"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {stockQuote.loading ? (
              <MyOperationsPlaceholder />
            ) : (
              <Transition.Group duration={3000}>
                {myCompanyOperations &&
                  stockQuote.data &&
                  companyProfile.data &&
                  myCompanyOperations.map((operation) => (
                    <div key={operation.id}>
                      <CompanyOperationItem
                        operation={operation}
                        companyProfile={companyProfile}
                        stockQuote={stockQuote}
                        setOperationToDelete={setOperationToDelete}
                      />
                    </div>
                  ))}
              </Transition.Group>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {!!operationToDelete && stockQuote.data && (
        <Modal
          open={!!operationToDelete}
          onClose={() => setOperationToDelete(null)}
          size="small"
        >
          <Header
            icon="money"
            color="orange"
            content={`Selling ${companyName} (${operationToDelete.companySymbol})`}
          />
          <Modal.Content>
            <span>{`Do you want to sell ${
              operationToDelete.numberOfActions
            } stocks X ${currentPrice} ${currency} with a balance of ${(
              operationToDelete.numberOfActions *
              (currentPrice - operationToDelete.pricePerAction)
            ).toFixed(2)}  ${currency} ?`}</span>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => setOperationToDelete(null)}>
              <Icon name="cancel" /> Cancel
            </Button>
            <Button
              color="green"
              onClick={() => {
                onSellOperation(operationToDelete)
              }}
            >
              <Icon name="checkmark" /> Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  )
}

export default Company
