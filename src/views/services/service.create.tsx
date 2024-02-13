import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Input from '@mui/joy/Input';
import * as Yup from 'yup';
import Button from "@mui/joy/Button";
import { Select, Snackbar, Option } from "@mui/joy";
import {  TickIcon } from "../../assets/icons";



const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string().required('Image URL is required'),
  isActive: Yup.boolean().required('Please specify if the service type is active'),
});

const initialValues: any = {
  title: '',
  description: '',
  image: '',
  isActive: false,
};

interface Props {
  onSubmit: (values: any) => void;
  service?:any, //TODO: add type in here
  loading:boolean
}

const CreateServiceForm: React.FC<Props> = ({ onSubmit, loading, service }) => {
  const handleSubmit = (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Snackbar open={true}>created tadaa</Snackbar>
      <h1>Create Service</h1>
      <Formik
        initialValues={service || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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

              <div className="my-2">
                <label className={"mx-2"} htmlFor="type">Type</label>
                <Field id="type" name="type" as={Select}>
                    <Option value="dog">Dog</Option>
                    <Option value="cat">Cat</Option>
                    <Option value="fish">Fish</Option>
                    <Option value="bird">Bird</Option>
                </Field>
                <ErrorMessage name="type" component="div" className="p-error" />
              </div>
              <Button variant="solid" color="primary" loading={loading} startDecorator={<TickIcon />} disabled={isSubmitting} type="submit">Save</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateServiceForm;
