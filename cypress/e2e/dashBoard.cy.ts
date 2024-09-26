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

  it.only("product should get added to wishlist after clicked on heart icon", async () => {
    const username = "testpaw";
    const pass = "123456";
    cy.visit("http://localhost:5173");

    cy.request("/api/getProducts").then((response) => {
      cy.get("#acc_menu").click();
      cy.get("#account_Log-In").click();
      login(username, pass);

      cy.get("#acc_menu").click();
      cy.get("#account_WishList").click();
      cy.get("#emptyCart").should("be.visible");
      cy.contains("You Don't have any favourite item");

      cy.get("#homeBtn").click();

      const data = response.body;
      const productId = data[0].products[0].prodId;
      const customerId = data[0].customerId;

      cy.wait(5000);

      cy.get(`#wishlist_${productId}`).should("exist");
      cy.get(`#wishlist_${productId}`).click();

      cy.contains("Item added to Wishlist", { timeout: 20000 }).should(
        "be.visible"
      );

      cy.wait(5000);

      cy.get("#acc_menu").click();
      cy.get("#account_WishList").click();

      cy.request(`/api/getUsersInfo/${username}`).then((user) => {
        const userId = user.body.userId;

        cy.request(`/api/wishlist/get/${userId}`).then((whishlistResponse) => {
          const wishlistItems = whishlistResponse.body.items;

          const addedProduct = wishlistItems.find(
            (item) => item.prodId === productId
          );
          expect(addedProduct).to.exist;
          console.log("wishlistItems: ", wishlistItems);

          cy.get(`#Xbutton_${productId}`).should("be.visible");
          cy.get(`#Xbutton_${productId}`).click();

          cy.request(`/api/wishlist/get/${userId}`).then((wishlistResponse) => {
            const wishlistItems = wishlistResponse.body.items;

            const removedProduct = wishlistItems.find(
              (item) => item.prodId === productId
            );
            expect(removedProduct).to.not.exist;
          });

          cy.wait(3000);

          cy.get("#emptyCart").should("be.visible");
          cy.contains("You Don't have any favourite item");
          cy.get(`#Xbutton_${productId}`).should("not.exist");
        });
      });
    });
  });
});
