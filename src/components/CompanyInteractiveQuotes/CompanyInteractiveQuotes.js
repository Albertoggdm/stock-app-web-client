import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Button, Divider, Input, Statistic } from 'semantic-ui-react'

import { AuthContext } from '../../context/authContext'

import {
  CREATE_OPERATION_MUTATION,
  FETCH_MY_OPERATIONS,
} from '../../utils/graphql'

function CompanyInteractiveQuotes({
  companyQuoteData,
  companyProfileData,
  numberOfActions,
  setNumberOfActions,
}) {
  const { currency, name, ticker } = companyProfileData

  const {
    c: currentPrice,
    pc: previousClosingPrice,
    o: openingTodayPrice,
    l: lowestTodayPrice,
    h: highestTodayPrice,
  } = companyQuoteData

  const { user } = useContext(AuthContext)
  const username = user ? user.username : ''

  /* CREATE OPERATION */
  const [createOperation, { error: errorMutation }] = useMutation(
    CREATE_OPERATION_MUTATION,
    {
      variables: {
        createOperationInput: {
          description: `${username} creates an operation buying ${numberOfActions} stocks @ ${currentPrice}  ${currency} from ${name}`,
          pricePerAction: currentPrice,
          numberOfActions: numberOfActions,
          companySymbol: ticker,
        },
      },
      update(proxy, result) {
        const cacheMyOperations = proxy.readQuery({
          query: FETCH_MY_OPERATIONS,
        })

        const newCacheMyOperations = {
          getMyOperations: [
            result.data.createOperation,
            ...cacheMyOperations.getMyOperations,
          ],
        }
        proxy.writeQuery({
          query: FETCH_MY_OPERATIONS,
          data: newCacheMyOperations,
        })
      },
    }
  )

  /* HANDLERS - STOCKS INPUT */
  const onChangeActionNumberValue = (e) => {
    if (Number.isInteger(parseInt(e.target.value))) {
      setNumberOfActions(parseFloat(e.target.value))
    } else if (e.target.value === '') {
      setNumberOfActions(0)
    }
  }

  const onClickIncrementActions = () => {
    setNumberOfActions(numberOfActions + 1)
  }

  const onClickDecrementActions = () => {
    setNumberOfActions(numberOfActions - 1)
  }

  return (
    <>
      <Statistic.Group widths="one" size="tiny" style={{ marginBottom: 10 }}>
        <Statistic
          color={openingTodayPrice < currentPrice ? 'green' : 'red'}
          label="Current price"
          value={`${currentPrice} ${currency}`}
        />
      </Statistic.Group>
      <div>
        <Button
          fluid
          color="orange"
          disabled={!user}
          onClick={() => {
            createOperation()
          }}
        >
          BUY NOW
        </Button>
        <Input
          disabled={!user}
          type="text"
          placeholder={numberOfActions}
          value={numberOfActions}
          onChange={onChangeActionNumberValue}
          action
          fluid
          style={{ paddingTop: 10 }}
        >
          <Button
            icon="minus"
            disabled={!user}
            onClick={onClickDecrementActions}
          />
          <input
            style={{
              textAlign: 'center',
              marginRight: 10,
              marginLeft: 10,
            }}
          />
          <Button
            icon="add"
            disabled={!user}
            onClick={onClickIncrementActions}
          />
        </Input>
      </div>
      <Divider />
      <Statistic.Group widths="two" size="mini">
        <Statistic label="Prev" value={previousClosingPrice} />
        <Statistic label="Opening" value={openingTodayPrice} />
      </Statistic.Group>
      <Divider />
      <Statistic.Group widths="two" size="mini">
        <Statistic label="Lowest" value={lowestTodayPrice} />
        <Statistic label="Highest" value={highestTodayPrice} />
      </Statistic.Group>
    </>
  )
}

export default CompanyInteractiveQuotes
