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

  it("After login should click on Profile", () => {
    cy.visit("http://localhost:5173");
    cy.get("#acc_menu").click();
    cy.get("#account_Log-In").click();
    login();
    cy.get("#acc_menu").click();
    cy.get("#account_Profile").click();
    cy.contains("Name");
    cy.contains("Age");
    cy.contains("Birthdate");
    cy.contains("Owner Name");
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Gender");
    cy.contains("Breed");
  });

  it("After Profile should click on Home", () => {
    cy.visit("http://localhost:5173");
    cy.get("#acc_menu").click();
    cy.get("#account_Log-In").click();
    login();
    cy.get("#acc_menu").click();
    cy.get("#account_Profile").click();
    cy.get("#homeBtn").click();
    cy.contains("Home");
    cy.contains("Shampoo");
    cy.contains("Dog Food");
    cy.contains("Accessories");
    cy.contains("Bathroom Basics");
  });

  it("After Home should click on Shopping cart", () => {
    cy.visit("http://localhost:5173");
    cy.get("#acc_menu").click();
    cy.get("#account_Log-In").click();
    login();
    cy.get("#acc_menu").click();
    cy.get("#account_Profile").click();
    cy.get("#homeBtn").click();
    cy.get("#shoppingCart").click();
    cy.contains("Please Login");
    cy.get("#loginRequired").should("be.visible")
  });
});
