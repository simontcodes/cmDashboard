import countries from './countries';

const questions = [
  {
    title: 'Education Level',
    description: 'Please select your highest degree of education achieved',
    type: 'select',
    answers: [
      'Highschool',
      'College Diploma',
      'Bachelors degree',
      'Masters degree',
    ],
  },
  {
    title: 'Nationality',
    description: 'Please select the country you were born in',
    type: 'select',
    answers: countries.map((country) => country.name),
  },
  {
    title: 'Have You been in Canada before?',
    description: 'Please select the type of visa',
    type: 'select',
    answers: [
      'Tourist Visa',
      'Work Visa',
      'Study Visa',
      'I havent been to Canada before',
    ],
    subQuestions: [
      {
        title: 'Work Visa',
        description: 'please enter the dates of your stay',
        type: 'date',
      },
      {
        title: 'Tourist Visa',
        description: 'please enter the dates of your stay',
        type: 'date',
      },
      {
        title: 'Study Visa',
        description: 'please enter the dates of your stay',
        type: 'date',
      },
    ],
  },
  {
    title: 'Are you Married?',
    description: 'Please select your marital status',
    type: 'radio',
    answers: ['Single', 'Married', 'Divorced', 'Widowed', 'Common law'],
  },
  // Add more questions as needed
];

export default questions;
