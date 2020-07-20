import React from 'react'
import {
  Button,
  Dimmer,
  Icon,
  Item,
  Placeholder,
  Segment,
} from 'semantic-ui-react'

import { DimmerFreeAccountLimitContent } from '../../components/Dimmers/DimmerFreeAccountLimit'

/* - - - Company - - - */

export const LogoPlaceholder = () => (
  <Placeholder>
    <Placeholder.Image square />
  </Placeholder>
)

//dimensions need to be reviewed
export const ChartPlaceholder = () => (
  <Placeholder style={{ height: 500, width: 550 }} fluid>
    <Placeholder.Image />
  </Placeholder>
)

//dimensions need to be reviewed
export const HeaderPlaceholder = () => (
  <Placeholder>
    <Placeholder.Header>
      <Placeholder.Line length="medium" />
    </Placeholder.Header>
  </Placeholder>
)

export const MyOperationsPlaceholder = () => (
  <Placeholder fluid>
    <Placeholder.Line length="very long" />
    <Placeholder.Line length="very long" />
    <Placeholder.Line length="very long" />
  </Placeholder>
)

export const ProfilePlaceholder = () => (
  <Placeholder>
    <Placeholder.Header>
      <Placeholder.Line length="long" />
      <Placeholder.Line length="medium" />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line length="very short" />
      <Placeholder.Line length="very short" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="very short" />
    </Placeholder.Paragraph>
  </Placeholder>
)

export const QuotePlaceholder = () => (
  <Placeholder>
    <Placeholder.Header>
      <Placeholder.Line length="long" />
      <Placeholder.Line length="medium" />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line length="very short" />
      <Placeholder.Line length="very short" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="very short" />
    </Placeholder.Paragraph>
  </Placeholder>
)

/* - - - - MyCompanyItem - - - - */

export const MyCompanyItemPlaceholder = () => (
  <Item>
    <Placeholder style={{ height: 150, width: 150, marginRight: 20 }}>
      <Placeholder.Image square />
    </Placeholder>
    <Item.Content verticalAlign="top">
      <Placeholder fluid>
        <Placeholder.Header>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="long" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="very short" />
          <Placeholder.Line length="very short" />
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="short" />
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="long" />
          <Placeholder.Line length="very short" />
        </Placeholder.Paragraph>
      </Placeholder>
      <Item.Extra>
        <Button disabled primary floated="right">
          Details
          <Icon name="right chevron" />
        </Button>
      </Item.Extra>
    </Item.Content>
  </Item>
)

export const MyCompanyItemPlaceholderError = () => {
  return (
    <Dimmer.Dimmable blurring as={Segment} dimmed>
      <Dimmer inverted simple>
        <DimmerFreeAccountLimitContent />
      </Dimmer>
      <Item.Group>
        <MyCompanyItemPlaceholder />
      </Item.Group>
    </Dimmer.Dimmable>
  )
}
