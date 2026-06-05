import { useState } from 'react';
import Button from '../../../components/Button';
import './ContactForm.css';

export default function ContactForm({ config }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const {
    formSubmitting,
    sendButtonLabel,
    successMessage,
    failureMessage,
    errorMessage,
    nameLabel,
    emailLabel,
    phoneLabel,
    messageLabel,
    messagePlaceholder,
  } = config;

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: formSubmitting });

    const formData = new FormData(e.target);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      formData.append('access_key', accessKey);
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ state: 'success', message: successMessage });
        e.target.reset(); // Clear the form on success
      } else {
        setStatus({
          state: 'error',
          message: data.message || failureMessage,
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({ state: 'error', message: errorMessage });
    }
  };

  //  safari/firefox polyfill for field-sizing auto-expansion
  const handleAutoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const isSubmitting = status.state === 'loading';

  return (
    <form className='form form--contact' onSubmit={onSubmit}>
      <input
        id='name'
        type='text'
        name='name'
        className='form__input'
        placeholder={nameLabel}
        aria-label={nameLabel}
        required
        disabled={isSubmitting}
      />

      <input
        id='email'
        type='email'
        name='email'
        className='form__input'
        placeholder={emailLabel}
        aria-label={emailLabel}
        required
        disabled={isSubmitting}
      />

      <input
        id='phone'
        type='text'
        name='phone'
        className='form__input'
        placeholder={phoneLabel}
        aria-label={phoneLabel}
        required
        disabled={isSubmitting}
      />

      <div className='form__group'>
        <label htmlFor='message' className='form__label'>
          {messageLabel}
        </label>

        <div className='form__textarea-wrapper'>
          <textarea
            id='message'
            name='message'
            className='form__input form__textarea'
            placeholder={messagePlaceholder}
            rows='6'
            required
            disabled={isSubmitting}
            onInput={handleAutoResize}
          ></textarea>

          <div className='form__submit-wrapper'>
            <Button
              type='submit'
              label={isSubmitting ? formSubmitting : sendButtonLabel}
              modifiers={['contact-form', 'light']}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {status.message && (
        <div className={`form__status form__status--${status.state}`} aria-live='polite'>
          {status.state === 'success' && (
            <svg
              className='form__status-icon'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='20 6 9 17 4 12' />
            </svg>
          )}
          {status.state === 'error' && (
            <svg
              className='form__status-icon'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          )}
          <span>{status.message}</span>
        </div>
      )}
    </form>
  );
}
