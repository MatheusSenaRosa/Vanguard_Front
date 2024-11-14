/// <reference types="cypress" />

describe("Unlogged", () => {
  it("can access home", () => {
    cy.visit("http://localhost:3000/");

    cy.getByDataCY("home").should("exist");
  });

  it("can access posts", () => {
    cy.visit("http://localhost:3000/posts");

    cy.getByDataCY("posts").should("exist");
  });

  it("can access single post", () => {
    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("post").should("exist");
  });

  it("can access sign in", () => {
    cy.visit("http://localhost:3000/entrar");

    cy.getByDataCY("signin").should("exist");
  });

  it("can access sign up", () => {
    cy.visit("http://localhost:3000/criar-conta");

    cy.getByDataCY("signup").should("exist");
  });

  it("can access forgot password", () => {
    cy.visit("http://localhost:3000/esqueci-a-senha");

    cy.getByDataCY("forgot-password").should("exist");
  });

  it("blocks to access activate account", () => {
    cy.visit("http://localhost:3000/ativar-conta");

    cy.getByDataCY("signin").should("exist");
  });

  it("blocks to access my profile", () => {
    cy.visit("http://localhost:3000/meu-perfil");

    cy.getByDataCY("signin").should("exist");
  });
});
