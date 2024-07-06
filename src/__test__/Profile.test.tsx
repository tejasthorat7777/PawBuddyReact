import Wrapper from "../setupTest/Wrapper";
import Profile from "../Componet/Account/Profile";
import {
    render
} from "@testing-library/react";
vi.mock("react-lottie-player", () => {
    return {
        default: vi.fn(() => "mocked-lottie-player"),
    };
});
const mockState = {
        user: {

            age: "3",
            birthdate: "2022-01-26",
            breed: "Indie",
            city: "Pune",
            gender: "female",
            identification: "Orange Fur",
            name: "Pettey",
            owner: "Tejas Thorat",
            password: "Pettey@7777",
            userId: "Pettey&&2022-01-26",
            username: "tejasthorat7777",
            __v: 0,
            _id: "6673bc9151b532007"
        }
}

describe("Profile page>>>>>>>>>>>>>>>>>", () => {
    it("it should show all details when user login sucessfully", () => {
        const profilePage=render(
            <Wrapper initialState={mockState}>
                <Profile />
            </Wrapper>
        )
        expect(profilePage.getByText("*You cannot edit this fields")).toBeTruthy();
        expect(profilePage.getByText("Name")).toBeTruthy();
        expect(profilePage.getByText("Pettey")).toBeTruthy();
        expect(profilePage.getByText("Age")).toBeTruthy();
        expect(profilePage.getByText("3")).toBeTruthy();
        expect(profilePage.getByText("Breed")).toBeTruthy();
        expect(profilePage.getByText("Indie")).toBeTruthy();
        expect(profilePage.getByText("Birthdate")).toBeTruthy();
        expect(profilePage.getByText("Indie")).toBeTruthy();
        expect(profilePage.getByText("2022-01-26")).toBeTruthy();
        expect(profilePage.getByText("Identification")).toBeTruthy();
        expect(profilePage.getByText("Orange Fur")).toBeTruthy();
        expect(profilePage.getByText("Tejas Thorat")).toBeTruthy();
        expect(profilePage.getByText("Username")).toBeTruthy();
        expect(profilePage.getByText("tejasthorat7777")).toBeTruthy();
        expect(profilePage.getByText("Password")).toBeTruthy();
        expect(profilePage.getByText("Pettey@7777")).toBeTruthy();
        expect(profilePage.getByText("Gender")).toBeTruthy();
        expect(profilePage.getByText("female")).toBeTruthy();
        expect(profilePage.getByText("City")).toBeTruthy();
        expect(profilePage.getByText("Pune")).toBeTruthy();

    })
    it("it should ask for login", () => {
        const invalidLogin={
            user:{
                userId:""
            }
        }
        const profilePage=render(
            <Wrapper initialState={invalidLogin}>
                <Profile />
            </Wrapper>
        )
        expect(profilePage.getByText("Please Login")).toBeTruthy();
        // a lottie animation is displayed on screen 
        expect(profilePage.getByText("mocked-lottie-player")).toBeTruthy();
    })
})