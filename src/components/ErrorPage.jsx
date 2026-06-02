import { useRouteError, Link } from 'react-router-dom';
import Button from './Button';
import './ErrorPage.css';

export function ErrorPageContent({ error, isCatastrophic = false }) {
  const is404 = error?.status === 404;
  const statusText = error?.statusText || error?.message || 'Unexpected Error';

  let title = 'Something went wrong.';
  let message = 'An unexpected system error occurred. We apologize for the disruption.';

  if (is404) {
    title = "It seems we've lost our path.";
    message = "The page you are looking for doesn't exist or has been relocated. Let's guide you back to the main page.";
  } else if (!isCatastrophic) {
    title = 'Access Denied.';
    message = "You do not have permission to view this resource. Let's guide you back to the main page.";
  } else {
    title = 'A critical error has occurred.';
    message = 'We encountered an unrecoverable system failure. The engineering team has been notified. Please try again later.';
  }

  return (
    <div className='error-page'>
      <div className='error-page__glow' />
      <div className='error-page__content'>
        <h1 className='error-page__code'>{error?.status || 'Oops'}</h1>
        <h2 className='error-page__title'>{title}</h2>
        <p className='error-page__message'>{message}</p>

        {!isCatastrophic && (
          <Button as={Link} to='/' label='Return to Homepage' modifiers={['medium']} />
        )}

        {error && (
          <details className='error-page__details'>
            <summary className='error-page__details-summary'>Technical Details</summary>
            <pre className='error-page__details-content'>{statusText}</pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const isClientError = error?.status >= 400 && error?.status < 500;
  return <ErrorPageContent error={error} isCatastrophic={!isClientError} />;
}
