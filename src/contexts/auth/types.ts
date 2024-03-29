import { AuthType, LoginResponse } from "../../api";

type TODO = any;

export type AuthContextState = {
  isLoading: boolean;
  token: string | null;
  isLoggedIn: boolean;
  authType?:AuthType
  user: Record<string, object> | null;
};

export type AuthContextActions = {
  login: (data:LoginResponse) => void;
  signup: (data:TODO) => void;
  logout: () => void;
};

export type AuthContextType = AuthContextState & AuthContextActions;

export type SetLoadingReducerAction = {
  type: "SET_LOADING";
  payload: {
    isLoading: boolean;
  };
};

export type LogoutReducerAction = {
  type: "LOGOUT";
};

export type SetUserReducerAction = {
  type: "SET_USER";
  payload: {
    user: Record<string, any>;
    authType?: AuthType
  };
};

export type AuthReducerActions =
  | SetLoadingReducerAction
  | LogoutReducerAction
  | SetUserReducerAction;
