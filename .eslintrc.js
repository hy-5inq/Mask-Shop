module.exports = {
    // eslint 설정은 기본적으로 루트 디렉토리부터 검증대상 파일경로까지 캐스케이딩됨
    // {root: true} 를 설정하면 상위경로 설정을 물려받지 않음
    "root": true,

    // 빌트인 전역변수를 뭘 쓰느냐에 따라 다름
    // Map 과 같이 es6 에 추가된 전역변수를 쓴다면 es6: true
    // require("...") 와 같이 node 전역변수를 쓴다면 node: true
    // location.href 와 같이 브라우저 전역변수를 쓴다면 browser: true
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },

    // 문법에 따라 다름
    // es6 문법을 쓴다면 ecmaVersion: 6 (기본값은 5)
    // es6 모듈을 쓴다면 sourceType: "module" (기본값은 "script")
    "parserOptions": {
		"ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": `module`
    },

    // npm 패키지로 퍼블리시된 eslint 설정을 갖다 쓸 수 있고
    // react, airbnb, google, standard 등이 유명함
    // 하지만 일단 eslint 추천안을 씁시다 정석 최고
    "extends": `eslint:recommended`,

    // 0 또는 "off" = 해당 규칙 비활성화 (검증하지 않음)
    // 1 또는 "warn" = 위반시 경고
    // 2 또는 "error" = 위반시 오류 (검증이 중단됨 = 빌드 실패)
    "rules": {
        // Possible Errors
        "no-console": [1, { allow: ["warn", "error"] }],
        "no-empty": 1,

        // Best Practices
        "no-else-return": 1,
        "no-lone-blocks": 1,
		"no-return-assign": 1,
		"complexity": [2, 4],

        // Variables
        "no-unused-vars": [1, {
            "vars": `all`,
            "args": `after-used`,
            "argsIgnorePattern": `^__`
        }],

        // Stylistic Issues
        "eol-last": 1,
        "func-style": [1, `declaration`, { "allowArrowFunctions": true }],
        "indent": [1, "tab"],
        "max-len": [1, {
            "code": 160,
            "ignoreComments": true,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignoreRegExpLiterals": true
        }],
        "no-unneeded-ternary": 1,
        "quotes": [1, "backtick"],
		"semi": 0,
		// "max-lines-per-function": [2, 30],

        // ECMAScript 6
        "arrow-body-style": 1,
        "arrow-parens": [1, `as-needed`],
        "arrow-spacing": 1,
        "no-useless-computed-key": 1,
        "no-useless-rename": 1,
        "no-var": 1,
        "prefer-arrow-callback": 1,
        "prefer-const": 1,
        "prefer-numeric-literals": 1,
        "prefer-rest-params": 1,
        "prefer-spread": 1,
        "prefer-template": 1
    },    
    // allow global variables
    "globals": {
        "Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
		"i18n": true,
	},

	"plugins": [
        "react"
    ],
};