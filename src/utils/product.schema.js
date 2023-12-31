import * as Yup from 'yup';

export const productSchema = Yup.object({
    name: Yup
    .string('Name err')
    .required('Required'),
    price: Yup
    .number('Enter price err')
    .required('Required'),
    description: Yup
    .string('Enter description err')
    .required('Required'),
    category: Yup
    .string('Enter category err')
    .required('Required'),
    images: Yup.array()
    .of(Yup.mixed().required('Please upload an image'))
    .required('Required'),
    
    imagesFiles: Yup.array()
    .of(Yup.mixed().required('Please upload an image')),
    
    
})
