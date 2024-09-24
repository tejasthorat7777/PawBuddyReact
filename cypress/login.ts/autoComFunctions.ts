export const login = (username: string, password: string) => {
  cy.get("#userName").type(username).should("have.value", username);
  cy.get("#password").type(password).should("have.value", password);
  cy.get("#verify").click();
  cy.get("#btn_Login").click();
  cy.wait(3000);
  cy.get("#loginDoneTick").should("be.visible");
};
