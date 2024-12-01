export const CONTRACT_PROMPTS = {
  TOKEN_GENERATION: `
Generate a secure ERC20 smart contract with the following specifications:
- Token Name: {{name}}
- Symbol: {{symbol}}
- Initial Supply: {{initialSupply}}
- Features: {{features}}

Include the following security considerations:
- Reentrancy protection
- Integer overflow protection
- Access control
- Events for all important state changes
`,

  CONTRACT_ANALYSIS: `
Analyze this smart contract for:
1. Security vulnerabilities
2. Gas optimization opportunities
3. Best practices compliance
4. Code quality and maintainability

Provide detailed feedback in JSON format.
`,

  CONTRACT_OPTIMIZATION: `
Optimize the following smart contract for:
1. Gas efficiency
2. Code readability
3. Security best practices

Contract code:
{{code}}
`
};