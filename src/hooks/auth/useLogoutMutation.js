import {useMutation} from "react-query";
import {logout} from "../../apis/service/auth";
import {useSetRecoilState} from "recoil";
import {userState} from "../../recoil/user";

const useLogoutMutation = () => {

    const setUser = useSetRecoilState(userState);

    const removeLoginData = () => {
        localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY);
        setUser(null);
        alert("로그아웃 되었습니다.");
        window.location.href = "/";
    };

    return useMutation({
        mutationKey: "logout",
        mutationFn: () => logout(localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY)),
        onSuccess: removeLoginData,
        onError: removeLoginData
    });

};

export default useLogoutMutation;