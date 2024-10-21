describe('Novo Usuário - E2E Tests', () => {
  before(() => {
    cy.request('http://localhost:3001').its('status').should('eq', 200);
  });

  beforeEach(() => {
    cy.visit('/new-user');
  });

  it('Deve exibir a página de cadastro de novo usuário', () => {
    cy.get('form').should('exist');
    cy.get('[data-testid="button-back"]').should('exist');
  });

  it('Deve exibir erros ao tentar enviar o formulário sem dados', () => {
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="error-message"]').should('exist');

    cy.contains('Nome muito curto').should('exist');
    cy.contains('Formato de e-mail inválido').should('exist');
    cy.contains('O CPF deve ter 11 dígitos.').should('exist');
    cy.contains('Data obrigatória').should('exist');
  });

  it('Deve exibir erros ao inserir CPF inválido', () => {
    cy.get('#name').type('Fulano de Tal');
    cy.get('#email').type('email@invalido');
    cy.get('#document').type('11111111111');
    cy.get('#date').type('2024-10-21');

    cy.get('button[type="submit"]').click();

    cy.contains('Formato de e-mail inválido').should('exist');
    cy.contains('CPF inválido').should('exist');
  });

  it('Deve cadastrar um novo usuário e redirecionar para a dashboard', () => {
    cy.intercept('POST', '**/registrations', {
      statusCode: 201,
    }).as('createUser');

    cy.get('#name').type('Fulano de Tal');
    cy.get('#email').type('fulano@email.com');
    cy.get('#document').type('43936403813');
    cy.get('#date').type('2024-10-21');

    cy.get('button[type="submit"]').click();

    cy.contains('Tem certeza que deseja cadastrar este candidato?').should('exist');
    cy.get('button').contains('Confirmar').click();

    cy.wait('@createUser');
    cy.url().should('include', '/dashboard');
    cy.contains('Novo candidato cadastrado!').should('exist');
  });

  it('Deve exibir erro ao tentar cadastrar um novo usuário', () => {
    cy.intercept('POST', '**/registrations', {
      statusCode: 500,
    }).as('createUserError');

    cy.get('#name').type('Fulano de Tal');
    cy.get('#email').type('fulano@email.com');
    cy.get('#document').type('43936403813');
    cy.get('#date').type('2024-10-21');

    cy.get('button[type="submit"]').click();
    cy.get('button').contains('Confirmar').click();

    cy.wait('@createUserError');
    cy.contains('Houve um erro ao tentar cadastrar um novo candidato!').should('exist');
  });

  it('Deve navegar para a página inicial ao clicar no botão voltar', () => {
    cy.get('[data-testid="button-back"]').click();
    cy.url().should('include', '/dashboard');
  });
});
