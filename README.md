# REACTJS_TEMPALTE

## 프로젝트 구조 

~~~

    Components/

        # 브라우저 히스토리 객체가 작성되어있음
        - history/ 

        # 리덕스 스토어 , 액션 , 리듀서가 작성되어 있음
        - redux/

        # 리액트 컴포넌트 소스가 작성되어 있음
        - src/

        # 리액트 컴포넌트에 반영할 스타일시트가 작성되어 있음
        - stylesheets/

    public/

        # Webpack 명령어를 수행하면 모든 정적파일이 모여있음
        - assets/

        # 폰트 저장소
        - fonts/

        # 정적 이미지 저장소
        - images/

        # Webpack 명령어를 수행하면 만들어지는 JS파일
        - bundle.js

        - index.html

    # babel 사용 config 파일 (ECMA 버전 , 리액트)
    .babelrc

    .gitignore
    package.json

    # Webpack 동작 config 파일
    webpack.config.js

~~~

## 실행 방법

1. 먼저 의존 NPM 모듈 설치

~~~
    $ npm install
~~~

2. 개발용 핫 리로드 서버 구동

~~~
    $ npm run dev -> localhost:9000에서 소스 변동시 자동 리로드 됨.
~~~

3. 프로덕션 JS 파일 생성

~~~
    $ webpack -p -> public/bundle.js 파일이 생성됨.
~~~

