import { BasicRegistrationForm } from "../components/RegistrationForms/BasicRegistrationForm/BasicRegistrationForm"

const bootstrap = () => {
    BasicRegistrationForm.Events.whenSubmit(async registrationData => {
        console.log(registrationData)
    })
    BasicRegistrationForm.Assign.Validator.fullName((firstName: string, lastName: string) => {
        console.log({firstName, lastName})
        return true
    })
}