import {useMutation} from "react-query";
import {oAuth2UserWithdraw, withdraw} from "../../apis/service/auth";
import {useSetRecoilState} from "recoil";
import {userState} from "../../recoil/user";

const useWithdraw = () => {

    const setUserState = useSetRecoilState(userState);

    const onSuccessHandler = () => {
        alert("회원 탈퇴가 완료되었습니다.");
        setUserState(null);
        localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY);
        window.location.href = "/";
    };

    const {mutate: withdrawOAuth2User} = useMutation(oAuth2UserWithdraw, {
        onSuccess: onSuccessHandler
    });

    const {mutate: withdrawFormUser} = useMutation({
        mutationFn: (password) => withdraw(password),
        onSuccess: onSuccessHandler,
        onError: (error) => {
            alert(error.response.data.message);
        }
    });

    return {withdrawOAuth2User, withdrawFormUser};
};

export default useWithdraw;