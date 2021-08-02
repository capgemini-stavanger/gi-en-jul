import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ApiService from "../common/functions/apiServiceClass";

const recaptchaActivated = parseInt(process.env.REACT_APP_RECAPTCHA_ACTIVATED!);

const useRecaptcha = (action?: string) => {
  const apiService = new ApiService();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateRecaptcha: () => Promise<boolean | undefined> =
    useCallback(async () => {
      if (!executeRecaptcha) return undefined;
      else if (!recaptchaActivated) return true;
      let token = await executeRecaptcha(action);
      const response = await apiService.get(`recaptcha/${token}`);
      return response.status === 200 ? response.data : false;
    }, [action]);

  return { validateRecaptcha };
};

export default useRecaptcha;
