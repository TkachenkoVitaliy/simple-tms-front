import { useRouteError } from 'react-router-dom'

interface RouterError {
  statusText?: string
  message?: string
}

function ErrorPage() {
  // TODO: прочитать о правильной обработке ошибок (как в контексте React Router Dom так и ошибок от бекенда)
  const error = useRouteError() as RouterError

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
