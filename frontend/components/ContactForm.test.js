import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const header = screen.getByText(/contact form/i)

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const user = "bob"
    const firstInput = screen.getByLabelText(/first name/i)
    userEvent.type(firstInput, user)

    const errorMessage = await screen.findAllByTestId("error");

    expect(errorMessage).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)
    const threeError = await screen.findAllByTestId(/error/i)
    expect(threeError).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const userF = 'Landon'
    const userL = 'Phillips'
    const firstInput = screen.getByLabelText(/first name/i)
    const lastInput = screen.getByLabelText(/last name/i)
    const submitButton = screen.getByRole('button')
   

    userEvent.type(firstInput, userF)
    userEvent.type(lastInput, userL)
    userEvent.click(submitButton)

    const errorMessage = await screen.findAllByTestId(/error/i)

    expect(errorMessage).toHaveLength(1)

    
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const email = 'landon.com'
    const emailLabel = screen.getByLabelText(/email/i)
    

    userEvent.type(emailLabel, email)

    const errorMessage = await screen.findByText(/email must be a valid email address/i)

   
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText(/first name/i);
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button')

    userEvent.type(firstInput, 'landon')
    userEvent.type(emailInput, 'landon14@yahoo.com')
    userEvent.click(submitButton)

    const errorMessage = await screen.findByText(/lastName is a required field/i)

    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText(/first name/i);
    const lasstInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    

    userEvent.type(firstInput, 'Jimmy');
    userEvent.type(lasstInput, 'dildos');
    userEvent.type(emailInput, 'landonator14@yahoo.com');
    
    const submitButton = screen.getByRole('button');
    
    userEvent.click(submitButton);
    await waitFor(() => {
        const firstName = screen.queryByText('Jimmy')
        const lastName = screen.queryByText('dildos')
        const emailName = screen.queryByText('landonator14@yahoo.com')
        const messageDisplay = screen.queryByTestId("messageDisplay")

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(emailName).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();


    })

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText(/first name/i);
    const lasstInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    

    userEvent.type(firstInput, 'Jimmy');
    userEvent.type(lasstInput, 'dildos');
    userEvent.type(emailInput, 'landonator14@yahoo.com');
    userEvent.type(messageInput, "meooow");
    
    const submitButton = screen.getByRole('button');

    userEvent.click(submitButton)

    await waitFor(() => {
        const firstName = screen.queryByText('Jimmy')
        const lastName = screen.queryByText('dildos')
        const emailName = screen.queryByText('landonator14@yahoo.com')
        const messageDisplay = screen.queryByTestId("messageDisplay")
        const messageName = screen.queryByText('meooow')

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(emailName).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
        expect(messageName).toBeInTheDocument();


    })
    
});
