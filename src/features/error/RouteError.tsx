export enum HTTPError {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

const FriendlyError = {
  [HTTPError.Unauthorized]: 'Unauthorized',
  [HTTPError.Forbidden]: 'Access Denied',
  [HTTPError.NotFound]: 'Page not found!',
  [HTTPError.InternalServerError]: 'Something went wrong!',
}

type RouteErrorProps = {
  type: HTTPError
}

const RouteError = (props: RouteErrorProps) => {
  const error = FriendlyError[props.type]
  return <h1>{error}</h1>
}

export default RouteError
