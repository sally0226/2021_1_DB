# frontend 폴더

css는 scss를 씁니당.
index.js를 만들어서 해당 js파일로 export 해주세용
각 폴더에서 npm install 하는 거 잊지 말기

## scss 파일 규칙

base 폴더 내에는 전부다같이 쓸 설정이 담긴 scss가 들어 있다.

각자 사용할 scss는 page용 component용 둘 다 components 내에 만들어준다.

scss가 전체 적용되기 때문에 해당 파일 명으로 최상위 클래스 명을 줘서 중첩 적용 해준다. 예시는 이미 만들어진 페이지 참조

main.scss에서 import 해주면 js에서 불러올 필요 없이 파일에 적용된다.

파일 이름 앞에 _붙은건 private라 main통해서만 가는 구조
