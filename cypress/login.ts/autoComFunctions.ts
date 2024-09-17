export const login = () => {
  cy.get("#userName")
    .type("tejasthorat7777")
    .should("have.value", "tejasthorat7777");
  cy.get("#password").type("Pettey@7777").should("have.value", "Pettey@7777");
  cy.get("#verify").click();
  cy.get("#btn_Login").click();
  cy.get("#loginDoneTick").should("be.visible");
};
