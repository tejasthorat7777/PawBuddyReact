/// <reference types="cypress" />

import { login } from "../login.ts/autoComFunctions";

describe("Dash Board", () => {
  it("should display all left menu respectively", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Home");
    cy.contains("Shampoo");
    cy.contains("Dog Food");
    cy.contains("Accessories");
    cy.contains("Bathroom Basics");
  });

  it("should click on login", () => {
    cy.visit("http://localhost:5173");
    cy.get("#acc_menu").click();
    cy.get("#account_Log-In").click();
    login();
    cy.get("#acc_menu").click();
    cy.get("#account_Profile").click();
    cy.contains("Name")
    cy.contains("Age")
    cy.contains("Birthdate")
    cy.contains("Owner Name")
    cy.contains("Username")
    cy.contains("Password");
    cy.contains("Gender");
    cy.contains("Breed");
  });
});
