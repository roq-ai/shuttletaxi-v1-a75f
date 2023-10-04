import * as yup from 'yup';

export const futureBookingValidationSchema = yup.object().shape({
  driver_id: yup.string().nullable(),
  vehicle_id: yup.string().nullable(),
  date_of_travel: yup.string().nullable(),
  time_of_travel: yup.string().nullable(),
});
