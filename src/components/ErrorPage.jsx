import { useRouteError, Link } from 'react-router-dom';
import Button from './Button';
import './ErrorPage.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const is404 = error?.status === 404;
  const statusText = error?.statusText || error?.message || 'Unexpected Error';

  return (
    <div className='error-page'>
      <div className='error-page__glow' />
      <div className='error-page__content'>
        <h1 className='error-page__code'>{error?.status || 'Oops'}</h1>
        <h2 className='error-page__title'>
          {is404 ? "It seems we've lost our path." : 'Something went wrong.'}
        </h2>
        <p className='error-page__message'>
          {is404
            ? "The page you are looking for doesn't exist or has been relocated. Let's guide you back to the main page."
            : 'An unexpected system error occurred. We apologize for the disruption. Please return to the homepage.'}
        </p>

        <Button as={Link} to='/' label='Return to Homepage' modifiers={['medium']} />

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
