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

  it("After login, should click on Profile", () => {
    cy.visit("http://localhost:5173");
    cy.get("#acc_menu").click();
    cy.get("#account_Log-In").click();
    login("testpaw", "123456");
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

  it("without login click on Shopping cart should display login required", () => {
    cy.visit("http://localhost:5173");
    cy.get("#acc_menu").click();
    cy.get("#account_Profile").click();
    cy.get("#homeBtn").click();
    cy.get("#shoppingCart").click();
    cy.contains("Please Login");
    cy.get("#loginRequired").should("be.visible");
  });

  it.skip("product should get added to wishlist after clicked on heart icon", async () => {
    cy.visit("http://localhost:5173");

    cy.get("#acc_menu").click();
    cy.get("#account_Log-In").click();
    login("testpaw", "123456");

    cy.get("#acc_menu").click();
    cy.get("#account_WishList").click();
    cy.get("#emptyCart").should("be.visible");
    cy.contains("You Don't have any favourite item");

    cy.get("#homeBtn").click();

    cy.get(`#wishlist_1`).should("exist");
    cy.get(`#wishlist_1`).click();

    cy.contains("Item added to Wishlist", { timeout: 20000 }).should(
      "be.visible"
    );
    cy.wait(5000);

    cy.request("/api/wishlist/get/952126969363").then((response) => {
      const data = response.body;
      console.log("body>>>>", data.items);
    });

    cy.get("#acc_menu").click();
    cy.get("#account_WishList").click();
    cy.get("#Xbutton_0").should("be.visible");
    cy.get(`#Xbutton_0`).click();
    cy.get("#emptyCart").should("be.visible");
    cy.contains("You Don't have any favourite item");
    cy.get("#Xbutton_0").should("not.exist");
  });
});
