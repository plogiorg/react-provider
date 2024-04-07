import { useMutation } from "react-query";
import { CreateServiceRequest, LoginRequest, PiLoginRequest, SignupRequest } from ".";
import { fetchUtil } from "../utils/fetch.util";
import { APIPayment } from "@pinetwork-js/api-typing";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => {
      return fetchUtil({
        url: "/v1/auth/login",
        body: data,
        method: "POST",
      });
    },
  });
};

export const usePiLogin = () => {
  return useMutation({
    mutationFn: (data: PiLoginRequest) => {
      return fetchUtil({
        url: "/v1/auth/pi/login",
        body: data,
        method: "POST",
      });
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => {
      return fetchUtil({
        url: "/v1/auth/provider/signup",
        body: data,
        method: "POST",
      });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    onMutate: () => {
      return fetchUtil({
        url: "/v1/auth/logout",
        method: "POST",
      });
    },
  });
};

export const useCreateService = () => {
  return useMutation({
    mutationFn: (data:CreateServiceRequest) => {
      return fetchUtil({
        url: "/v1/service",
        method: "POST",
        body: data,
        token: true
      });
    },
  });
};

export const useIncompletePayment = () => {
  return useMutation({
    mutationFn: (data:{payment: APIPayment}) => {
      return fetchUtil({
        url: `/v1/service/order/payment/incomplete`,
        method: "POST",
        body: data.payment,
        token: true
      });
    },
  });
};

export const useApprovePayment = () => {
  return useMutation({
    mutationFn: (data:{paymentId:string}) => {
      return fetchUtil({
        url:`/v1/service/order/payment/approve`,
        method: "POST",
        body: data,
        token: true
      });
    },
  });
};

export const useCompletePayment = () => {
  return useMutation({
    mutationFn: (data: { paymentId: string, transactionId: string }) => {
      return fetchUtil({
        url: `/v1/service/order/payment/complete`,
        method: "POST",
        body: data,
        token: true
      });
    },
  });
};

export const useCancelPayment = () => {
  return useMutation({
    mutationFn: (data: { paymentId: string }) => {
      return fetchUtil({
        url: `/v1/service/order/payment/cancel`,
        method: "POST",
        body: data,
        token: true
      });
    },
  });
};