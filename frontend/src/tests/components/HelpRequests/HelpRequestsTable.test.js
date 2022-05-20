// import { fireEvent, render, waitFor } from "@testing-library/react";
import {  render } from "@testing-library/react";
import { helpRequestsFixtures } from "fixtures/helpRequestsFixtures";
import HelpRequestsTable from "main/components/HelpRequests/HelpRequestsTable"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("HelpRequestsTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestsTable helpRequests={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestsTable helpRequests={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestsTable helpRequests={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected colum headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestsTable helpRequests={helpRequestsFixtures.threeRequests} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ['Id', 'Requester Email', 'Team ID', 'Table or Breakout Room?', 'Time of Request', 'Explanation', 'Solved?'];

    const expectedFields = ['id', 'requesterEmail', 'teamId', 'tableOrBreakoutRoom', 'requestTime', 'explanation', 'isSolved'];
    const testId = "HelpRequestsTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");

    // const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    // expect(editButton).toBeInTheDocument();
    // expect(editButton).toHaveClass("btn-primary");

    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

//   test("Edit button navigates to the edit page for admin user", async () => {

//     const currentUser = currentUserFixtures.adminUser;

//     const { getByTestId } = render(
//       <QueryClientProvider client={queryClient}>
//         <MemoryRouter>
//           <MenuItemsTable menuItems={menuItemsFixtures.threeMenuItems} currentUser={currentUser} />
//         </MemoryRouter>
//       </QueryClientProvider>

//     );

//     await waitFor(() => { expect(getByTestId(`MenuItemsTable-cell-row-0-col-id`)).toHaveTextContent("1"); });

//     const editButton = getByTestId(`MenuItemsTable-cell-row-0-col-Edit-button`);
//     expect(editButton).toBeInTheDocument();
    
//     fireEvent.click(editButton);

//     await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/menuitems/edit/1'));

//   });

});

