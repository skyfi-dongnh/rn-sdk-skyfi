# Zustand State Management - Usage Guide

This project uses Zustand for state management. Zustand is a small, fast, and scalable state management solution.

## Available Stores

### 1. Auth Store (`useAuthStore`)

Manages user authentication state.

**State:**
- `user` - Current user data
- `token` - Auth token
- `isAuthenticated` - Authentication status
- `isLoading` - Loading state
- `error` - Error message

**Actions:**
- `login(credentials)` - Login user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `setUser(user)` - Set user data
- `setToken(token)` - Set auth token
- `loadStoredAuth()` - Load auth from storage
- `clearError()` - Clear error state

**Usage:**

```tsx
import { useAuthStore } from './store';

// Using the hook directly
const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  return (
    <View>
      {isAuthenticated ? (
        <>
          <Text>Welcome {user?.name}</Text>
          <Button onPress={logout} title="Logout" />
        </>
      ) : (
        <Button onPress={() => login({ email, password })} title="Login" />
      )}
    </View>
  );
};

// Using selectors (better performance)
import { authSelectors } from './store';

const MyComponent = () => {
  const user = useAuthStore(authSelectors.user);
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);

  return <Text>{user?.name}</Text>;
};

// Using the custom hook
import { useAuth } from './hooks';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return <Text>{user?.name}</Text>;
};
```

### 2. App Settings Store (`useAppStore`)

Manages application settings and preferences.

**State:**
- `language` - Current language
- `theme` - Current theme (light/dark)
- `isOnboarded` - Onboarding status
- `notifications` - Notification settings
- `isLoading` - Loading state

**Actions:**
- `setLanguage(language)` - Change app language
- `setTheme(theme)` - Change app theme
- `setOnboarded(value)` - Mark onboarding complete
- `toggleNotifications(enabled)` - Toggle notifications
- `toggleNotificationSound(enabled)` - Toggle notification sound
- `toggleNotificationVibration(enabled)` - Toggle vibration
- `loadAppSettings()` - Load settings from storage
- `resetAppSettings()` - Reset to defaults

**Usage:**

```tsx
import { useAppStore } from './store';

const SettingsScreen = () => {
  const { theme, language, setTheme, setLanguage } = useAppStore();

  return (
    <View>
      <Text>Current theme: {theme}</Text>
      <Button onPress={() => setTheme('dark')} title="Dark Mode" />

      <Text>Current language: {language}</Text>
      <Button onPress={() => setLanguage('vi')} title="Tiếng Việt" />
    </View>
  );
};

// Using the custom hook
import { useAppSettings } from './hooks';

const SettingsScreen = () => {
  const { theme, setTheme, notifications, toggleNotifications } = useAppSettings();

  return (
    <View>
      <Switch
        value={notifications.enabled}
        onValueChange={toggleNotifications}
      />
    </View>
  );
};
```

## Store Initialization

Stores are automatically initialized in `App.tsx`:

```tsx
import { useInitializeStores } from './src/store';

const App = () => {
  useInitializeStores(); // Loads stored data on app start

  return <NavigationContainer>...</NavigationContainer>;
};
```

## Creating a New Store

1. Create a new file in `src/store/slices/`:

```tsx
// src/store/slices/todoSlice.ts
import { create } from 'zustand';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
}

interface TodoActions {
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

export type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  isLoading: false,

  addTodo: (title) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
}));

// Export selectors
export const todoSelectors = {
  todos: (state: TodoStore) => state.todos,
  completedTodos: (state: TodoStore) =>
    state.todos.filter((todo) => todo.completed),
  activeTodos: (state: TodoStore) =>
    state.todos.filter((todo) => !todo.completed),
};
```

2. Export in `src/store/slices/index.ts`:

```tsx
export { useTodoStore, todoSelectors } from './todoSlice';
export type { TodoStore } from './todoSlice';
```

3. Use in components:

```tsx
import { useTodoStore, todoSelectors } from './store';

const TodoList = () => {
  const todos = useTodoStore(todoSelectors.todos);
  const addTodo = useTodoStore((state) => state.addTodo);

  return (
    <View>
      {todos.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </View>
  );
};
```

## Best Practices

1. **Use Selectors** - For better performance, use selectors to subscribe to specific state slices
2. **Separate State and Actions** - Keep state and actions in separate interfaces for clarity
3. **Persist Important Data** - Use AsyncStorage to persist data across app restarts
4. **Custom Hooks** - Create custom hooks to encapsulate store logic
5. **TypeScript** - Always type your stores properly

## Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand with TypeScript](https://docs.pmnd.rs/zustand/guides/typescript)
