/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCY: typeof getByDataCY;
      clickFirstSelectItem: typeof clickFirstSelectItem;
      clearType: typeof clearType;
      login: typeof login;
    }
  }
}

export const getByDataCY = (dataCy: string) => {
  return cy.get(`[data-cy="${dataCy}"]`);
};

export const clickFirstSelectItem = (dataCy: string) => {
  getByDataCY(dataCy).click();
  getByDataCY(`${dataCy}-item`).first().click();
};

export const clearType = (dataCy: string, type: string) => {
  getByDataCY(dataCy).clear().type(type);
};

export const login = (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.intercept("POST", "auth/signin").as("signin");
    cy.visit("http://localhost:3000/entrar");

    cy.getByDataCY("email").type(email);
    cy.getByDataCY("password").type(password);
    cy.getByDataCY("submit").click();

    cy.wait("@signin");
  });
};

Cypress.Commands.add("getByDataCY", getByDataCY);
Cypress.Commands.add("clearType", clearType);
Cypress.Commands.add("clickFirstSelectItem", clickFirstSelectItem);
Cypress.Commands.add("login", login);
