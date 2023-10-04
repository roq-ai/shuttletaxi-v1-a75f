import * as yup from 'yup';

export const pastRideValidationSchema = yup.object().shape({
  driver_id: yup.string().nullable(),
});
