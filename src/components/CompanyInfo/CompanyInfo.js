import React from 'react'

import { Flag } from 'semantic-ui-react'

function CompanyInfo({ companyProfileData }) {
  const {
    country,
    exchange,
    marketCapitalization,
    currency,
    weburl,
    phone,
  } = companyProfileData

  return (
    <>
      <div>
        <span>
          <strong>Market : </strong>
          {`${exchange} `}
          <Flag name={country.toLowerCase()} />
        </span>
      </div>
      <div>
        <span>
          <strong>Capitalization : </strong>
          {`${marketCapitalization} M`}
        </span>
      </div>
      <div>
        <span>
          <strong>Currency : </strong>
          {currency}
        </span>
      </div>
      <div>
        <span>
          <strong>Website : </strong>
          <span as="a">
            <a href={weburl} target="_blank">
              {weburl}
            </a>
          </span>
        </span>
      </div>
      <div>
        <span>
          <strong>Telephone : </strong>
          {phone}
        </span>
      </div>
    </>
  )
}

export default CompanyInfo
