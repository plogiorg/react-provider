import { useQuery } from "react-query";
import { fetchUtil } from "../utils/fetch.util";
import { ServiceResponse, ServiceTypeReponse } from "./models.ts";

const QUERY_KEYS = {
  GET_CURRENT_USER: ["user"],
  GET_SERVICE_TYPES: ["service-types"],
  GET_SERVICES: ["provider-services"],
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CURRENT_USER,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/auth/me",
        method: "GET",
        token: true,
      });
    },
  });
};

export const useServiceTypes = () => {
  return useQuery<ServiceTypeReponse>({
    queryKey: QUERY_KEYS.GET_SERVICE_TYPES,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/service/types",
        method: "GET",
        token: true,
      });
    },
  });
}


export const useProviderServices = () => {
  return useQuery<ServiceResponse>({
    queryKey: QUERY_KEYS.GET_SERVICES,
    enabled: true,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/service/provider/services",
        method: "GET",
        token: true,
      });
    },
  });
}