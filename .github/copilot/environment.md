# Environment Configuration

### Environment Variables
- Store all environment variables in `.env`.
- Reference `.env.example` for structure.
- Never commit sensitive keys or credentials.

### Usage Example
```ts
import { API_URL } from '@env';
fetch(`${API_URL}/users`);