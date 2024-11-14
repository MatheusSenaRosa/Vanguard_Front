/// <reference types="cypress" />

describe("Active User", () => {
  beforeEach(() => {
    cy.login("ativo-cypress@gmail.com", "12345_Aa");
  });

  it("can access home", () => {
    cy.visit("http://localhost:3000");

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

  it("can access my profile", () => {
    cy.visit("http://localhost:3000/meu-perfil");

    cy.getByDataCY("my-profile").should("exist");
  });

  it("blocks to access activate account", () => {
    cy.visit("http://localhost:3000/ativar-conta");

    cy.getByDataCY("home").should("exist");
  });

  it("blocks to access sign in", () => {
    cy.visit("http://localhost:3000/entrar");

    cy.getByDataCY("home").should("exist");
  });

  it("blocks to access sign up", () => {
    cy.visit("http://localhost:3000/criar-conta");

    cy.getByDataCY("home").should("exist");
  });

  it("blocks to access forgot password", () => {
    cy.visit("http://localhost:3000/esqueci-a-senha");

    cy.getByDataCY("home").should("exist");
  });
});
