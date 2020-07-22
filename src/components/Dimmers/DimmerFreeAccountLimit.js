import React, { useEffect, useState, useRef } from 'react'
import { Button, Dimmer, Header, Icon } from 'semantic-ui-react'
import moment from 'moment'

import { refreshPage } from '../../utils/errorUtils'

const COUNTDOWN_FROM = 60

export function DimmerFreeAccountLimitContent() {
  const initialTimeRef = useRef(Math.floor(new Date() / 1000))
  const [time, setTime] = useState(Math.floor(new Date() / 1000))

  let counter =
    COUNTDOWN_FROM -
    moment(time * 1000).diff(moment(initialTimeRef.current * 1000), 'seconds')
  counter = counter > 0 ? counter : 0

  const counterMsg =
    counter > 0
      ? `Free account limit exceeded. Please wait ${counter} seconds for the next query`
      : 'Please click here for getting new data'

  useEffect(() => {
    const timer = setTimeout(() => setTime(Math.floor(new Date() / 1000)), 1000)
    return () => clearTimeout(timer)
  }, [counter])

  return (
    <>
      <Header color="grey" as="h4" icon style={{ marginTop: 40 }}>
        <Icon name="clock outline" />
        <Header.Content>{counterMsg}</Header.Content>
      </Header>
      <div>
        <Button color="orange" onClick={refreshPage} disabled={!!counter}>
          Reload
        </Button>
      </div>
    </>
  )
}

function DimmerFreeAccountLimit({ page = false }) {
  return (
    <Dimmer active page={page}>
      <DimmerFreeAccountLimitContent />
    </Dimmer>
  )
}

export default DimmerFreeAccountLimit
