// ==============================|| BRANDING CONFIG ||============================== //
// Single source of truth for all branding across the Admin panel.
// Update values here to rebrand the entire application.

const branding = {
  // App name
  name: 'Guestora',
  // Tagline shown in sidebar card
  tagline: 'Manage your store with ease',
  // Admin panel suffix (e.g. "Guestora Admin")
  adminSuffix: 'Admin',
  // Full admin title
  get fullName() {
    return `${this.name} ${this.adminSuffix}`;
  },

  // Developer / author
  author: {
    name: 'Shubham',
    portfolioUrl: 'https://codeguest.in',
  },

  // Brand colors (gradient)
  colors: {
    primaryGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#667eea',
  },

  // Gradient text style (reusable sx prop for MUI Typography)
  gradientTextSx: {
    fontWeight: 800,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  // Contact info
  contact: {
    email: 'support@guestora.com',
    phone: '+1 (800) 123-4567',
  },
};

export default branding;
