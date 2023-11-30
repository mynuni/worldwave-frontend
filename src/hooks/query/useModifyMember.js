import {useMutation, useQuery, useQueryClient} from "react-query";
import {changePassword, getMemberDetail, getMyInfo, modifyMyInfo} from "../../apis/service/member";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/user";

const useModifyMember = () => {

    const queryClient = useQueryClient();
    const user = useRecoilValue(userState);

    const {data: myInfo, isMyInfoLoading} = useQuery({
        queryKey: "getMemberDetail",
        queryFn: () => getMemberDetail(user.id),
    });

    const {mutate: changePwMutation, isLoading: isChangePwLoading, isError: isChangePwError} = useMutation({
        mutationFn: (changePwData) => changePassword(changePwData),
        onError: (error) => {
            alert(error.response.data.message);
        }
    });

    const {mutate: updateInfoMutation} = useMutation({
        mutationFn: (data) => modifyMyInfo(data.userId, data.updateData),
        onSuccess: () => {
            queryClient.invalidateQueries("getMyInfo");
            alert("회원 정보가 수정되었습니다.");
        },
        onError: (error) => {
            alert(error.response.data.message);
        }
    });

    return {myInfo, isMyInfoLoading, changePwMutation, isChangePwLoading, updateInfoMutation}
};

export default useModifyMember;