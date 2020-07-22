import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Item, Loader } from 'semantic-ui-react'

import DimmerFreeAccountLimit from '../components/Dimmers/DimmerFreeAccountLimit'
import MyCompanyItem from '../components/MyCompanyItem/MyCompanyItem'

import { isFreeAccountExceededError } from '../utils/errorUtils'
import { FETCH_MY_OPERATIONS } from '../utils/graphql'

function MyWallet() {
  const myOperations = useQuery(FETCH_MY_OPERATIONS)
  const { loading, data, error } = myOperations

  if (error && isFreeAccountExceededError(error)) {
    return <DimmerFreeAccountLimit page />
  }

  return (
    <div>
      <h1>MyWallet</h1>
      {loading ? (
        <Loader active={loading} />
      ) : (
        <Item.Group divided>
          {data &&
            data.getMyOperations &&
            (data.getMyOperations.length === 0 ? (
              <h3>You have no active operations</h3>
            ) : (
              data.getMyOperations.map((operation) => (
                <MyCompanyItem key={operation.id} operation={operation} />
              ))
            ))}
        </Item.Group>
      )}
    </div>
  )
}

export default MyWallet
