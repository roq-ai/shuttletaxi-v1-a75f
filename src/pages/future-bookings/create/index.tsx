import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFutureBooking } from 'apiSdk/future-bookings';
import { futureBookingValidationSchema } from 'validationSchema/future-bookings';
import { FutureBookingInterface } from 'interfaces/future-booking';

function FutureBookingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FutureBookingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFutureBooking(values);
      resetForm();
      router.push('/future-bookings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FutureBookingInterface>({
    initialValues: {
      driver_id: '',
      vehicle_id: '',
      date_of_travel: '',
      time_of_travel: '',
    },
    validationSchema: futureBookingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Future Bookings',
              link: '/future-bookings',
            },
            {
              label: 'Create Future Booking',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Future Booking
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.driver_id}
            label={'Driver Id'}
            props={{
              name: 'driver_id',
              placeholder: 'Driver Id',
              value: formik.values?.driver_id,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.vehicle_id}
            label={'Vehicle Id'}
            props={{
              name: 'vehicle_id',
              placeholder: 'Vehicle Id',
              value: formik.values?.vehicle_id,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.date_of_travel}
            label={'Date Of Travel'}
            props={{
              name: 'date_of_travel',
              placeholder: 'Date Of Travel',
              value: formik.values?.date_of_travel,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.time_of_travel}
            label={'Time Of Travel'}
            props={{
              name: 'time_of_travel',
              placeholder: 'Time Of Travel',
              value: formik.values?.time_of_travel,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/future-bookings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'future_booking',
    operation: AccessOperationEnum.CREATE,
  }),
)(FutureBookingCreatePage);
