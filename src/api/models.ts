type WithId<T extends Record<string, unknown>> = T & { id: string };

export type LoginRequest = {
  username: string;
  password: string;
  type:string
};

export type PiUser = {
  uid:string;
  username?:string;
}

export enum AuthType {
  PI = 'pi',
  STANDARD = 'standard',
}

export type PiLoginRequest = {
  accessToken: string;
  type: string
  user: PiUser;
}

export type SignupRequest = {
  username: string;
  password: string;
  email: string;
  phone: string;
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
  title: string;
  description: string;
  image: string;
  createdAt: Date,
  updatedAt: Date,
  isActive: true
}>;



export type ServiceTypeReponse = {
  types : ServiceType[]
}


export type Service = WithId<{
  createdAt: Date,
  updatedAt: Date,
  userId: string,
  description: string,
  price: number,
  serviceTypeId: number,
  country:string;
  serviceType: ServiceType,
  lan: number,
  lat: number,
  city: string,
  address: string
}>

export type ServiceResponse = {
  services : Service[]
}

export type CreateServiceRequest = {
  serviceTypeId:number;
  description:string;
  name:string;
  price:number;
  country:string;
}