describe('Dashboard Page - E2E Tests', () => {
  before(() => {
    cy.request('http://localhost:3001').its('status').should('eq', 200);
  });

  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Deve carregar a página e exibir registros', () => {
    cy.get('[data-testid="registration-card"]').should('exist');
    cy.get('[data-testid="registration-card"]').should('have.length.greaterThan', 0);
  });

  it('Deve filtrar registros automaticamente ao digitar um CPF válido', () => {
    const validCPF = '43936403813';

    cy.get('[data-testid="search-input"]').type(validCPF);

    cy.get('[data-testid="registration-card"]').should('exist');
  });

  it('Deve exibir erro ao digitar CPF inválido', () => {
    const invalidCPF = '11111111111'; // Exemplo de CPF inválido

    cy.get('[data-testid="search-input"]').type(invalidCPF);

    // Verifica se a mensagem de erro é exibida corretamente
    cy.get('[data-testid="error-message"]').should('exist');
    cy.get('[data-testid="error-message"]').contains('Digite um CPF válido');
  });

  it('Deve recarregar dados ao clicar no botão de refetch', () => {
    cy.get('[aria-label="Reload de dados"]').click();
    cy.wait(600);
    cy.get('[data-testid="registration-card"]').should('exist');
  });

  it('Deve navegar para a página de Nova Admissão ao clicar no botão', () => {
    cy.get('button').contains('Nova Admissão').click();
    cy.url().should('include', '/new-user');
  });

  it('Deve exibir todos os registros ao apagar o CPF', () => {
    const validCPF = '12345678901';

    cy.get('[data-testid="search-input"]').type(validCPF).clear();

    cy.wait(600);

    cy.get('[data-testid="registration-card"]').should('have.length.greaterThan', 0);
  });
});
