import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from 'semantic-ui-react'

import { useForm } from '../../hooks'

import { GET_COMPANY_BY_TEXT } from '../../utils/graphql'

import companyPlaceholder from '../../img/companyPlaceholder.png'

const initValues = {
  companyName: '',
}

const SearchBar = () => {
  const { values, onChange, onSubmit } = useForm(
    searchCompanyHandler,
    initValues
  )
  const [getCompany, { loading, data }] = useLazyQuery(GET_COMPANY_BY_TEXT)

  function searchCompanyHandler() {
    getCompany({
      variables: { text: values.companyName },
    })
  }

  return (
    <>
      <Form onSubmit={onSubmit} noValidate>
        <Form.Group widths="equal">
          <Form.Input
            icon="building outline"
            iconPosition="left"
            placeholder="Company Name or Symbol..."
            name="companyName"
            type="text"
            value={values.CompanyName}
            onChange={onChange}
          />
          <Button
            icon
            labelPosition="right"
            color="orange"
            floated="right"
            loading={loading}
            type="submit"
          >
            Search
            <Icon name="search" />
          </Button>
        </Form.Group>
      </Form>
      <br />

      {data && data.getCompaniesByText ? (
        data.getCompaniesByText.length === 0 ? (
          <Segment placeholder>
            <Header icon>
              <Icon name="frown outline" />
              No companies found
            </Header>
          </Segment>
        ) : (
          <List selection verticalAlign="middle">
            {data.getCompaniesByText.map((item) => (
              <List.Item
                key={item.symbol}
                as={Link}
                to={`/company/${item.symbol}`}
              >
                <Image src={companyPlaceholder} size="mini" />
                <List.Content>
                  <List.Header>{item.description}</List.Header>
                  <List.Description>{item.symbol}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        )
      ) : null}
    </>
  )
}

export default SearchBar
