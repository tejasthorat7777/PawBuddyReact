/// <reference types="cypress" />

import { login } from "../login.ts/autoComFunctions";

describe("Login Page", () => {
  it("Enter username and Password wrong Invalid should display", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#username")
      .type("tejasthorat7777")
      .should("have.value", "tejasthorat7777");
    cy.get("#password").type("Pettey7777");
    cy.get("#btn_Login").click();
    cy.contains("Incorrect email or password");
  });
  it("Enter username and Password Correct", () => {
    cy.visit("http://localhost:5173/login");
    login();
  });
});
