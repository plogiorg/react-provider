import { useMutation } from "react-query";
import { AuthType, CreateServiceRequest, LoginRequest, PiLoginRequest, SignupRequest } from ".";
import { fetchUtil } from "../utils/fetch.util";

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
        authType: AuthType.PI
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