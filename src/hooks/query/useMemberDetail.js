import {useQuery, useQueryClient} from "react-query";
import {getMemberDetail} from "../../apis/service/member";

const useMemberDetail = (id) => {

    const queryClient = useQueryClient();

    const fetchMemberDetail = () => {
        queryClient.refetchQueries(["getMemberDetail", id]);
    };

    const {data, isLoading, isError} = useQuery({
        queryKey: ["getMemberDetail", id],
        queryFn: () => getMemberDetail(id),
        enabled: false
    })

    return {data, fetchMemberDetail, isLoading, isError}
};

export default useMemberDetail;