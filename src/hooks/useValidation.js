import {useState} from 'react';
import {REGEX_EMAIL, REGEX_PASSWORD} from "../constants/regex";
import {checkEmailDuplication} from "../apis/service/auth";

const useValidation = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");

    const validateEmail = async (email) => {
        if(!email) {
            setEmailError("이메일을 입력해주세요.");
            return false;
        }

        if (!REGEX_EMAIL.test(email)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
            return false;
        }

        try {
            const isDuplicated = await checkEmailDuplication(email);
            if (isDuplicated) {
                setEmailError("이미 사용 중인 이메일입니다.");
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        setEmailError("");
        return true;

    }

    const validatePassword = (password, passwordConfirm) => {
        if (!REGEX_PASSWORD.test(password)) {
            setPasswordError("8~20자의 영문, 숫자 조합을 사용해주세요.")
            return false;
        }
        setPasswordError("");

        if (passwordConfirm && password !== passwordConfirm) {
            setPasswordConfirmError("비밀번호 확인이 일치하지 않습니다.");
            return false;
        }
        setPasswordConfirmError("");
        return true;
    }

    return {
        emailError,
        passwordError,
        passwordConfirmError,
        validateEmail,
        validatePassword
    }

};

export default useValidation;