import OurTable, { _ButtonColumn} from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
//import { _hasRole } from "main/utils/currentUser";


// export function cellToAxiosParamsDelete(cell) {
//     return {
//         url: "/api/MenuItemReview",
//         method: "DELETE",
//         params: {
//             code: cell.row.values.code
//         }
//     }
// }

export default function ReviewsTable({ reviews, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdiningcommons/all"]
    // );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    // {
    //     "id": 2,
    //     "itemId": 3,
    //     "reviewerEmail": "gaucho@ucsb.edu",
    //     "stars": 4,
    //     "dateReviewed": "2022-04-20",
    //     "comments": "WAY too much to eat"
    //   }


    const columns = [
        {
            Header: 'ID',
            accessor: 'id', 
        },
        {
            Header: 'Item ID',
            accessor: 'itemId',
        },
        {
            Header: 'Reviewer Email',
            id: 'reviewerEmail',
        },
        {
            Header: 'Stars (Rating)',
            id: 'stars',
        },
        {
            Header: 'Date Reviewed',
            id: 'dateReviewed',
        },
        {
            Header: 'Comments',
            id: 'comments',
        }
    ];

    const testid = "ReviewsTable";

    // const columnsIfAdmin = [
    //     ...columns,
    //     // ButtonColumn("Edit", "primary", editCallback, testid),
    //     ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    const columnsToDisplay = columns;


    return <OurTable
        data={reviews}
        columns={columnsToDisplay}
        testid={testid}
    />;
};