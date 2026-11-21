import js from '@eslint/js';

const loadDirective = /^\s*(priority|ignored|requires):/;

const noComments = {
  meta: { type: 'suggestion', schema: [], messages: { comment: 'No comments in pack scripts.' } },
  create(context) {
    return {
      Program() {
        context.sourceCode
          .getAllComments()
          .filter(node => !loadDirective.test(node.value))
          .forEach(node => context.report({ node, messageId: 'comment' }));
      }
    };
  }
};

const loopBodyDeclaration =
  ':matches(ForStatement, ForInStatement, ForOfStatement, WhileStatement, DoWhileStatement) > BlockStatement > VariableDeclaration:matches([kind="const"], [kind="let"])';

const readonly = names => Object.fromEntries(names.map(name => [name, 'readonly']));

const kubejsGlobals = readonly([
  'console',
  'Java',
  'Platform',
  'Item',
  'Fluid',
  'Text',
  'JsonIO',
  'ServerEvents',
  'StartupEvents',
  'ClientEvents',
  'ItemEvents',
  'BlockEvents',
  'NativeEvents',
  'RecipeViewerEvents',
  'LootJS',
  'LootEntry',
  'MIRegistrationEvents',
  'MIMachineEvents',
  'MIMaterialEvents',
  'CustomMachineryEvents',
  'CMRecipeModifierBuilder',
  'AlmostUnified',
  'Ingredient'
]);

const serverHelpers = readonly(['readRecipes', 'replaceRecipes', 'mi', 'crafting', 'cooking', 'pnc', 'cm', 'rack']);
const clientHelpers = readonly(['mixColors', 'recolorTexture']);

export default [
  { ignores: ['node_modules/**', 'kubejs/exported/**', 'kubejs/probe/**'] },
  js.configs.recommended,
  {
    files: ['kubejs/**/*.js'],
    plugins: { pack: { rules: { 'no-comments': noComments } } },
    languageOptions: { ecmaVersion: 2022, sourceType: 'script', globals: kubejsGlobals },
    rules: {
      'pack/no-comments': 'error',
      'no-restricted-syntax': [
        'error',
        { selector: loopBodyDeclaration, message: 'Rhino rejects const and let declared directly in a loop body.' }
      ],
      'no-unused-vars': ['error', { vars: 'local', args: 'none' }],
      'prefer-const': 'off',
      'no-var': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always']
    }
  },
  {
    files: ['kubejs/server_scripts/**/*.js'],
    ignores: ['kubejs/server_scripts/recipe_helpers.js'],
    languageOptions: { globals: { ...kubejsGlobals, ...serverHelpers } }
  },
  {
    files: ['kubejs/client_scripts/**/*.js'],
    ignores: ['kubejs/client_scripts/recolor.js'],
    languageOptions: { globals: { ...kubejsGlobals, ...clientHelpers } }
  }
];
