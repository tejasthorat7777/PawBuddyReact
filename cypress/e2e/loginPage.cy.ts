/// <reference types="cypress" />

describe("Login Page", () => {
  it("Enter username and Password wrong Invalid should display", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#username")
      .type("tejasthorat7777")
      .should("have.value", "tejasthorat7777");
    cy.get("#password").type("Pettey7777")
    cy.get("#btn_Login").click();
    cy.contains("Incorrect email or password")
  });
  it("Enter username and Password Correct", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#username")
      .type("tejasthorat7777")
      .should("have.value", "tejasthorat7777");
    cy.get("#password").type("Pettey@7777").should("have.value", "Pettey@7777");
    cy.get("#verify").click();
    cy.get("#btn_Login").click();
    cy.get("#loginDoneTick").should("be.visible")
  });
});
