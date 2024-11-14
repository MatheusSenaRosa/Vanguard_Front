/// <reference types="cypress" />

describe("Not Found", () => {
  it("can access not found page", () => {
    cy.visit("http://localhost:3000/random", { failOnStatusCode: false });

    cy.getByDataCY("not-found").should("exist");
  });
});
