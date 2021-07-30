import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const secret = "6Lc9AsobAAAAAJtutrM4tmNSgr_FaBCsjv4GtB8z";

interface IReplyState {
  success?: boolean;
  challengeTs?: string; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname?: string; // the hostname of the site where the reCAPTCHA was solved
  errorCodes?: string[]; // optional
}

const initReplyState: () => IReplyState = () => ({
  success: undefined,
  challengeTs: undefined,
  hostname: undefined,
  errorCodes: undefined,
});

const useRecaptcha = (action?: string) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [replyState, setReplyState] = useState<IReplyState>(initReplyState());

  const validateRecaptcha = useCallback(() => {
    if (executeRecaptcha) {
      executeRecaptcha(action).then((token) => {
        fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          body: JSON.stringify({
            response: token,
            secret: secret,
          }),
        }).then((response) =>
          response.json().then((data) =>
            setReplyState((prev) => ({
              ...prev,
              success: data["success"],
              challengeTs: data["challenge_ts"],
              hostname: data["hostname"],
              errorCodes: data["error-codes"],
            }))
          )
        );
      });
    }
    return replyState;
  }, [action]);

  return { validateRecaptcha };
};

export default useRecaptcha;
