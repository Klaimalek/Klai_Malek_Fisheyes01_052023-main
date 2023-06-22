module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
   
    'rules': {
        'eqeqeq': 'off',
        'curly': 'error',
        'quotes': [2, 'single', { 'avoidEscape': true }],
        
    }
}
