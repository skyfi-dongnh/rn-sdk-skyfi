# State Management with Zustand

### General Rules
- Define all global states using Zustand.
- Each store file should be small and isolated by feature.
- Avoid React Context for global states.

### Store Guidelines
- Use `create()` from Zustand.
- Persist data only when needed using `persist()` middleware.
- Keep actions pure and predictable.
- Document store purpose with a top-level comment.

### Example
```ts
import { create } from 'zustand';

interface AuthState {
  user: string | null;
  login: (name: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (name) => set({ user: name }),
}));
---

### 🔹 4. `.github/copilot/native-integration.md`
```markdown
# Native Integration

### iOS
- iOS native files are in `ios/RNSkyFiSdk/`.
- Use Swift for new modules.
- Keep `Info.plist` and privacy files updated.

### Android
- Android config files: `build.gradle`, `settings.gradle`, `gradle.properties`.
- Use Kotlin for new modules.

### Cross-Platform Notes
- Match native module names consistently (Swift ↔ Kotlin ↔ JS).
- When exposing native features (e.g. Bluetooth, Camera), create TypeScript wrappers.