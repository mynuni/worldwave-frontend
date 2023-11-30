import {useQuery} from "react-query";
import {searchMembers} from "../../apis/service/member";

const useMemberSearch = (searchParam) => {

    return useQuery({
        queryKey: ["searchMembers", searchParam],
        queryFn: () => searchMembers(searchParam),
    });
};

export default useMemberSearch;