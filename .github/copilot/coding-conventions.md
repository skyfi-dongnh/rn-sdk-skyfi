# Coding Conventions

### General Rules
- Use **TypeScript** with strict types.
- Prefer **functional components** over class components.
- Use `StyleSheet.create()` or centralized theme files.
- Follow linting and formatting from `.eslintrc.js` and `.prettierrc.js`.
- Keep components **small, reusable, and stateless** when possible.

### File Naming
- **Components/Screens:** PascalCase (e.g. `HomeScreen.tsx`)
- **Hooks/Utilities:** camelCase (e.g. `useBluetooth.ts`)
- Avoid deep folder nesting.

### Documentation
- Add short comments for major logic blocks.
- Document props and types using TypeScript interfaces.
