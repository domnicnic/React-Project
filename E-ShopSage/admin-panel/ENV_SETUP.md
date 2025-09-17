# Environment Variables Setup Guide

## Dynamic Title Configuration

### 1. Create Environment File

Create a `.env` file in your project root with the following content:

```env
# API Configuration
VITE_BASE_URL=http://localhost:7000
VITE_APP_TITLE=E-ShopSage Admin Panel
VITE_APP_DB=your_database_name
VITE_APP_USER_NAME=your_username
VITE_APP_DB_PASSWORD=your_password
```

### 2. How Dynamic Titles Work

#### **Base Title (index.html)**
The base title is set in `index.html` using Vite environment variables:
```html
<title><%= VITE_APP_TITLE || 'E-ShopSage Admin Panel' %></title>
```

#### **Page-Specific Titles**
Each page can set its own title using the `useTitle` hook:

```jsx
import { useTitle } from '../../utils/titleManager'

function MyComponent() {
    useTitle('My Page Title')
    // Component content...
}
```

### 3. Available Title Functions

```jsx
import { setTitle, setPageTitle, resetTitle } from '../../utils/titleManager'

// Set custom title
setTitle('Custom Title')

// Set page-specific titles
setPageTitle.dashboard()    // "Dashboard - E-ShopSage Admin Panel"
setPageTitle.profile()      // "Profile - E-ShopSage Admin Panel"
setPageTitle.login()        // "Login - E-ShopSage Admin Panel"

// Reset to base title
resetTitle()                // "E-ShopSage Admin Panel"
```

### 4. Environment Variables

All environment variables must start with `VITE_` to be accessible in the frontend:

- `VITE_APP_TITLE` - Main application title
- `VITE_BASE_URL` - API base URL
- `VITE_APP_DB` - Database name
- `VITE_APP_USER_NAME` - Database username
- `VITE_APP_DB_PASSWORD` - Database password

### 5. Accessing Environment Variables

```jsx
// In React components
const title = import.meta.env.VITE_APP_TITLE
const apiUrl = import.meta.env.VITE_BASE_URL

// In utility files
const BASE_TITLE = import.meta.env.VITE_APP_TITLE || 'Default Title'
```

### 6. Development vs Production

For different environments, create different files:
- `.env` - Default environment variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

### 7. Example Usage

```jsx
// In a component
import { useTitle } from '../../utils/titleManager'

function UserProfile() {
    useTitle('User Profile') // Sets title to "User Profile - E-ShopSage Admin Panel"
    
    return (
        <div>
            <h1>User Profile</h1>
            {/* Component content */}
        </div>
    )
}
```

### 8. Security Note

⚠️ **Important**: Never commit `.env` files to version control. They contain sensitive information.

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

### 9. Testing

To test dynamic titles:

1. Create `.env` file with your desired title
2. Restart your development server
3. Navigate between pages
4. Check browser tab titles

The title should change dynamically based on the current page! 