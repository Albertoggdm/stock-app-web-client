export const isFreeAccountExceededError = (error) => {
  return (
    error &&
    error.graphQLErrors[0] &&
    error.graphQLErrors[0].message.includes(
      'Unexpected token A in JSON at position 0'
    )
  )
}

export const refreshPage = () => {
  window.location.reload(false)
}
