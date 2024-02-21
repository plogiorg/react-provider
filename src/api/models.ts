type WithId<T extends Record<string, unknown>> = T & { id: string };

export type LoginRequest = {
  username: string;
  password: string;
  type:string
};

export type SignupRequest = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string
  country: string;
};

export type LoginResponse = {
  token: string;
};

export type UserModel = WithId<{
  firstName: string;
  lastName: string;
  email: string;
}>;

export type ServiceType = WithId<{
  name: string;
  description: string;
  image: string;
}>;



export type ServiceTypeReponse = {
  types : ServiceType[]
}

export type Service = {
  id: number;
  description: string;
  price: number;
}

export type ServiceResponse = {
  services : Service[]
}

export type CreateServiceRequest = {
  serviceTypeId:number;
  description:string;
  name:string;
  price:number;
}