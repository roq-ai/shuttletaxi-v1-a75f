import * as yup from 'yup';

export const driverValidationSchema = yup.object().shape({
  driving_license_number: yup.string().required(),
  name: yup.string().nullable(),
  mobile_number: yup.string().nullable(),
  email_id: yup.string().nullable(),
  date_of_joining: yup.string().nullable(),
});
