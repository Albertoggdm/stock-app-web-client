import React from 'react'
import moment from 'moment'
import {
  Button,
  Divider,
  Grid,
  Icon,
  Label,
  Popup,
  Statistic,
} from 'semantic-ui-react'

function CompanyOperationItem({
  operation,
  companyProfile,
  stockQuote,
  setOperationToDelete,
}) {
  const { id, createdAt, numberOfActions, pricePerAction } = operation
  const currentPrice = stockQuote.data.getStockQuote.c
  const currency = companyProfile.data.getCompanyProfile.currency

  const color = pricePerAction < currentPrice ? 'green' : 'red'
  const variation = currentPrice - pricePerAction
  const variationPercent = (currentPrice / pricePerAction - 1) * 100

  return (
    <div key={id}>
      <Grid verticalAlign="middle" textAlign="center">
        <Grid.Row>
          <Grid.Column mobile={16} computer={4}>
            <div>
              <Statistic size="mini">
                <Statistic.Value>{numberOfActions}</Statistic.Value>
                <Statistic.Label>stocks</Statistic.Label>
              </Statistic>
              <Statistic size="tiny" horizontal>
                <Statistic.Label>X</Statistic.Label>
              </Statistic>
              <Statistic
                size="tiny"
                horizontal
                color={variation ? color : 'black'}
              >
                <Statistic.Value>{pricePerAction.toFixed(2)}</Statistic.Value>
                <Statistic.Label>{currency}</Statistic.Label>
              </Statistic>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            {variation ? (
              <Label
                color={color}
                size="large"
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <Icon name={`caret ${color === 'green' ? 'up' : 'down'}`} />
                {`${variation.toFixed(2)} (${variationPercent.toFixed(2)})%`}
              </Label>
            ) : null}
          </Grid.Column>
          <Grid.Column computer={7} only="computer" textAlign="left">
            <Popup
              content={moment(createdAt).format('llll')}
              trigger={
                <span color="grey" style={{ marginLeft: 15 }}>
                  {moment(createdAt).fromNow()}
                </span>
              }
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={2}>
            <Button fluid onClick={() => setOperationToDelete(operation)}>
              SELL NOW
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </div>
  )
}
export default CompanyOperationItem
