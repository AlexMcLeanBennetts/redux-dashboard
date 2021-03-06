import { screen, render } from 'tests/utils/setup/renderWithReduxAndRouter'
import Main from 'views/Main';
import testData from 'tests/mocks/data/testData';


describe('The main component should display a limited overview on the details of the policy', () => {
    beforeEach(() => {
        render(<Main />);
    })
    it('A title with the customers name', async () => {

        const greetingMessage = await screen.findByText(/Welcome back, Steve!/i)
        expect(greetingMessage).toBeInTheDocument();
    })

    it('A button to make changes to the policy', async () => {
        const makeAChangeButton = await screen.findByRole('button', { name: 'Make A Change' });
        expect(makeAChangeButton).toBeInTheDocument();
    })
    it('The button should have the link to the amend policy page', async () => {
        const makeAChangeButton = await screen.findByRole('link', { name: /make a change/i });
        expect(makeAChangeButton).toHaveAttribute('href', '/amend-policy-details');
    })

    it('The make and model of the car displayed', async () => {
        const makeAndModel = `${testData.car.make} ${testData.car.model}`;

        const makeAndModelInDocument = await screen.findByText(makeAndModel);
        expect(makeAndModelInDocument).toBeInTheDocument();
    })

    it('should display the registration', async () => {
        const registrationText = await screen.findByText(testData.car.registration);
        expect(registrationText).toBeInTheDocument();
    })

    it('Should have a button to view more details', async () => {
        const viewPolicyDetailsButton = await screen.findByRole('button', { name: "View policy details" });
        expect(viewPolicyDetailsButton).toBeInTheDocument();
    })

    it('The button should have the link to the view policy details page', async () => {
        const makeAChangeButton = await screen.findByRole('link', { name: /View policy details/i });
        expect(makeAChangeButton).toHaveAttribute('href', '/policy');
    })

    it('should show if the policy is active', async () => {
        const activePolicy = await screen.findByText('Active Policy');
        expect(activePolicy).toBeInTheDocument();
    })
    it('should have a green indicator next to the active policy text', async () => {
        const activePolicyIndicator = await screen.findByTestId('policyStatusIndicator')
        expect(activePolicyIndicator).toHaveClass('bg-green-600');
    })
    it('should have the policy number', async () => {
        const policyNumeber = await screen.findByText(testData.policyNumber);
        expect(policyNumeber).toBeInTheDocument();
    })
    it('should have the policy start and end date in the correct format', async () => {
        const startAndEndDate = await screen.findByText(/3rd Apr 22 - 2nd Apr 23/i)
        expect(startAndEndDate).toBeInTheDocument();
    })
    it('should show the number of years for no claims', async () => {
        const noClaimsTitle = await screen.findByText('No Claims Discount');
        const noClaimsAmount = noClaimsTitle.nextElementSibling.textContent;

        expect(noClaimsAmount).toEqual('1 year');
    })
})


