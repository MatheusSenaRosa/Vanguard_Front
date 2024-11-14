/// <reference types="cypress" />

describe("Sign Up", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/criar-conta");
  });

  it("can register a new user", () => {
    cy.intercept("POST", "auth/signup").as("signUp");

    cy.getByDataCY("name").type("Signup Cypress");
    cy.getByDataCY("email").type("cypressa3bfgh7p@gmail.com");
    cy.getByDataCY("password").type("12345_Aa");
    cy.getByDataCY("confirmationPassword").type("12345_Aa");

    cy.getByDataCY("submit").click();

    cy.wait("@signUp")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(201);

        expect(response.body.id).to.be.a("string");
        expect(response.body.email).to.equal("cypressa3bfgh7p@gmail.com");
        expect(response.body.name).to.equal("Signup Cypress");
        expect(response.body.status).to.equal("Inativo");
        expect(response.body.accessToken).to.not.be.empty;
        expect(response.body.refreshToken).to.not.be.empty;
      });
  });

  it("blocks user to register with already in use email", () => {
    cy.intercept("POST", "auth/signup").as("signUp");

    cy.getByDataCY("name").type("Signup Cypress");
    cy.getByDataCY("email").type("cypressa3bfgh7p@gmail.com");
    cy.getByDataCY("password").type("12345_Aa");
    cy.getByDataCY("confirmationPassword").type("12345_Aa");

    cy.getByDataCY("submit").click();

    cy.wait("@signUp")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(409);
        expect(response.body.message).to.equal("This email is already in use");
      });
  });

  it("blocks user to register with empty inputs", () => {
    cy.getByDataCY("email").type("cypressa3bfgh7p@gmail.com");

    cy.getByDataCY("submit").click();
    cy.getByDataCY("email").clear();

    cy.getByDataCY("email-error").should("exist");
    cy.getByDataCY("name-error").should("exist");
    cy.getByDataCY("password-error").should("exist");
  });

  it("blocks user to register with invalid name", () => {
    //Without last name
    cy.getByDataCY("name").type("Cypress");
    cy.getByDataCY("email").type("cypressa3bfgh7p@gmail.com");

    cy.getByDataCY("submit").click();
    cy.getByDataCY("name-error").should("exist");

    //Less than 5 characters
    cy.clearType("name", "a a");
    cy.getByDataCY("submit").click();
    cy.getByDataCY("name-error").should("exist");
  });

  it("blocks user to register with invalid email", () => {
    cy.getByDataCY("email").type("cypressa3bfgh7p");

    cy.getByDataCY("submit").click();
    cy.getByDataCY("email-error").should("exist");
  });

  it("blocks user to register with invalid password", () => {
    const testInvalidPassword = (password, confirmationPassword, errorSelector) => {
      cy.getByDataCY("password").clear();
      cy.getByDataCY("confirmationPassword").clear();

      if (password) {
        cy.getByDataCY("password").type(password);
        cy.getByDataCY("confirmationPassword").type(confirmationPassword);
      }

      cy.getByDataCY("submit").click();
      cy.getByDataCY(`${errorSelector || "password"}-error`).should("exist");
    };

    cy.getByDataCY("email").type("cypressa3bfgh7p@gmail.com");

    //Empty input
    testInvalidPassword("", "");

    //Invalid length(must be 8)
    testInvalidPassword("123Aa", "123Aa");

    //Missing lowercase characters
    testInvalidPassword("1234567A", "1234567A");

    //Missing uppercase characters
    testInvalidPassword("1234567a", "1234567a");

    //Missing numeric characters
    testInvalidPassword("abcdefgH", "abcdefgH");

    //Different passwords
    testInvalidPassword("123456Aa", "123456Aaa", "confirmationPassword");
  });

  it("blocks user to register with invalid recaptcha", () => {
    cy.getByDataCY("name").type("Signup Cypress");
    cy.getByDataCY("email").type("cypress@gmail.com");
    cy.getByDataCY("password").type("12345_Aa");
    cy.getByDataCY("confirmationPassword").type("12345_Aa");

    cy.getByDataCY("submit").should("be.disabled");
  });
});
