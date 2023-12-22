# axframe (The god of Front-end)

AXFrame is a web application framework developed by AXISJ.
A lightweight modular framework that provides developers with a set of tools and libraries for building scalable and maintainable web applications.
AXFrame also includes a variety of built-in UI components, such as forms, tables, and charts, that you can easily customize to suit your application design.

Applications developed with AXFrame have the following characteristics.

- High maintenance (TypeScript, API management via API interface)
- High scalability
- High Performance (React)
- High security
- Basic support for Page Tab Management System and User Input Status Maintenance System
- Provides automatic page generation
- Provides a variety of UI components (Ant Design Optimization)
- Fast development (Fast Hot Module Replacement)
- Easy theme management
- Easy multilingual support
- Easy permission management
- Easy API management

## Features
- 로그인 템플릿
- 탭 프레임 템플릿
- API연동되는 메뉴 컴포넌트
- 풀스크린모드 지원
- 테마 확장기능 제공
- 다국엉 확장기능 제공
- 권한 확장기능 제공
- 체계적인 API관리 시스템
- 페이지 자동생성 기능
- 페이지 사용자 입력상태 유지 기능
- 페이지 템플릿 확장 기능 제공
- 에러 핸들링 확장 기능 제공
- 다이얼로그(Alert, Confirm, Prompt) 확장 기능 제공
- 빌드/배포 스크립트 제공
- 빠른 개발환경 제공 (Fast Hot Module Replacement)

## Requirement

node v18

## Install

### by Git clone
```shell
git clone [git repo address] myproject
cd myproject

npm i
```

### by Download zip or tar.gz
You can download the latest version of axframe from the [GitHub releases] 
https://github.com/axisj/axframe/tags

then extract the zip or tar.gz file and add submodule

```shell
cd myproject
git init
rm -rf src/@core
git submodule add https://github.com/axisj/axframe-core.git src/@core
npm i
```

## Development

```shell
npm run dev
```

## Build

```shell
// for production build
npm run build

// for production alpha
npm run build:alpha
```

You can see output files in 'dist' folder

- In the development mode, check the disable cache option on the network tab.

## Use MakeProgram Script

1. Configure programs information in `src/makeProgramConfig.ts`

```ts
import { ProgramConfig } from "@core/scripts/makeProgram/@types";

const programConfig: ProgramConfig = {
  pagesDir: "./src/pages", // target direcotory
  templateDir: "./src/@core/pages", // template root
  programs: [
    {
      name: ["first", "first"], // ["folder Name", "program name"]
      type: "LIST", // "Template Type" is defined on "@core/scripts/makeProgram/@types"
    },
    {
      name: "second", // "program name"
      type: "LIST_AND_DRAWER",
    },
  ],
};

export default programConfig;
```

2. Run script in terminal by below

```shell
npm run make-program
```

3. You can see the program files in `pagesDir`

## Add New Program

### Add PROGRAM_TYPES

PROGRAM_TYPES enum defined in `router/@types.ts`.
Add the codename of program you want to add to PROGRAM_TYPES's enum.

```ts
export enum PROGRAM_TYPES {
  EXAMPLE_FORM = "EXAMPLE_FORM",
  EXAMPLE_DETAIL = "EXAMPLE_DETAIL",
  EXAMPLE_LIST = "EXAMPLE_LIST",
  EXAMPLE_LIST_AND_DRAWER = "EXAMPLE_LIST_AND_DRAWER",
  EXAMPLE_LIST_AND_MODAL = "EXAMPLE_LIST_AND_MODAL",
  EXAMPLE_LIST_WITH_FORM = "EXAMPLE_LIST_WITH_FORM",
  EXAMPLE_LIST_WITH_LIST = "EXAMPLE_LIST_WITH_LIST",

  HELP = "HELP", // new program type
}
```

### Add Route

```ts
const routes = {
  SIGN_IN: {
    path: "sign-in",
    hideTab: true,
  },
  HOME: {
    path: "",
    hideTab: true,
  },

  // add a new route
  HELP: {
    program_type: PROGRAM_TYPES.HELP,
  },
};
```

### Add PageRoute

Edit `router/PageRoute.tsx`

```tsx
const Help = React.lazy(() => import("pages/help/App"));

// ~~~

<Route path={ROUTES.HELP.path} element={<Help />} />;
```

### Add User Accessible ProgramList

Change the API response when the user log in.

```ts
import { delay } from "@core/utils/thread/timing";
import { SignInResponse, UserRepositoryInterface } from "./UserRepositoryInterface";

export class UserRepositoryMock implements UserRepositoryInterface {
  public async signIn(): Promise<SignInResponse> {
    await delay(500);
    return {
      rs: {
        userNm: "시스템사용자",
        userCd: "system",
        timeZone: 9,
        locale: "en",
        authorityList: ["ROLE_ADMIN", "ROLE_ASP", "ROLE_USER"],
        programList: ["HELP"], // It is same as PROGRAM_TYPES enum key
        email: "xxx@axisj.com",
      },
    };
  }

  signOut(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
```
