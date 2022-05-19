import { _fireEvent, render, waitFor } from "@testing-library/react"; // react testing library
import { QueryClient, QueryClientProvider } from "react-query"; // this library communicates between the frontend and the backend
import { MemoryRouter } from "react-router-dom"; // simulates navigation from page to page
import ReviewsIndexPage from "main/pages/Reviews/ReviewsIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures"; // simulate what type of user is logged in
import { systemInfoFixtures } from "fixtures/systemInfoFixtures"; // way for frontend to get certain kinds of information from the backend
// import { ReviewsFixtures } from "fixtures/ReviewsFixtures";
import axios from "axios"; // i know this one
import AxiosMockAdapter from "axios-mock-adapter"; // simulate http requests to backend
import mockConsole from "jest-mock-console"; // simulates console logs and errors etc.


// check whether toast would have been produced
const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("ReviewsIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "ReviewsTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither); // neither swagger nor h2 show on console
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/MenuItemReview/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/MenuItemReview/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    /*
    test("renders three dates without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/ucsbdates/all").reply(200, ucsbDatesFixtures.threeDates);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    test("renders three dates without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/ucsbdates/all").reply(200, ucsbDatesFixtures.threeDates);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    */

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/MenuItemReview/all").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

    /*

    test("test what happens when you click delete, admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/ucsbdates/all").reply(200, ucsbDatesFixtures.threeDates);
        axiosMock.onDelete("/api/ucsbdates").reply(200, "UCSBDate with id 1 was deleted");


        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

       expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 


        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
       
        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("UCSBDate with id 1 was deleted") });

    });
    */

});


