/// <reference types="cypress" />

describe("Edit Profile", () => {
  beforeEach(() => {
    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/meu-perfil");
    cy.getByDataCY("edit").click();
  });

  it("should open edit profile modal", () => {
    cy.getByDataCY("edit-profile-modal").should("exist");
  });

  it("should block on empty inputs", () => {
    cy.getByDataCY("name").clear();

    cy.getByDataCY("submit").click();

    cy.getByDataCY("name-error").should("exist");

    cy.getByDataCY("occupation-error").should("exist");

    cy.getByDataCY("gender-error").should("exist");

    cy.getByDataCY("state-error").should("exist");

    cy.getByDataCY("city-error").should("exist");
  });

  it("should validate github and linkedin urls", () => {
    cy.getByDataCY("linkedin").type("aaa");

    cy.getByDataCY("github").type("aaa");

    cy.getByDataCY("submit").click();

    cy.getByDataCY("github-error").should("exist");

    cy.getByDataCY("linkedin-error").should("exist");
  });

  it("should block on empty inputs (outside Brazil)", () => {
    cy.getByDataCY("isLocatedOutside").click();

    cy.getByDataCY("submit").click();

    cy.getByDataCY("country-error").should("exist");
  });

  it("should close modal on close button", () => {
    cy.getByDataCY("close").click();

    cy.getByDataCY("edit-profile-modal").should("not.exist");
  });

  it("should close edit modal on click outside", () => {
    cy.getByDataCY("overlay").click({ force: true });

    cy.getByDataCY("edit-profile-modal").should("not.exist");
  });

  it("should edit profile infos", () => {
    cy.clearType("name", "Teste Cypress");

    cy.clickFirstSelectItem("occupation");

    cy.clickFirstSelectItem("gender");

    cy.clearType("linkedin", "https://www.linkedin.com/in/matheus-rosaa/");
    cy.clearType("github", "https://github.com/guideveloper00");

    cy.clickFirstSelectItem("state");

    cy.clickFirstSelectItem("city");

    cy.intercept("PUT", "me").as("updateProfile");

    cy.getByDataCY("submit").click();

    cy.wait("@updateProfile")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(200);

        expect(response.body.id).to.be.a("string");
        expect(response.body.email).to.equal("ativo-cypress@gmail.com");
        expect(response.body.name).to.equal("Teste Cypress");
        expect(response.body.status).to.equal("Ativo");
        expect(response.body.gender).to.equal("Feminino");
        expect(response.body.linkedIn).to.equal("https://www.linkedin.com/in/matheus-rosaa/");
        expect(response.body.gitHub).to.equal("https://github.com/guideveloper00");
        expect(response.body.status).to.equal("Ativo");
        expect(response.body.occupation.id).to.be.a("string");
        expect(response.body.occupation.description).to.equal("Apenas estudando.");
        expect(response.body.localization.country.id).to.equal(76);
        expect(response.body.localization.country.description).to.equal("Brasil");
        expect(response.body.localization.state.id).to.equal(11);
        expect(response.body.localization.state.description).to.equal("Rondônia");
        expect(response.body.localization.city.id).to.equal(1100015);
        expect(response.body.localization.city.description).to.equal("Alta Floresta D'Oeste");
      });
  });

  it("should edit profile infos (outside Brazil)", () => {
    cy.clickFirstSelectItem("occupation");

    cy.clickFirstSelectItem("gender");

    cy.clearType("linkedin", "https://www.linkedin.com/in/matheus-rosaa/");
    cy.clearType("github", "https://github.com/guideveloper00");

    cy.getByDataCY("isLocatedOutside").click();

    cy.clickFirstSelectItem("country");

    cy.intercept("PUT", "me").as("updateProfile");

    cy.getByDataCY("submit").click();

    cy.wait("@updateProfile")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(200);

        expect(response.body.id).to.be.a("string");
        expect(response.body.email).to.equal("ativo-cypress@gmail.com");
        expect(response.body.name).to.equal("Teste Cypress");
        expect(response.body.status).to.equal("Ativo");
        expect(response.body.gender).to.equal("Feminino");
        expect(response.body.linkedIn).to.equal("https://www.linkedin.com/in/matheus-rosaa/");
        expect(response.body.gitHub).to.equal("https://github.com/guideveloper00");
        expect(response.body.status).to.equal("Ativo");
        expect(response.body.occupation.id).to.be.a("string");
        expect(response.body.occupation.description).to.equal("Apenas estudando.");
        expect(response.body.localization.country.id).to.equal(4);
        expect(response.body.localization.country.description).to.equal("Afeganistão");
        expect(response.body.localization.state).to.equal(null);
        expect(response.body.localization.city).to.equal(null);
      });
  });
});
