# Coding Conventions

### General Rules
- Use **TypeScript** with strict types.
- Prefer **functional components** over class components.
- Use `StyleSheet.create()` or centralized theme files.
- Follow linting and formatting from `.eslintrc.js` and `.prettierrc.js`.
- Keep components **small, reusable, and stateless** when possible.
- Use `modal.open()` to open a Modal component and use function useModal to  `const { close, done } = useModal();` 
- Use available components in project to create ui.
- when component has button let's use CustomButton `CustomButton.tsx`
- With Svg download of MCP or Figma, let's create component in folder `src/components/Svgs`,
- when create a new screen let's detach each section like `src/components/screens/Home`

### File Naming
- **Components/Screens:** PascalCase (e.g. `HomeScreen.tsx`)
- **Hooks/Utilities:** camelCase (e.g. `useBluetooth.ts`)
- Avoid deep folder nesting.

### Documentation
- Add short comments for major logic blocks.
- Document props and types using TypeScript interfaces.
