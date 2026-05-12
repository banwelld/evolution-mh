import './ContactForm.css';
import { useState } from 'react';
import Button from '../../../components/Button';

const FORM_SUBMITTING = 'Submitting...';
const SEND_BUTTON_LABEL = 'Send';
const CONTACT_SUCCESS = 'Thank you! Your message has been sent successfully.';
const CONTACT_FAILURE = 'Something went wrong. Please try again.';
const CONTACT_ERROR =
  'Unable to connect to the server. Please check your internet connection.';

const NAME_LABEL = 'Your name';
const EMAIL_LABEL = 'Your email address';
const PHONE_LABEL = 'Your telephone number';
const MESSAGE_LABEL = 'How can we help?';

export default function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: FORM_SUBMITTING });

    const formData = new FormData(e.target);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      formData.append('access_key', accessKey);
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        service: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ state: 'success', message: CONTACT_SUCCESS });
        event.target.reset(); // Clear the form on success
      } else {
        setStatus({
          state: 'error',
          message: data.message || CONTACT_FAILURE,
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({ state: 'error', message: CONTACT_ERROR });
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
        placeholder={NAME_LABEL}
        required
        disabled={isSubmitting}
      />

      <input
        id='email'
        type='email'
        name='email'
        className='form__input'
        placeholder={EMAIL_LABEL}
        required
        disabled={isSubmitting}
      />

      <input
        id='phone'
        type='text'
        name='phone'
        className='form__input'
        placeholder={PHONE_LABEL}
        required
        disabled={isSubmitting}
      />

      <div className='form__group'>
        <label htmlFor='message' className='form__label'>
          {MESSAGE_LABEL}
        </label>

        <div className='form__textarea-wrapper'>
          <textarea
            id='message'
            name='message'
            className='form__input form__textarea'
            placeholder='I would like to inquire about...'
            rows='6'
            required
            disabled={isSubmitting}
            onInput={handleAutoResize}></textarea>

          <div className='form__submit-wrapper'>
            <Button
              type='submit'
              label={isSubmitting ? FORM_SUBMITTING : SEND_BUTTON_LABEL}
              modifiers={['contact-form', 'light']}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {status.message && (
        <div
          className={`form__status form__status--${status.state}`}
          aria-live='polite'>
          {status.message}
        </div>
      )}
    </form>
  );
}
