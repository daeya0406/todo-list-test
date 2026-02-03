# 📝 Todo List - Task Management Web App

사용자의 할 일을 효율적으로 관리하고, 상세 메모와 이미지 첨부 기능을 제공하는 인터랙티브 할 일 관리 애플리케이션입니다.

---

## 🚀 주요 기능

- **할 일 관리 (CRUD)**: 할 일을 추가, 수정, 삭제하고 완료 상태를 체크할 수 있습니다.
- **이미지 업로드**: 각 항목마다 관련 이미지를 업로드하고 미리볼 수 있습니다. (S3 연동)
- **상세 메모**: 할 일에 대한 구체적인 내용을 작성하고 수정할 수 있는 메모 기능을 제공합니다.
- **반응형 디자인**: 모바일, 태블릿, 데스크탑 등 다양한 화면 크기에 최적화된 레이아웃을 지원합니다.
- **상태 필터링**: 해야 할 일(TODO)과 완료된 일(DONE)을 직관적으로 구분하여 보여줍니다.

## 🛠 사용 기술 (Tech Stack)

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **State Management**: React Hook Form
- **API Communication**: Fetch API (Custom Wrapper)
- **Deployment**: Vercel

---

## 📦 설치 및 실행 방법

프로젝트를 로컬 환경에서 실행하려면 아래 단계를 따르세요.

1. **저장소 복제 (Clone)**
   ```bash
   git clone [https://github.com/daeya0406/todo-list-test.git](https://github.com/daeya0406/todo-list-test.git)
   cd todo-list-test
   ```

2. **패키지 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   브라우저에서 `http://localhost:3000` 접속 후 확인 가능합니다.

---

## 📁 프로젝트 구조

```text
src/
├── app/              # Next.js App Router (Pages)
├── shared/           # 공용 컴포넌트, API, 유틸리티, 상수
│   ├── api/          # itemService (데이터 통신 로직)
│   ├── ui/           # Button, CheckBox, TodoCard 등 공통 UI
│   └── constants/    # API 엔드포인트 관리
└── lib/              # 공용 유틸리티 (cn 함수 등)
```

---

## 🎨 주요 구현 포인트 (UX/DX)

- **이벤트 분리**: 할 일 카드의 상세 페이지 이동(`Link`)과 상태 변경(`Checkbox`) 이벤트를 분리하여 사용자 경험을 개선했습니다.
- **이미지 업로드 가이드**: 파일명 및 용량(5MB 이하) 제한 유효성 검사를 통해 안정적인 데이터 관리를 지원합니다.
- **Next.js Image Optimization**: 외부 이미지 도메인 보안 설정(`remotePatterns`)을 통해 안전하게 이미지를 렌더링합니다.

---

## 👨‍💻 제작자
- **daeya0406**
- GitHub: [https://github.com/daeya0406](https://github.com/daeya0406)
