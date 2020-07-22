import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button, Icon, Item, Label, Popup, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import {
  MyCompanyItemPlaceholder,
  MyCompanyItemPlaceholderError,
} from '../../components/Placeholders'

import companyPlaceholder from '../../img/companyPlaceholder.png'

import { GET_COMPANY_PROFILE } from '../../utils/graphql'
import { isFreeAccountExceededError } from '../../utils/errorUtils'

function MyCompanyItem({ operation }) {
  const { loading, data, error } = useQuery(GET_COMPANY_PROFILE, {
    variables: { symbol: operation.companySymbol },
  })
  const {
    companySymbol,
    description,
    createdAt,
    numberOfActions,
    pricePerAction,
  } = operation

  const currency = data ? data.getCompanyProfile.currency : null
  const companyName = data ? data.getCompanyProfile.name : null
  const companyIndustry = data ? data.getCompanyProfile.finnhubIndustry : null
  const companyTicker = data ? data.getCompanyProfile.ticker : null
  const companyLogo = data ? data.getCompanyProfile.logo : null
  const companyWebsite = data ? data.getCompanyProfile.weburl : null
  const companyMarketCapitalization = data
    ? data.getCompanyProfile.marketCapitalization
    : null

  return (
    <>
      {loading && <MyCompanyItemPlaceholder />}
      {error && isFreeAccountExceededError(error) && (
        <MyCompanyItemPlaceholderError />
      )}
      {data && (
        <Item>
          <Item.Image
            size="small"
            src={companyLogo || companyPlaceholder}
            as={Link}
            to={`/company/${companySymbol}`}
          />

          <Item.Content verticalAlign="top">
            <Item.Header as={Link} to={`/company/${companySymbol}`}>
              {`${companyName} `}
              <Label color="orange" content={companyTicker} />
            </Item.Header>
            <Item.Meta>
              <span className="cinema" as="a">
                <a href={companyWebsite} target="_blank">
                  {companyWebsite}
                </a>
              </span>
            </Item.Meta>

            <Item.Description>{description}</Item.Description>
            <Popup
              content={moment(createdAt).format('llll')}
              trigger={
                <Item.Description>
                  {moment(createdAt).fromNow()}
                </Item.Description>
              }
            />

            <Item.Description>
              <Statistic size="tiny" horizontal>
                <Statistic.Value>{numberOfActions}</Statistic.Value>
                <Statistic.Label>stocks</Statistic.Label>
              </Statistic>
              <Statistic size="tiny" horizontal>
                <Statistic.Label>X</Statistic.Label>
              </Statistic>
              <Statistic size="tiny" horizontal>
                <Statistic.Value>{pricePerAction}</Statistic.Value>
                <Statistic.Label>{currency}</Statistic.Label>
              </Statistic>
            </Item.Description>

            <Item.Extra>
              <Label color="green" basic>
                {companyIndustry}
              </Label>
              <Label
                icon="money bill alternate outline"
                content={companyMarketCapitalization}
              />
              <Button
                primary
                floated="right"
                as={Link}
                to={`/company/${companySymbol}`}
              >
                Details
                <Icon name="right chevron" />
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      )}
    </>
  )
}

export default MyCompanyItem
