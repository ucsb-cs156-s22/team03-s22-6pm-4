import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/HelpRequest",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function HelpRequestsTable({ helpRequests, currentUser }) {

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/HelpRequest/all"]
    );

    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [ 
        {
            Header: 'Id',
            id: 'id',
            accessor: (row, _rowIndex) => String(row.id)
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        },
        {
            Header: 'Team ID',
            accessor: 'teamId',
        },
        {
            Header: 'Table or Breakout Room?',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'Time of Request',
            accessor: 'requestTime',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Solved?',
            id: 'isSolved',
            accessor: (row, _rowIndex) => String(row.solved) // hack needed for boolean values to show up
        }
    ];

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, "HelpRequestsTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={"HelpRequestsTable"}
    />;
};
