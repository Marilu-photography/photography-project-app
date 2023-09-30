import * as Yup from 'yup';
import { use } from 'react';

const baseUserSchema = {
    email: Yup
      .string('Invalid email')
      .email('Invalid email')
      .required('Required'),
    password: Yup
      .string('Invalid password')
      .min(8, 'Should be 8 characters or more')
      .required('Required')
  };
  
  export const registerSchema = Yup.object({
    username: Yup
    .string('Invalid username')
    .min(3, 'Should be 3 characters or more')
    .required('Required'),
    name: Yup
      .string('Invalid name')
      .min(3, 'Should be 3 characters or more')
      .required('Required'),
    surname: Yup
      .string('Invalid surname')
      .min(3, 'Should be 3 characters or more')
      .required('Required'),
   
    ...baseUserSchema
  });
  
  export const loginSchema = Yup.object({
    ...baseUserSchema
  });