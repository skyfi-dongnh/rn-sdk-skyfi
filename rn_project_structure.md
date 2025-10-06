# Cấu trúc Dự Án React Native Phổ Biến

## Cấu trúc thư mục cơ bản

```
my-app/
├── android/                    # Mã nguồn Android native
├── ios/                        # Mã nguồn iOS native
├── src/                        # Mã nguồn chính của ứng dụng
│   ├── assets/                 # Tài nguyên tĩnh
│   │   ├── fonts/             # Font chữ
│   │   ├── images/            # Hình ảnh
│   │   ├── icons/             # Icons
│   │   └── animations/        # Lottie animations
│   │
│   ├── components/            # Components tái sử dụng
│   │   ├── common/           # Components dùng chung
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   └── specific/         # Components cụ thể
│   │
│   ├── screens/              # Màn hình/Pages
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── index.ts
│   │   ├── Home/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── index.ts
│   │   └── Profile/
│   │       ├── ProfileScreen.tsx
│   │       └── index.ts
│   │
│   ├── navigation/           # Cấu hình điều hướng
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── types.ts
│   │
│   ├── services/            # API và services
│   │   ├── api/
│   │   │   ├── axios.config.ts
│   │   │   ├── auth.api.ts
│   │   │   ├── user.api.ts
│   │   │   └── index.ts
│   │   └── storage/
│   │       └── AsyncStorageService.ts
│   │
│   ├── store/               # State management (Redux/Zustand/MobX)
│   │   ├── slices/          # Redux slices
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   └── index.ts
│   │   ├── store.ts
│   │   └── hooks.ts
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── validation.ts
│   │   ├── formatters.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   │
│   ├── constants/           # Hằng số
│   │   ├── colors.ts
│   │   ├── sizes.ts
│   │   ├── routes.ts
│   │   └── index.ts
│   │
│   ├── types/               # TypeScript types/interfaces
│   │   ├── user.types.ts
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   ├── theme/               # Theme configuration
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   ├── locales/             # i18n - Đa ngôn ngữ
│   │   ├── en.json
│   │   ├── vi.json
│   │   └── index.ts
│   │
│   └── App.tsx              # Component gốc
│
├── __tests__/               # Unit tests
├── e2e/                     # End-to-end tests
├── .env                     # Environment variables
├── .env.development
├── .env.production
├── .eslintrc.js            # ESLint configuration
├── .prettierrc.js          # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler configuration
├── package.json
├── app.json
└── README.md
```

## Chi tiết các thư mục quan trọng

### 1. **src/components/**
Chứa các component có thể tái sử dụng trong toàn bộ ứng dụng.

**Ví dụ:**
- `Button.tsx` - Button component tùy chỉnh
- `Input.tsx` - Input field component
- `Card.tsx` - Card container component
- `Loading.tsx` - Loading indicator

### 2. **src/screens/**
Chứa các màn hình chính của ứng dụng, mỗi màn hình thường tương ứng với một route trong navigation.

**Cấu trúc screen:**
```tsx
// screens/Home/HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};
```

### 3. **src/navigation/**
Quản lý điều hướng giữa các màn hình (React Navigation).

**Các loại navigator phổ biến:**
- Stack Navigator
- Tab Navigator
- Drawer Navigator

### 4. **src/services/**
Chứa logic gọi API, kết nối database, và các service khác.

**Ví dụ API service:**
```tsx
// services/api/auth.api.ts
import axios from './axios.config';

export const authAPI = {
  login: (email: string, password: string) => 
    axios.post('/auth/login', { email, password }),
  
  register: (userData: RegisterData) => 
    axios.post('/auth/register', userData),
};
```

### 5. **src/store/**
Quản lý state toàn cục (Redux Toolkit, Zustand, MobX, Context API).

**Ví dụ với Redux Toolkit:**
```tsx
// store/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
```

### 6. **src/hooks/**
Custom hooks để tái sử dụng logic.

**Ví dụ:**
```tsx
// hooks/useAuth.ts
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token } = useSelector(state => state.auth);
  const isAuthenticated = !!token;
  
  return { user, isAuthenticated };
};
```

### 7. **src/utils/**
Các hàm tiện ích, helper functions.

**Ví dụ:**
- `formatDate.ts` - Format ngày tháng
- `validation.ts` - Validate form
- `storage.ts` - AsyncStorage helpers

### 8. **src/types/**
TypeScript type definitions và interfaces.

```tsx
// types/user.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}
```

## Các thư viện phổ biến

### Navigation
```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

### State Management
```bash
# Redux Toolkit
npm install @reduxjs/toolkit react-redux

# Zustand (lightweight alternative)
npm install zustand

# MobX
npm install mobx mobx-react-lite
```

### UI Libraries
```bash
# React Native Paper
npm install react-native-paper

# Native Base
npm install native-base

# React Native Elements
npm install @rneui/themed @rneui/base
```

### Network
```bash
npm install axios
npm install @tanstack/react-query  # React Query
```

### Forms
```bash
npm install react-hook-form
npm install yup  # Validation
```

### Storage
```bash
npm install @react-native-async-storage/async-storage
```

### Icons
```bash
npm install react-native-vector-icons
```

### Animations
```bash
npm install react-native-reanimated
npm install lottie-react-native
```

### i18n (Đa ngôn ngữ)
```bash
npm install i18next react-i18next
```

### Environment Variables
```bash
npm install react-native-config
npm install react-native-dotenv
```

## File cấu hình quan trọng

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2017"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@screens/*": ["screens/*"],
      "@services/*": ["services/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    },
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
```

### .prettierrc.js
```javascript
module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  printWidth: 80,
};
```

### .eslintrc.js
```javascript
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 'warn',
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

## Best Practices

### 1. **Tổ chức Component**
- Mỗi component nên có file riêng
- Sử dụng index.ts để export các component
- Tách logic ra custom hooks khi phức tạp

### 2. **Naming Convention**
- Components: PascalCase (`HomeScreen.tsx`)
- Files: camelCase hoặc kebab-case
- Folders: lowercase hoặc PascalCase cho screen folders
- Constants: UPPER_SNAKE_CASE

### 3. **Import Organization**
```tsx
// 1. External libraries
import React from 'react';
import { View, Text } from 'react-native';

// 2. Internal modules
import { Button } from '@components/common';
import { useAuth } from '@hooks/useAuth';

// 3. Types
import type { User } from '@types/user.types';

// 4. Styles
import styles from './styles';
```

### 4. **Code Splitting**
- Lazy load screens không cần thiết ngay lập tức
- Tách logic phức tạp thành custom hooks
- Sử dụng memo cho components render nhiều

### 5. **Environment Management**
```
.env
.env.development
.env.staging
.env.production
```

### 6. **Testing Structure**
```
__tests__/
├── components/
├── screens/
├── utils/
└── integration/
```

## Các Pattern phổ biến

### Container/Presenter Pattern
```
screens/Home/
├── HomeScreen.tsx           # Container (logic)
├── HomeView.tsx            # Presenter (UI)
├── useHome.ts              # Custom hook
└── styles.ts               # Styles
```

### Feature-based Structure (cho dự án lớn)
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   └── profile/
│       ├── components/
│       ├── screens/
│       └── services/
└── shared/
    ├── components/
    ├── hooks/
    └── utils/
```

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Native Directory](https://reactnative.directory/)

---

**Lưu ý:** Cấu trúc này có thể điều chỉnh tùy theo quy mô và yêu cầu của dự án. Với dự án nhỏ, có thể đơn giản hóa. Với dự án lớn, nên xem xét feature-based structure.