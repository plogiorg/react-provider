import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { AuthContextType } from "./types";
import AuthReducer from "./reducer";
import { LoginResponse, useCurrentUser } from "../../api";
import { GlobalLoader } from "../../components";

const AuthContextInitialValues: AuthContextType = {
  isLoading: true,
  token: null,
  isLoggedIn: false,
  user: null,
  login: (data?:LoginResponse) => {console.log(data);},
  logout: () => {},
  signup: () => {}
};

const AuthContext = createContext<AuthContextType>(AuthContextInitialValues);

type Props = { children: ReactNode };

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthContextInitialValues);

  const { data: currentUser, isLoading } = useCurrentUser();

  useEffect(() => {
    const initAuth = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
        if (currentUser?.sub) {
          dispatch({
            type: "SET_USER",
            payload: {
              user: currentUser,
            },
          });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (err) {
        console.log("Error authenticating: ", err);
        dispatch({ type: "LOGOUT" });
      }
    };

    initAuth();
  }, [isLoading]);

  const login = useCallback((data:object) => {
    dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    dispatch({
      type: "SET_USER",
      payload: {
        user: data,
      },
    });
  }, [dispatch]);

  const signup = useCallback((data:object) => {
    dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    console.log({data});
  }, [dispatch]);

  const logout = useCallback(() => {
    // dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    // window.location.href = generateAPIUrl("/v1/auth/logout", {
    //   homeUrl: `${getHostUrl()}/`,
    // });
  }, [dispatch]);

  const actions = useMemo(() => ({ login, logout, signup }), [login, logout, signup]);

  const contextValue = useMemo(
    () => ({ ...state, ...actions }),
    [state, actions]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {state.isLoading ? <GlobalLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
