module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // purge: [],
  darkMode: false, // or 'media' or 'class'
 
  theme: {
    extend: {
      maxWidth: {
        '1/3': '33%',
        '1/2': '50%',
        '3/4': '75%'
      },
      minHeight: {
        '3/4-vh': '75vh'
      },
      colors: {
        main: {
          DEFAULT: '#050A4D',
          light: '#727497',
          lighter: '#A3A6CC'
        },
        paragraph: '#727497',
        'main-hover': '#212773',
        'dark-main': ' #00021F',
        secondary: {
          DEFAULT: '#049A59',
          light: '#27af74'
        },
        tertiary: {
          DEFAULT: '#F1DF43'
        },
        // Styling colors
        'custom-grey': '#727497',
        'footer-text': '#727497',
        emerald: '#049A59',
        'violet': '#A3A6CC'
      },
      boxShadow: {
        'around-sm': '0px 0px 16px 2px rgba(0, 0, 0, 0.05), 0px 4px 16px 2px rgba(0, 0, 0, 0.05)'
      },
      gridTemplateColumns: {
        'shift-table': '2fr 1fr 1fr 1fr 60px',
        'shift-table_dashboard': '2fr 2fr 1fr 150px 70px 50px',
        'profile_images': '100px 100px 100px 100px 100px 100px',

        
        'shift-table1': '1fr 1fr 1fr 150px 1fr 80px',
        'shift-table_history': '1fr 1fr 1fr 150px 1fr',

        'shift-location-table': '1fr 2fr 60px',

        'shift-table-directoffer' : '1.5fr 1fr 0.5fr 0.5fr 60px',
        'shift-table-agreed': '2fr 1fr 1.5fr 1fr 0.5fr ',
        'shift-table-em_dashboard': '2fr 2fr 1fr 1fr 1fr ',
        'shift-table-applicant': '2fr 1fr 1fr 1fr 1fr',
        'timesheet': '1.5fr 1fr 1.5fr 1fr 1fr 60px',
        'timesheet-complete': '1fr 1.5fr 1.5fr 1fr 1fr 60px',

        
      }
    },
  },
  variants: {
    extends: {
      outlineColor: ['focus']
    }
  },
  plugins: [ require('@tailwindcss/forms')],
}
