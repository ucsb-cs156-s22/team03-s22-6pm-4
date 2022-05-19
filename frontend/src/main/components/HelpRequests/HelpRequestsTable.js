import OurTable from "main/components/OurTable";

export default function HelpRequestsTable({ helpRequests, _currentUser }) {


    const columns = [ 
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
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
            accessor: 'solved',
            accessor: (row, _rowIndex) => String(row.solved) // hack needed for boolean values to show up
        }
    ];

    const testid = "HelpRequestsTable";

    const columnsToDisplay = columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
