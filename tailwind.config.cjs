module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: 'var(--espresso)',
        cognac: 'var(--cognac)',
        ivory: 'var(--ivory)',
        bronze: 'var(--bronze)'
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      letterSpacing: {
        widest: '0.2em'
      }
    }
  },
  plugins: []
};
