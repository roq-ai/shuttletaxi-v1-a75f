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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getFutureBookingById, updateFutureBookingById } from 'apiSdk/future-bookings';
import { futureBookingValidationSchema } from 'validationSchema/future-bookings';
import { FutureBookingInterface } from 'interfaces/future-booking';

function FutureBookingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<FutureBookingInterface>(
    () => (id ? `/future-bookings/${id}` : null),
    () => getFutureBookingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FutureBookingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFutureBookingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/future-bookings');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<FutureBookingInterface>({
    initialValues: data,
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
              label: 'Update Future Booking',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Future Booking
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(FutureBookingEditPage);
