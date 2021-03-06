import { AuthActions, IAuthAction } from './action-types';
import { signInApp, signUpApp, signOutApi, confirmAccount, reqNewVerificationToken } from "../../api/auth-api";
import Reactotron from "../../../dev/ReactotronConfig";
import { ApiError } from "./common-types";


export function loginSuccess(data): IAuthAction {
    return {
        type: AuthActions.LOGIN,
        isSignedIn: true,
        anonymous: false,
        payload: data
    }
}

export function signUpSuccess(data): IAuthAction {
    return {
        type: AuthActions.SIGN_UP,
        isSignedIn: true,
        anonymous: false,
        payload: data
    }
}

export function authFailure(error: ApiError): IAuthAction {
    return {
        type: AuthActions.AUTH_ERROR,
        isSignedIn: false,
        anonymous: false,
        error: error.message
    }
}

export function verifyUserSuccess(data): IAuthAction {
    return {
        type: AuthActions.CONFIRM,
        isSignedIn: true,
        anonymous: false,
        payload: data
    }
}

export function verifyUserFailure(error: ApiError): IAuthAction {
    return {
        type: AuthActions.CONFIRM_FAILURE,
        isSignedIn: true,
        anonymous: false,
        error: error,
        errorType: 'user-confirmation-error'
    }
}

export function logOut(data?: any): IAuthAction {
    return {
        type: AuthActions.LOGOUT,
        isSignedIn: false,
        anonymous: false,
    }
}

//logout thunk
export function signOut() {
    return dispatch => {
        signOutApi()
            .then((resp) => {
                Reactotron.log!("In auth-action: signOut response", resp);
                dispatch(logOut(resp));
            }).catch(error => {
                Reactotron.log!("Error signing out", error);
            })
    }

}

// login thunk
export function login(data) {
    Reactotron.log!("login-thunk", data);
    return (dispatch) => {
        signInApp(data)
            .then(response => {
                Reactotron.log!("sign-in response", response);
                dispatch(loginSuccess(response.data));
            }).catch(error => {
                Reactotron.log!("error logging in", error);
                dispatch(authFailure(error));
            })
    }
}

// sign-up thunk
export function signUp(data) {
    Reactotron.log!("Trying to Sign-up");
    return dispatch => {
        signUpApp(data)
            .then(response => {
                Reactotron.log!("sign-up response", response);
                dispatch(signUpSuccess(response.data));
            }).catch(error => {
                Reactotron.log!("error signing up", error);
                dispatch(authFailure(error));
            })
    }
}

export function verifyUser(data: string) {
    Reactotron.log!("trying to Confirm User Account");
    return async dispatch => {
        confirmAccount(data)
            .then(response => {
                Reactotron.log!("confirmation response", response);
                dispatch()
            }).catch(error => {
                Reactotron.log!("confirmation error", error);
            })
    }
}

//TODO: refresh-token thunk


export function guestUser(): IAuthAction {
    return { type: AuthActions.ANONYMOUS, isSignedIn: true, anonymous: true };
}