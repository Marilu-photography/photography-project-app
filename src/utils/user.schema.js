import * as Yup from 'yup';

export const userSchema = Yup.object({ 

    name: Yup
    .string('Name err')
    .required('Required'),
    surname: Yup
    .string('Surname err')
    .required('Required'),
    email: Yup
    .string('Enter email err')
    .email('Enter a valid email')
    .required('Required'),
    avatar: Yup
    .string('Enter avatar err')
    .required('Required'),
    username: Yup
    .string('Enter username err')
    .required('Required'),
    // Otros campos según tus necesidades
});