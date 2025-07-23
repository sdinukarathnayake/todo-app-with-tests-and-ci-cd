describe('Todo App E2E', () => {
    const apiUrl = 'http://localhost:5000'
    const base = Cypress.config('baseUrl') // http://localhost:5173

    beforeEach(() => {
        // 1) Wipe out any existing tasks via the API (use _id, not taskId)
        cy.request('GET', `${apiUrl}/tasks/`).then((res) => {
            res.body.forEach((task) => {
                cy.request('DELETE', `${apiUrl}/tasks/${task._id}`)
            })
        })
        // 2) Visit the app
        cy.visit('/')
    })

    it('starts with an empty list', () => {
        cy.contains('My Todo List')
        cy.get('ul > li').should('have.length', 0)
    })

    it('lets me add a new task', () => {
        cy.contains('Add Task').click()
        cy.url().should('include', '/add')

        cy.get('input[placeholder="Task name"]')
            .type('Test Task from Cypress')
        cy.contains('Save Task').click()

        cy.url().should('eq', `${base}/`)
        cy.get('ul > li')
            .should('have.length', 1)
            .and('contain.text', 'Test Task from Cypress')
    })

    it('lets me delete a task', () => {
        // Add one first
        cy.contains('Add Task').click()
        cy.get('input[placeholder="Task name"]')
            .type('Will be deleted')
        cy.contains('Save Task').click()

        cy.contains('Will be deleted')
            .parent()
            .within(() => {
                cy.contains('Delete').click()
            })

        cy.contains('Will be deleted').should('not.exist')
    })
})