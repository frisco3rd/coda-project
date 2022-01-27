describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("renders a list item for events", () => {
    cy.get("#events-list").should("contain", "Your Device Activity");
    cy.get("#event-list-item-1").within(() => {
      cy.contains("Details").click();
    });
    const baseUrl = Cypress.config("baseUrl");
    if (baseUrl === null) {
      throw new Error("No baseUrl set in cypress config");
    }
    cy.url().should("eq", `${baseUrl}/event-1`);
  });
});
