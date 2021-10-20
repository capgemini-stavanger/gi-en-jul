import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useReducer } from "react";

const domainEnvUrl: string = `https://${process.env
  .REACT_APP_DEV_TENANT_AUTH0!}/api/v2/`;

interface IState {
  managementAccessToken: string;
  location?: string;
  role?: string;
  institution?: string
  //Event
}

const initState: () => IState = () => ({
  managementAccessToken: "",
  location: undefined,
  role: undefined,
  institution: undefined,
});

enum ReducerActionType {
  setManagementAccessToken,
  setLocation,
  setRole,
  setInstitution,
}

interface IReducerAction {
  type: ReducerActionType;
  data: string;
}

const reducer = (state: IState, action: IReducerAction) => {
  switch (action.type) {
    case ReducerActionType.setManagementAccessToken:
      return { ...state, managementAccessToken: action.data };
    case ReducerActionType.setLocation:
      return { ...state, location: action.data ?? null };
    case ReducerActionType.setRole:
      return { ...state, role: action.data ?? null };
    case ReducerActionType.setInstitution:
      return { ...state, institution: action.data ?? null };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const useUser = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [state, dispatch] = useReducer(reducer, initState());

  useEffect(() => {
    getAccessTokenSilently({
      audience: domainEnvUrl,
      scope: "read:current_user read:users_app_metadata",
    }).then((response) => {
      dispatch({
        type: ReducerActionType.setManagementAccessToken,
        data: response,
      });
    });
  }, []);

  useEffect(() => {
    if (user && state.managementAccessToken) {
      axios
        .get(`${domainEnvUrl}users/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${state.managementAccessToken}`,
          },
        })
        .then((response) => {
          dispatch({
            type: ReducerActionType.setLocation,
            data: response.data.user_metadata?.location,
          });
          dispatch({
            type: ReducerActionType.setRole,
            data: response.data.app_metadata?.role,
          });
          dispatch({
            type: ReducerActionType.setInstitution,
            data: response.data.app_metadata?.institution,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [user, state.managementAccessToken]);

  return {
    location: state.location,
    role: state.role,
    institution: state.institution,
  };
};

export default useUser;
