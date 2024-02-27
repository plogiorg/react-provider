import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Input from '@mui/joy/Input';
import * as Yup from 'yup';
import Button from "@mui/joy/Button";
import { Select, Snackbar, Option } from "@mui/joy";
import {  TickIcon } from "../../assets/icons";
import { useServiceTypes } from "../../api";
import CircularProgress from '@mui/joy/CircularProgress';
import PlacesAutoComplete, { Place } from "../../components/PlacesAutoComplete/PlacesAutoComplete.tsx";


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string().required('Image URL is required'),
  serviceTypeId: Yup.number().required('Type is required'),
  price: Yup.number().required('Price is required'),
  lat: Yup.number().required('invalid address'),
  lan: Yup.number().required('invalid address'),
  city: Yup.string().required('invalid address'),
  address: Yup.string().required("Address is Required")
});

const initialValues:Yup.InferType<typeof validationSchema> = {
  title: '',
  description: '',
  image: '',
  address:"",
  price: 0,
  lat: 0,
  lan: 0,
  serviceTypeId: 1,
  city: ""
};

interface Props {
  onSubmit: (values: any) => void;
  service?:any, //TODO: add type in here
  loading:boolean,
  showBar: boolean,
  barMessage:string
}

const CreateServiceForm: React.FC<Props> = ({ onSubmit, loading, service, showBar, barMessage }) => {
  const handleSubmit = (values: any,  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    console.log({values});
    onSubmit(values);
    setSubmitting(false);
  };
  const {data:serviceTypes, isLoading:isTypesLoading} = useServiceTypes()

  return (
    <div>
      {<Snackbar open={showBar}>{barMessage}</Snackbar>}
      <h1>Create Service</h1>
      <Formik
        initialValues={service || initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue}) => (
          <Form>
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="title">Title</label>
                <Field id="title" name="title" as={Input} />
                <ErrorMessage name="title" component="div" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="description">Description</label>
                <Field id="description" name="description" as={Input} />
                <ErrorMessage name="description" component="div" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="image">Image URL</label>
                <Field id="image" name="image" as={Input} />
                <ErrorMessage name="image" component="div" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="price">Price</label>
                <Field id="price" type="number" name="price" as={Input} />
                <ErrorMessage name="price" component="div" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="address">Address</label>
                <Field id="address" name="address"  component={PlacesAutoComplete}  onPlaceSelected={(place:Place) => {
                  console.log({place});
                  setFieldValue("lat", place.lat)
                  setFieldValue("lan", place.lng)
                  setFieldValue("city", place.city)
                  setFieldValue("address", place.name)
                }}  />
                <ErrorMessage name="address" component="div" className="p-error" />
                <ErrorMessage name="lat" component="div" className="p-error" />
                <ErrorMessage name="lan" component="div" className="p-error" />
                <ErrorMessage name="city" component="div" className="p-error" />
              </div>

              <div className="my-2">
                <label className={"mx-2"} htmlFor="serviceTypeId">Type</label>
                {isTypesLoading ? (
                  <CircularProgress />
                ) : (
                  <Field id="serviceTypeId" name="serviceTypeId" onChange={(e: any, newValue: any) => {
                    setFieldValue("serviceTypeId", newValue)
                    console.log(e);
                  }} as={Select}>
                    {serviceTypes?.types.map((serviceType) => (
                      <Option key={serviceType.id} value={serviceType.id}>
                        {serviceType.title}
                      </Option>
                    ))}
                  </Field>)}
                <ErrorMessage name="type" component="div" className="p-error" />
              </div>
              <Button variant="solid" color="primary" loading={loading} startDecorator={<TickIcon />}
                      disabled={isSubmitting} type="submit">Save</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateServiceForm;
