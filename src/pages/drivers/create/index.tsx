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

import { createDriver } from 'apiSdk/drivers';
import { driverValidationSchema } from 'validationSchema/drivers';
import { DriverInterface } from 'interfaces/driver';

function DriverCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DriverInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDriver(values);
      resetForm();
      router.push('/drivers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DriverInterface>({
    initialValues: {
      driving_license_number: '',
      name: '',
      mobile_number: '',
      email_id: '',
      date_of_joining: '',
    },
    validationSchema: driverValidationSchema,
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
              label: 'Drivers',
              link: '/drivers',
            },
            {
              label: 'Create Driver',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Driver
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.driving_license_number}
            label={'Driving License Number'}
            props={{
              name: 'driving_license_number',
              placeholder: 'Driving License Number',
              value: formik.values?.driving_license_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.mobile_number}
            label={'Mobile Number'}
            props={{
              name: 'mobile_number',
              placeholder: 'Mobile Number',
              value: formik.values?.mobile_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.email_id}
            label={'Email Id'}
            props={{
              name: 'email_id',
              placeholder: 'Email Id',
              value: formik.values?.email_id,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.date_of_joining}
            label={'Date Of Joining'}
            props={{
              name: 'date_of_joining',
              placeholder: 'Date Of Joining',
              value: formik.values?.date_of_joining,
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
              onClick={() => router.push('/drivers')}
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
    entity: 'driver',
    operation: AccessOperationEnum.CREATE,
  }),
)(DriverCreatePage);
