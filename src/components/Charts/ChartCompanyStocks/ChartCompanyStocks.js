import React, { useRef, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import * as d3 from 'd3'
import { Button, Header, Icon, Placeholder } from 'semantic-ui-react'

import { QUOTE_TYPES, COLOR_LINES } from '../../../utils/chartUtils'
import { isFreeAccountExceededError } from '../../../utils/errorUtils'
import { GET_COMPANY_CANDLES } from '../../../utils/graphql'
import { TIME_TYPE, PERIOD, RESOLUTION } from '../../../utils/timeUtils'

import DimmerFreeAccountLimit from '../../../components/Dimmers/DimmerFreeAccountLimit'

const width = 550
const height = 500
const margin = { top: 20, right: 5, bottom: 20, left: 35 }

let toTimeStamp = Math.round(new Date().setHours(0, 0, 0, 0) / 1000)
let toTimeStampForTomorrow =
  Math.round(new Date().setHours(0, 0, 0, 0) / 1000) + PERIOD[TIME_TYPE.ONE_DAY]
let selectedFrame = TIME_TYPE.ONE_DAY
let fromTimeStamp = toTimeStamp - PERIOD[selectedFrame]

/* Component */
const ChartCompanyStocks = ({ companySymbol }) => {
  const d3Container = useRef(null)

  const [showCandles, setShowCandles] = useState(false)
  const [showLines, setShowLines] = useState(false)

  const [timeFrame, setTimeFrame] = useState(TIME_TYPE.ONE_DAY)

  const [getCompanyCandles, { loading, error, data }] = useLazyQuery(
    GET_COMPANY_CANDLES,
    {
      variables: {
        symbol: companySymbol,
        resolution: RESOLUTION[selectedFrame],
        from: fromTimeStamp.toString(),
        to: toTimeStampForTomorrow.toString(),
      },
    }
  )

  function getCompanyCandlesHandler() {
    getCompanyCandles({
      variables: {
        symbol: companySymbol,
        resolution: RESOLUTION[timeFrame],
        from: (toTimeStamp - PERIOD[timeFrame]).toString(),
        to: toTimeStampForTomorrow.toString(),
      },
    })
  }

  useEffect(() => {
    getCompanyCandlesHandler()

    if (data && data.getCandles && data.getCandles.c && d3Container.current) {
      const svg = d3.select(d3Container.current)

      /* Clean previous graphs */
      svg.selectAll('*').remove()

      /* Calculate xScale */
      const extent = d3.extent(data.getCandles.t, (d) => d * 1000)

      const xScale = d3
        .scaleTime()
        .domain(extent)
        .range([margin.left, width - margin.right])

      /* Calculate yScale */
      const min = d3.min(data.getCandles.l, (l) => l)
      const max = d3.max(data.getCandles.h, (h) => h)

      const yScale = d3
        .scaleLinear()
        .domain([min, max])
        .range([height - margin.bottom, margin.top])

      /* Graphs */
      Object.keys(data.getCandles).forEach((key) => {
        if (QUOTE_TYPES.includes(key)) {
          /* Lines */
          if (showLines || (!showLines && !showCandles && key === 'c')) {
            svg
              .append('path')
              .datum(data.getCandles[key])
              .attr('fill', 'none')
              .attr('stroke', COLOR_LINES[key])
              .attr('stroke-width', 1.5)
              .attr(
                'd',
                d3
                  .line()
                  .x((d, i) => xScale(data.getCandles.t[i] * 1000))
                  .y((d) => yScale(d))
              )
          }
        } else {
          /* Candles */
          if (showCandles) {
            data.getCandles.t.forEach((d, i) => {
              /* min/max */
              svg
                .append('rect')
                .attr('x', xScale(d * 1000))
                .attr('y', yScale(data.getCandles.h[i]))
                .attr('width', 1)
                .attr(
                  'height',
                  Math.abs(
                    yScale(data.getCandles.h[i]) - yScale(data.getCandles.l[i])
                  )
                )
                .attr(
                  'fill',
                  data.getCandles.o[i] - data.getCandles.c[i] < 0
                    ? 'green'
                    : 'red'
                )
              /* gain/lost */
              svg
                .append('rect')
                .attr('x', xScale(d * 1000) - 2)
                .attr(
                  'y',
                  data.getCandles.o[i] - data.getCandles.c[i] < 0
                    ? yScale(data.getCandles.c[i])
                    : yScale(data.getCandles.o[i])
                )
                .attr('width', 5)
                .attr(
                  'height',
                  Math.abs(
                    yScale(data.getCandles.o[i]) - yScale(data.getCandles.c[i])
                  )
                )
                .attr(
                  'fill',
                  data.getCandles.o[i] - data.getCandles.c[i] < 0
                    ? 'green'
                    : 'red'
                )
            })
          }
        }
      })

      /* axis */
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale))

      svg
        .append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
    }
  }, [data, d3Container.current, showCandles, showLines, timeFrame])

  return (
    <>
      {!!data && !!data.getCandles && !!data.getCandles.c ? (
        <svg
          className="d3-component"
          width={width}
          height={height}
          ref={d3Container}
        ></svg>
      ) : loading ? (
        <Placeholder style={{ height: 500, width: 550 }} fluid>
          <Placeholder.Image square />
        </Placeholder>
      ) : (
        <div
          style={{
            height: 500,
            width: 550,
            padding: 200,
            border: '1px solid lightgrey',
            borderRadius: 5,
          }}
        >
          {error && isFreeAccountExceededError(error) && (
            <DimmerFreeAccountLimit />
          )}
          <Header as="h2" icon textAlign="center">
            <Icon color="orange" name="line graph" size="big" />
            <Header.Content>NO DATA</Header.Content>
          </Header>
        </div>
      )}

      <Button.Group style={{ paddingTop: 10 }} widths="2">
        <Button
          basic={!showCandles}
          content="Candles"
          onClick={() => setShowCandles(!showCandles)}
          color={showCandles ? 'orange' : 'grey'}
        />
        <Button
          basic={!showLines}
          content="Lines"
          onClick={() => setShowLines(!showLines)}
          color={showLines ? 'orange' : 'grey'}
        />
      </Button.Group>
      <Button.Group style={{ paddingTop: 10 }} widths="5">
        <Button
          basic={timeFrame !== TIME_TYPE.ONE_DAY}
          content="1 Day"
          disabled={data && data.getCandles && !data.getCandles.c}
          onClick={() => {
            setTimeFrame(TIME_TYPE.ONE_DAY)
          }}
          color={timeFrame === TIME_TYPE.ONE_DAY ? 'orange' : 'grey'}
        />
        <Button
          basic={timeFrame !== TIME_TYPE.ONE_WEEK}
          content="1 Week"
          onClick={() => {
            setTimeFrame(TIME_TYPE.ONE_WEEK)
          }}
          color={timeFrame === TIME_TYPE.ONE_WEEK ? 'orange' : 'grey'}
        />
        <Button
          basic={timeFrame !== TIME_TYPE.ONE_MONTH}
          content="1 Month"
          onClick={() => {
            setTimeFrame(TIME_TYPE.ONE_MONTH)
          }}
          color={timeFrame === TIME_TYPE.ONE_MONTH ? 'orange' : 'grey'}
        />
        <Button
          basic={timeFrame !== TIME_TYPE.ONE_YEAR}
          content="1 Year"
          onClick={() => {
            setTimeFrame(TIME_TYPE.ONE_YEAR)
          }}
          color={timeFrame === TIME_TYPE.ONE_YEAR ? 'orange' : 'grey'}
        />
        <Button
          basic={timeFrame !== TIME_TYPE.FIVE_YEARS}
          content="5 Year"
          onClick={() => {
            setTimeFrame(TIME_TYPE.FIVE_YEARS)
          }}
          color={timeFrame === TIME_TYPE.FIVE_YEARS ? 'orange' : 'grey'}
        />
      </Button.Group>
    </>
  )
}

export default ChartCompanyStocks
