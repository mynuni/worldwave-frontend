import {useQuery} from "react-query";
import {getFollowers, getFollowings} from "../../apis/service/member";

const useFollow = (memberId) => {

    const {
        data: followers,
        isLoading: isLoadingFollowers,
        isError: isErrorFollowers,
        refetch: refetchFollowers
    } = useQuery({
        queryKey: ["followers", memberId],
        queryFn: () => getFollowers(memberId),
        enabled: false
    });

    const {
        data: followings,
        isLoading: isLoadingFollowings,
        isError: isErrorFollowings,
        refetch: refetchFollowings
    } = useQuery({
        queryKey: ["followings", memberId],
        queryFn: () => getFollowings(memberId),
        enabled: false
    });

    return {
        followers,
        isLoadingFollowers,
        isErrorFollowers,
        followings,
        isLoadingFollowings,
        isErrorFollowings,
        refetchFollowers,
        refetchFollowings,
    }
};

export default useFollow;