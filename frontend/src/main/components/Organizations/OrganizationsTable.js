import OurTable, {ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";


export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/UCSBOrganization",
        method: "DELETE",
        params: {
            orgCode: cell.row.values.orgCode
        }
    }
}


export default function OrganizationsTable({ organizations, currentUser }) { // destructuring props (react convention) into individual parameters

    // const navigate = useNavigate(); // for edit function

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBOrganization/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Organization Code',
            accessor: 'orgCode', // accessor is the "key" in the data
        },
        {
            Header: 'Organization Translation (Abbreviated)',
            accessor: 'orgTranslationShort',
        },
        {
            Header: 'Organization Translation',
            accessor: 'orgTranslation',
        },
        {
            Header: 'Inactive?',
            id: 'inactive', // needed for tests
            accessor: (row, _rowIndex) => String(row.inactive) // hack needed for boolean values to show up
   
        }
    ];

    const testid = "OrganizationsTable"

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, "OrganizationTable"),
        // ButtonColumn("Delete", "danger", deleteCallback, "OrganizationTable") // from UCSBDates example
        ButtonColumn("Delete", "danger", deleteCallback, testid) // from DiningCommons example
        // ButtonColumn("Delete", "danger", deleteCallback, "OrganizationTable", "orgCode")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    
    return <OurTable
        data={organizations}
        columns={columnsToDisplay}
        testid={testid}
    />;
};