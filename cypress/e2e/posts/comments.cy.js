/// <reference types="cypress" />

describe("Posts comments", () => {
  it("should NOT allow empty comment", () => {
    cy.intercept("POST", "posts/comments").as("createComment");

    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("comment-submit").should("be.disabled");
  });

  it("should create a comment", () => {
    cy.intercept("POST", "posts/comments").as("createComment");

    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("comment").type("Comentário 1");
    cy.getByDataCY("comment-submit").click();
    cy.wait("@createComment")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(201);

        expect(response.body.id).to.be.a("string");
        expect(response.body.description).to.equal("Comentário 1");
        expect(response.body.createdAt).to.be.a("string");
      });
  });

  it("should NOT allow empty reply", () => {
    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("reply-button").click();
    cy.getByDataCY("reply-submit").should("be.disabled");
  });

  it("should create a reply", () => {
    cy.intercept("POST", "posts/replies").as("createReply");

    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("reply-button").click();
    cy.getByDataCY("reply").type("Resposta 1");
    cy.getByDataCY("reply-submit").click();

    cy.wait("@createReply")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(201);

        expect(response.body.id).to.be.a("string");
        expect(response.body.description).to.equal("Resposta 1");
        expect(response.body.createdAt).to.be.a("string");
      });
  });

  it("should NOT allow actions to unlogged user", () => {
    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("edit-comment-button").should("not.exist");
    cy.getByDataCY("report-comment").should("not.exist");
    cy.getByDataCY("delete-comment").should("not.exist");

    cy.getByDataCY("edit-reply-button").should("not.exist");
    cy.getByDataCY("report-reply").should("not.exist");
    cy.getByDataCY("delete-reply").should("not.exist");

    cy.getByDataCY("login-redirect").should("exist");
  });

  it("should edit its own comment", () => {
    cy.intercept("PUT", "posts/comments").as("updateComment");
    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("edit-comment-button").click();
    cy.getByDataCY("edit-comment").clear().type("Comentário editado 1");
    cy.getByDataCY("edit-comment-submit").click();

    cy.wait("@updateComment")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(200);

        expect(response.body.id).to.be.a("string");
        expect(response.body.description).to.equal("Comentário editado 1");
        expect(response.body.createdAt).to.be.a("string");
      });
  });

  it("should NOT edit other user's comment", () => {
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("edit-comment-button").should("not.exist");
  });

  it("should edit its own reply", () => {
    cy.intercept("PUT", "posts/replies").as("updateReply");
    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("edit-reply-button").click();
    cy.getByDataCY("edit-reply").clear().type("Resposta editada 1");
    cy.getByDataCY("edit-reply-submit").click();

    cy.wait("@updateReply")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(200);

        expect(response.body.id).to.be.a("string");
        expect(response.body.description).to.equal("Resposta editada 1");
        expect(response.body.createdAt).to.be.a("string");
      });
  });

  it("should NOT edit other user's reply", () => {
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("edit-reply-button").should("not.exist");
  });

  it("should NOT report it's own comment", () => {
    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("report-comment").should("not.exist");
  });

  it("should report other user's comment", () => {
    cy.intercept("PUT", "posts/comments/reports/**").as("reportComment");
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("report-comment").click();
    cy.getByDataCY("submit-modal").click();

    cy.wait("@reportComment")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });
  });

  it("should NOT report other user's comment twice", () => {
    cy.intercept("PUT", "posts/comments/reports/**").as("reportComment");
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("report-comment").click();
    cy.getByDataCY("submit-modal").click();

    cy.wait("@reportComment")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("You have already reported this comment");
      });
  });

  it("should NOT report it's own reply", () => {
    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("report-reply").should("not.exist");
  });

  it("should report other user's reply", () => {
    cy.intercept("PUT", "posts/replies/reports/**").as("reportReply");
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("report-reply").click();
    cy.getByDataCY("submit-modal").click();

    cy.wait("@reportReply")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });
  });

  it("should NOT report other user's reply twice", () => {
    cy.intercept("PUT", "posts/replies/reports/**").as("reportReply");
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("report-reply").click();
    cy.getByDataCY("submit-modal").click();

    cy.wait("@reportReply")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("You have already reported this reply");
      });
  });

  it("should NOT delete other user's comment", () => {
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("comment-reply").should("not.exist");
  });

  it("should NOT delete other user's reply", () => {
    cy.login("ativo2-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("delete-reply").should("not.exist");
  });

  it("should delete it's own reply", () => {
    cy.intercept("DELETE", "posts/replies/**").as("deleteReply");
    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("delete-reply").click();

    cy.getByDataCY("submit-modal").click();

    cy.wait("@deleteReply")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });
  });

  it("should delete it's own comment", () => {
    cy.intercept("DELETE", "posts/comments/**").as("deleteComment");

    cy.login("ativo-cypress@gmail.com", "12345_Aa");

    cy.visit("http://localhost:3000/posts/cypress");

    cy.getByDataCY("delete-comment").click();

    cy.getByDataCY("submit-modal").click();

    cy.wait("@deleteComment")
      .its("response")
      .then((response) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});
