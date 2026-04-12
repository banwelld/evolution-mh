import { useState } from 'react';
import Button from '../../../components/ui/Button';
import { UiLabel as label, UiText as text } from '../../../config/constants';

export default function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: label.FORM_SUBMITTING });

    const formData = new FormData(event.target);
    // Web3Forms access key
    formData.append('access_key', 'b5c6ba43-352c-4c10-a884-761cc9a5d245');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ state: 'success', message: text.CONTACT_VIEW_SUCCESS });
        event.target.reset(); // Clear the form on success
      } else {
        setStatus({
          state: 'error',
          message: data.message || text.CONTACT_VIEW_FAILURE,
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({ state: 'error', message: text.CONTACT_VIEW_ERROR });
    }
  };

  // Robust Firefox/Safari polyfill for field-sizing auto-expansion
  const handleAutoResize = (e) => {
    e.target.style.height = 'auto'; // Reset constraint natively
    e.target.style.height = `${e.target.scrollHeight}px`; // Expand perfectly to hidden text height
  };

  const isSubmitting = status.state === 'loading';

  return (
    <form className='form form--contact' onSubmit={onSubmit}>
      <div className='form__group'>
        <input
          id='name'
          type='text'
          name='name'
          className='form__input'
          placeholder={label.FORM_NAME_LABEL}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className='form__group'>
        <input
          id='email'
          type='email'
          name='email'
          className='form__input'
          placeholder={label.FORM_EMAIL_LABEL}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className='form__group'>
        <label htmlFor='message' className='form__label'>
          {label.FORM_MESSAGE_LABEL}
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
              label={
                isSubmitting ? label.FORM_SUBMITTING : label.FORM_SUBMIT_BUTTON
              }
              modifiers={['contact-form']}
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
