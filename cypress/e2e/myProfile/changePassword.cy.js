/// <reference types="cypress" />

describe("Change password", () => {
  it("should validate inputs", () => {
    cy.login("alterarsenha-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/meu-perfil");
    cy.getByDataCY("changePassword-modal").click();

    //Empty inputs
    cy.getByDataCY("submit").click();
    cy.getByDataCY("currentPassword-error").should("exist");
    cy.getByDataCY("newPassword-error").should("exist");
    cy.getByDataCY("confirmationNewPassword-error").should("exist");

    //Invalid length(must be 8)
    cy.clearType("currentPassword", "123Aa");
    cy.clearType("newPassword", "123Aa");
    cy.getByDataCY("currentPassword-error").should("exist");
    cy.getByDataCY("newPassword-error").should("exist");

    //Missing lowercase characters
    cy.clearType("currentPassword", "1234567A");
    cy.clearType("newPassword", "1234567A");
    cy.getByDataCY("currentPassword-error").should("exist");
    cy.getByDataCY("newPassword-error").should("exist");

    //Missing uppercase characters
    cy.clearType("currentPassword", "1234567a");
    cy.clearType("newPassword", "1234567a");
    cy.getByDataCY("currentPassword-error").should("exist");
    cy.getByDataCY("newPassword-error").should("exist");

    //Missing numeric characters
    cy.clearType("currentPassword", "abcdefgH");
    cy.clearType("newPassword", "abcdefgH");
    cy.getByDataCY("currentPassword-error").should("exist");
    cy.getByDataCY("newPassword-error").should("exist");

    //Different passwords
    cy.clearType("currentPassword", "12345_Aa");
    cy.clearType("newPassword", "12345_Aa");
    cy.clearType("confirmationNewPassword", "12345_Aaaa");
    cy.getByDataCY("confirmationNewPassword-error").should("exist");
  });

  it("should not change password with invalid old password", () => {
    cy.intercept("PUT", "/me/change-password").as("changePassword");

    cy.login("alterarsenha-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/meu-perfil");
    cy.getByDataCY("changePassword-modal").click();

    cy.getByDataCY("currentPassword").type("Random123");
    cy.getByDataCY("newPassword").type("12345_Aa");
    cy.getByDataCY("confirmationNewPassword").type("12345_Aa");
    cy.getByDataCY("submit").click();

    cy.wait("@changePassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("Current password is invalid");
      });
  });

  it("should change password", () => {
    cy.intercept("PUT", "/me/change-password").as("changePassword");

    cy.login("alterarsenha-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/meu-perfil");
    cy.getByDataCY("changePassword-modal").click();

    cy.getByDataCY("currentPassword").type("12345_Aa");
    cy.getByDataCY("newPassword").type("123456_Aa");
    cy.getByDataCY("confirmationNewPassword").type("123456_Aa");
    cy.getByDataCY("submit").click();

    cy.wait("@changePassword")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });
  });

  it("should not login with old password", () => {
    cy.intercept("POST", "auth/signin").as("signin");

    cy.visit("http://localhost:3000/entrar");
    cy.getByDataCY("email").type("alterarsenha-cypress@gmail.com");
    cy.getByDataCY("password").type("12345_Aa");
    cy.getByDataCY("submit").click();

    cy.wait("@signin")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(400);
      });
  });

  it("should login with new password", () => {
    cy.intercept("POST", "auth/signin").as("signin");

    cy.visit("http://localhost:3000/entrar");
    cy.getByDataCY("email").type("alterarsenha-cypress@gmail.com");
    cy.getByDataCY("password").type("123456_Aa");
    cy.getByDataCY("submit").click();

    cy.wait("@signin")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});
