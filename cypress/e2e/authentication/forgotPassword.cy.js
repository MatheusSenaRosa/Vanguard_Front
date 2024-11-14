/// <reference types="cypress" />

describe("Forgot password", () => {
  it("should not allow an invalid email", () => {
    cy.intercept("POST", "auth/forgot-password").as("forgotPassword");
    cy.visit("http://localhost:3000/esqueci-a-senha");

    cy.getByDataCY("submit").click();
    cy.getByDataCY("email-error").should("exist");

    cy.getByDataCY("email").type("random");
    cy.getByDataCY("email-error").should("exist");

    cy.clearType("email", "random@gmail.com");
    cy.getByDataCY("submit").click();

    cy.wait("@forgotPassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(404);
      });
  });

  it("should not allow an invalid new password", () => {
    cy.intercept("POST", "auth/forgot-password").as("forgotPassword");
    cy.visit("http://localhost:3000/esqueci-a-senha");

    cy.getByDataCY("email").type("esquecisenha-cypress@gmail.com");
    cy.getByDataCY("submit").click();

    cy.wait("@forgotPassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });

    cy.getByDataCY("submit-modal").click();

    //Empty inputs
    cy.getByDataCY("submit").click();
    cy.getByDataCY("password-error").should("exist");
    cy.getByDataCY("confirmationPassword-error").should("exist");

    //Invalid length(must be 8)
    cy.clearType("password", "123Aa");
    cy.getByDataCY("password-error").should("exist");

    //Missing lowercase characters
    cy.clearType("password", "1234567A");
    cy.getByDataCY("password-error").should("exist");

    //Missing uppercase characters
    cy.clearType("password", "1234567a");
    cy.getByDataCY("password-error").should("exist");

    //Missing numeric characters
    cy.clearType("password", "abcdefgH");
    cy.getByDataCY("password-error").should("exist");

    //Different passwords
    cy.clearType("password", "123456Aa");
    cy.clearType("confirmationPassword", "123456Aaa");
    cy.getByDataCY("confirmationPassword-error").should("exist");
  });

  it("should not allow an invalid code", () => {
    cy.intercept("PUT", "auth/reset-password").as("resetPassword");
    cy.intercept("POST", "auth/forgot-password").as("forgotPassword");
    cy.visit("http://localhost:3000/esqueci-a-senha");

    cy.getByDataCY("email").type("esquecisenha-cypress@gmail.com");
    cy.getByDataCY("submit").click();

    cy.wait("@forgotPassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });

    cy.getByDataCY("submit-modal").click();

    cy.getByDataCY("password").type("123456_Aa");
    cy.getByDataCY("confirmationPassword").type("123456_Aa");

    //Empty input
    cy.getByDataCY("submit").click();
    cy.getByDataCY("token-error").should("exist");

    //Invalid length(must be 6)
    cy.getByDataCY("token").type("123");
    cy.getByDataCY("token-error").should("exist");

    //Wrong token
    cy.clearType("token", "123456");
    cy.getByDataCY("submit").click();
    cy.wait("@resetPassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(400);
      });
  });

  it("should set a new password", () => {
    cy.intercept("PUT", "auth/reset-password").as("resetPassword");
    cy.intercept("POST", "auth/forgot-password").as("forgotPassword");
    cy.visit("http://localhost:3000/esqueci-a-senha");

    cy.getByDataCY("email").type("esquecisenha-cypress@gmail.com");
    cy.getByDataCY("submit").click();

    cy.wait("@forgotPassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });

    cy.getByDataCY("submit-modal").click();

    cy.getByDataCY("password").type("123456_Aa");
    cy.getByDataCY("confirmationPassword").type("123456_Aa");
    cy.getByDataCY("token").type("A29842");

    cy.getByDataCY("submit").click();
    cy.wait("@resetPassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });
  });

  it("should login with new password", () => {
    cy.intercept("POST", "auth/signin").as("signin");

    cy.visit("http://localhost:3000/entrar");

    cy.getByDataCY("email").type("esquecisenha-cypress@gmail.com");
    cy.getByDataCY("password").type("123456_Aa");

    cy.getByDataCY("submit").click();

    cy.wait("@signin")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});
