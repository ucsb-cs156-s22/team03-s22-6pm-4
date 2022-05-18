import OurTable, { _ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
import { _hasRole } from "main/utils/currentUser";


export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/Recommendation",
        method: "DELETE",
        params: {
            code: cell.row.values.code
        }
    }
}

export default function RecommendationsTable({ recommendations, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    const _deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/Recommendation/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Date Needed',
            accessor: 'dateNeeded', 
        },
        {
            Header: 'Date Requested',
            accessor: 'dateRequested',
        },
        {
            Header: 'Done?',
            id: 'isDone', // needed for tests
            accessor: (row, _rowIndex) => String(row.done) // hack needed for boolean values to show up
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',

        },
        {
            Header: 'Id',
            id: 'id', // needed for tests
            accessor: (row, _rowIndex) => String(row.id) // hack needed for boolean values to show up
        },
        {
            Header: 'Professor Email',
            accessor: 'professorEmail',
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        }
    ];

    const testid = "RecommendationsTable";

    const _columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, testid),
        // ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    const columnsToDisplay = columns;

    return <OurTable
        data={recommendations}
        columns={columnsToDisplay}
        testid={testid}
    />;
};