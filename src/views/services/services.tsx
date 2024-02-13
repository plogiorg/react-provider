import { Card, CardActions, CardContent, CircularProgress, Modal, SvgIcon } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { useState } from "react";
import React from "react";
import CreateServiceForm from "./service.create.tsx";
import Sheet from "@mui/joy/Sheet";


const myservices = [
  { name: "Test", type: "Test", description: "Test", usage: 0 },
  { name: "Test", type: "Test", description: "Test", usage: 0 },
  { name: "Test", type: "Test", description: "Test", usage: 0 },
  { name: "Test", type: "Test", description: "Test", usage: 0 },
  { name: "Test", type: "Test", description: "Test", usage: 0 },
  { name: "Test", type: "Test", description: "Test", usage: 0 },
];



export const ServiceComponent = () => {
  const [open, setOpen] = useState(false)

  return <div className={"p-5"}>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {myservices.map((service, index) => (
        <Card key={index}
              onClick={() => setOpen(true)}
              variant="solid" color="primary" invertedColors
              className="bg-white shadow-md rounded-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
          <div>
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={service.usage} className="mr-4">
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
                <Typography level="h2">{service.name}</Typography>

                <Typography level="body-md">Type</Typography>
                <Typography level="h2">{service.type}</Typography>

                <Typography level="body-md">Description</Typography>
                <Typography level="h2">{service.description}</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="sm">
                Add to Watchlist
              </Button>
              <Button variant="solid" size="sm">
                See breakdown
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
        <CreateServiceForm service={{}} loading={false} onSubmit={() =>{}}></CreateServiceForm>
        </Sheet>
      </Modal>
    </React.Fragment>
  </div>;
};


