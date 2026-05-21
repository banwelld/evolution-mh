export const siteConfig = {
  // Global App Settings
  global: {
    brandName: 'Evolution Mental Health Services',
    brandShort: 'Evolution MHS',
    comingSoonText: ['', 'Coming Soon', ''],

    // UI Defaults
    ui: {
      closeLabel: 'Close',
      showMenuLabel: 'Show Menu',
      closeMenuLabel: 'Close Menu',
      closeArticleLabel: 'Close Article',
      ariaDeckView: 'Article Detail View',
      ariaCatalogList: 'Options list',
    },

    // Transitions
    transitions: {
      invalidData: 'Quote text missing or invalid.',
      ariaDivider: 'Section divider.',
    },
  },

  // The Page Layout
  // The order of these objects determines the order they appear on the site.
  // Deleting an object completely removes that section from the website.
  sections: [
    {
      type: 'hero',
      id: 'hero-view',
      menuLabel: 'Main',
      quoteFile: null,
      faqFile: null,
      config: {
        callToAction: ['your', 'evolution', 'starts here'],
        btnContactLabel: 'Start your journey',
        btnContactAria: 'Contact us to start your journey',
        btnTeamLabel: 'Find out more',
        btnTeamAria: 'Advance to the next section to find out more about us',
        logoAltText: 'The Evolution Mental Health Services logo.',
        imageAltText:
          'A young woman, pictured from the shoulders up, looks directly ahead with '
          + 'confidence and resolve from the corner of a dim room, warmly lit from '
          + 'the left.',
      },
    },
    {
      type: 'team',
      id: 'team-view',
      menuLabel: 'Our Team',
      quoteFile: 'quote-evolution-1',
      faqFile: null,
      config: {
        sectionTitle: 'The Evolution Team',
        cardButtonLabel: 'View Full Bio',
      },
    },
    {
      type: 'service',
      id: 'service-view',
      menuLabel: 'Our Services',
      quoteFile: 'quote-evolution-2',
      faqFile: 'faq-service',
      config: {
        sectionTitle: 'Our Services',
        cardButtonLabel: 'View Article',
      },
    },
    {
      type: 'contact',
      id: 'contact-view',
      menuLabel: 'Get In Touch',
      quoteFile: 'quote-evolution-3',
      faqFile: null,
      config: {
        sectionTitle: 'Get in Touch',
        introMessage:
          'We look forward to connecting with you. Please reach out with any questions '
          + 'you may have, or if you would like to schedule an initial consultation.',
        formSubmitting: 'Submitting...',
        sendButtonLabel: 'Send',
        successMessage: 'Thank you! Your message has been sent successfully.',
        failureMessage: 'Something went wrong. Please try again.',
        errorMessage:
          'Unable to connect to the server. Please check your internet connection.',
        nameLabel: 'Your name',
        emailLabel: 'Your email address',
        phoneLabel: 'Your telephone number',
        messageLabel: 'How can we help?',
        messagePlaceholder: 'I would like to inquire about...',
      },
    },
    {
      type: 'location',
      id: 'location-view',
      menuLabel: 'Our Location',
      quoteFile: 'quote-maya-angelou',
      faqFile: null,
      config: {
        sectionTitle: 'our location',
        addressHeading: 'Address',
        contactHeading: 'Contact Information',
        directionsButtonLabel: 'Get Directions',
        toggleFullscreenLabel: 'Toggle Fullscreen',
        addressLine1: '300 Eugenie St. E., Suite D',
        addressLine2: 'Windsor, ON N8X 2Y1',
        phone: '2267777124',
        email: 'info@evolutionmhs.ca',
        latitude: 42.288,
        longitude: -83.0146,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        directionsUrl:
          'https://www.google.com/maps/dir//300+Eugenie+St+E,+Windsor,+ON+N8X+2Y1/@42.2881033,-83.0171156,17z',
      },
    },
  ],
};
