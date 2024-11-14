/// <reference types="cypress" />

describe("Sign In", () => {
  beforeEach(() => {
    cy.intercept("POST", "auth/signin").as("signin");

    cy.visit("http://localhost:3000/entrar");
  });

  it("can sign in with a valid user", () => {
    cy.getByDataCY("email").type("ativo-cypress@gmail.com");
    cy.getByDataCY("password").type("12345_Aa");

    cy.getByDataCY("submit").click();

    cy.wait("@signin")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(200);

        expect(response.body.id).to.be.a("string");
        expect(response.body.email).to.equal("ativo-cypress@gmail.com");
        expect(response.body.name).to.equal("Ativo Cypress");
        expect(response.body.status).to.equal("Ativo");
        expect(response.body.accessToken).to.not.be.empty;
        expect(response.body.refreshToken).to.not.be.empty;
      });
  });

  it("blocks user to sign in with empty inputs", () => {
    cy.getByDataCY("submit").click();

    cy.getByDataCY("email-error").should("exist");
    cy.getByDataCY("password-error").should("exist");
  });

  it("blocks user to sign in with invalid email", () => {
    cy.getByDataCY("email").type("cypress");
    cy.getByDataCY("submit").click();

    cy.getByDataCY("email-error").should("exist");
  });

  it("blocks user to sign in with non-existing user", () => {
    cy.getByDataCY("email").type("random@gmail.com");
    cy.getByDataCY("password").type("12345_Aa");

    cy.getByDataCY("submit").click();

    cy.wait("@signin")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("Email or password is invalid");
      });
  });
});
