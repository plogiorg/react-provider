import { Card, CardActions, CardContent, CircularProgress, Modal, SvgIcon } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import {  useState } from "react";
import React from "react";
import CreateServiceForm from "./Service.create.tsx";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  useApprovePayment,
  useCancelPayment,
  useCompletePayment,
  useCreateService,
  useProviderServices,
} from "../../api";
import { PlusIcon } from "../../assets/icons";
import { Pi } from '@pinetwork-js/sdk';
import { APIPayment } from '@pinetwork-js/api-typing';


type PaymentMetadata = {
  serviceId: string,
  status:string
};



export const ServiceComponent = () => {
  const [open, setOpen] = useState(false)
  const {data:services, isLoading:isServiceLoading, refetch } = useProviderServices()
  const {mutateAsync:createService } = useCreateService()
  const {mutateAsync:approvePayment } = useApprovePayment()
  const {mutateAsync:complatePayment } = useCompletePayment()
  const {mutateAsync:cancelPayment } = useCancelPayment()
  const [showBar, setShowBar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')


  const promoteService = async (memo: string, amount: number, paymentMetadata: Partial<PaymentMetadata>) => {
    const uid = "21"
    const paymentData = { amount, memo, uid, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };
    const payment = Pi.createPayment(paymentData, callbacks);
    await payment.runPaymentFlow()
    console.log(payment);
  }

  const onReadyForServerApproval = (paymentId: string) => {
    console.log("onReadyForServerApproval", paymentId);
    approvePayment({paymentId}).then((data) => console.log(data))
  }

  const onReadyForServerCompletion = (paymentId: string, txid: string) => {
    console.log("onReadyForServerCompletion", paymentId, txid);
    complatePayment({paymentId, txid}).then((data) => console.log({data}))
  }

  const onCancel = (paymentId: string) => {
    console.log("onCancel", paymentId);
    cancelPayment({paymentId}).then((data) => console.log(data))
  }

  const onError = (error: Error, payment?: APIPayment) => {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
    }
  }
  const handleFormSubmit = async (values:any) => {
    setLoading(true)
    try{
      await createService(values)
      setMessage("success")
      setShowBar(true)
      await refetch()
    }catch (e) {
      console.log({e});
      setLoading(false)
      setMessage("error")
      setShowBar(true)
    }
    setLoading(false)
    setTimeout(() => {
      setShowBar(false);
      setOpen(false)
    }, 1000)
  }

  return <Box sx={{ flex: 1, width: '100%' }}>
      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="small" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Home
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Services
          </Typography>
        </Breadcrumbs>
        <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
          My Services
        </Typography>
      </Box>
    <Box sx={{ px: { xs: 2, md: 6 } }}>
      <Button variant="solid" color="primary" onClick={() => setOpen(true)} startDecorator={<PlusIcon />} type="submit">New</Button>
    </Box>
    <div className={"p-5"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isServiceLoading ? <CircularProgress/> : services?.services.map((service, index) => (
          <Card key={index}
                onClick={() => setOpen(true)}
                variant="solid" color="primary" invertedColors
                className="bg-white shadow-md rounded-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div>
              <CardContent orientation="horizontal">
                <CircularProgress size="lg" determinate value={service.serviceTypeId} className="mr-4">
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </SvgIcon>
                </CircularProgress>
                <CardContent>
                  <Typography level="body-md">Name</Typography>
                  <Typography level="h3">{service.description}</Typography>

                  <Typography level="body-sm">Type</Typography>
                  <Typography level="h2">{service.serviceType.title}</Typography>

                  <Typography level="body-sm">Description</Typography>
                  <Typography level="h4">{service.description}</Typography>
                </CardContent>
              </CardContent>
              <CardActions>
                <Button variant="soft" size="sm">
                  Disable
                </Button>
                <Button variant="solid" size="sm" onClick={() => promoteService(service.description, 0.1, {serviceId: service.id })}>
                  Promote
                </Button>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>

      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <CreateServiceForm service={{}} loading={loading} showBar={showBar} barMessage={message} onSubmit={handleFormSubmit}></CreateServiceForm>
          </Sheet>
        </Modal>
      </React.Fragment>
    </div>
  </Box>
};
