# CallNow Ambulance Dispatch Frontend

CallNow is a responsive ambulance dispatch and patient transport platform. The frontend connects passengers, drivers, dispatch administrators, and superadministrators through a public website and role-based dashboard workspaces.

The application supports ambulance discovery, ride requests, dispatch coordination, trip tracking, payment history, account management, password recovery, and social authentication.

## Product Areas

### Public experience

- Responsive CallNow homepage with emergency-focused booking calls to action.
- Ambulance fleet directory at `/ambulances`.
- Server-side ambulance filtering, search, pagination, and page-size selection.
- Help center with searchable accordion answers.
- Contact page with email-based support form and emergency information.
- CallNow journal/blog page with category filters and search.
- Responsive navigation and footer shared across public pages.

### Passenger workspace

- Passenger overview and ride activity metrics.
- Ambulance booking with pickup and destination details.
- Request history and request cancellation.
- Trip history and trip details.
- Payment initiation and payment history.
- Profile and account settings.

### Driver workspace

- Driver overview and availability information.
- Dispatch queue for pending ambulance requests.
- Accepting and rejecting requests.
- Assigned ambulance status management.
- Trip start, completion, and fare updates.
- Driver payment history and account settings.

### Admin and superadmin workspaces

- Operations overview for requests, trips, fleet, users, and payments.
- User and driver management.
- Ambulance fleet creation, editing, and deletion.
- Request and trip monitoring.
- Payment records.
- Profile and account settings.

## Technology Stack

### Application

- React 19
- TypeScript 6
- Vite 8
- React Router 8
- React DOM

### State and API communication

- Redux Toolkit
- RTK Query for API queries, mutations, cache tags, loading states, and request lifecycle management
- Axios as the RTK Query transport layer
- Bearer-token authentication through an Axios request interceptor

### UI and styling

- Tailwind CSS v4
- `@tailwindcss/vite`
- Base UI React primitives
- shadcn-style reusable UI components
- Class Variance Authority for component variants
- Lucide React icons
- Geist Variable font
- `tw-animate-css`

### Authentication and integrations

- Username/password authentication
- Google OAuth and Facebook OAuth flows
- Password recovery with email OTP verification
- SSLCommerz payment gateway flow
- SweetAlert2 and application toast helpers for feedback

## Architecture

```text
src/
├── assets/                 Images, logos, and static frontend assets
├── components/
│   ├── auth/               Login and registration UI
│   ├── dashboard/          Shared and role-specific dashboard screens
│   ├── home/               Homepage sections and data
│   ├── layout/             Public layout, navbar, footer, dashboard shell
│   └── ui/                 Reusable buttons, dialogs, menus, sheets, etc.
├── config/                 Environment-backed frontend configuration
├── lib/                    Axios, auth session, toast, and utility helpers
├── pages/                  Route-level public and authentication pages
├── redux/
│   ├── auth/               Authentication and user profile endpoints
│   ├── admin/              Admin management endpoints
│   ├── ambulances/         Ambulance list and status endpoints
│   ├── payments/           Payment endpoints
│   ├── requests/           Ambulance request endpoints
│   └── trips/              Trip endpoints
├── routes/                 React Router configuration
├── index.css               Tailwind import and global theme tokens
└── main.tsx                React, Redux, router, and progress-bar bootstrap
```

## API Integration

The frontend expects the FastAPI backend to expose endpoints below the `/api/v1` prefix. All normal application requests use RTK Query through the shared Axios base query.

The main API modules are:

| Module | Responsibility |
| --- | --- |
| `auth` | Registration, login, OAuth exchange, OTP, password, profile |
| `admin` | Admins, drivers, users, and ambulance administration |
| `ambulances` | Fleet listing, status filtering, assigned ambulance status |
| `requests` | Passenger requests and driver dispatch actions |
| `trips` | Passenger, driver, and admin trip operations |
| `payments` | Payment creation, history, and transaction lookup |

### Ambulance list API

The fleet page uses one paginated endpoint:

```text
GET /api/v1/ambulances/?page=1&page_size=12
GET /api/v1/ambulances/?page=1&page_size=24&status=available
GET /api/v1/ambulances/?page=1&page_size=36&search=ABC
```

The expected response shape is:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "page_size": 12,
  "pages": 0
}
```

The frontend also contains a compatibility transform for older backend instances that still return a plain ambulance array.

## Environment Variables

Create a `.env` file in the frontend project directory:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_SUPER_ADMIN=your-superadmin-username
VITE_PASSWORD=your-superadmin-password
```

`VITE_BACKEND_URL` is required. The frontend builds its API base URL as:

```text
${VITE_BACKEND_URL}/api/v1
```

Only variables prefixed with `VITE_` are exposed to the browser. Do not place private secrets in frontend environment variables. The superadmin variables are retained for project configuration compatibility and should not be treated as secure credentials in a browser application.

## Requirements

- Node.js 22 or newer is recommended.
- pnpm is used by the project lockfile and Dockerfile.
- A running FastAPI backend is required for authentication and live data.

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the Vite development server:

```bash
pnpm dev
```

The application is available at:

```text
http://localhost:5173
```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Run TypeScript project builds and create a production bundle |
| `pnpm lint` | Run ESLint across the project |
| `pnpm preview` | Serve the production bundle locally |

## Docker

The included Dockerfile uses Node 22 Alpine, installs dependencies with pnpm, and starts Vite on all interfaces.

Build the image:

```bash
docker build -t callnow-frontend .
```

Run the development container:

```bash
docker run --rm -it \
  -p 5173:5173 \
  --env-file .env \
  callnow-frontend
```

Open `http://localhost:5173` in a browser.

## Application Routes

### Public routes

- `/` - CallNow homepage
- `/ambulances` - Paginated ambulance fleet directory
- `/blog` - CallNow journal
- `/help` - Help center
- `/contact` - Support and emergency contact page
- `/forgot-password` - Start password recovery
- `/verify-otp` - Verify password recovery OTP
- `/reset-password` - Set a new password
- `/oauth/callback` - Complete social login exchange
- `/payment/result` - Display payment result details

### Dashboard routes

The dashboard selects the workspace based on the authenticated user role:

- `/dashboard/admin/*`
- `/dashboard/superadmin/*`
- `/dashboard/passenger/*`
- `/dashboard/driver/*`

Dashboard sections include overview, booking or dispatch, requests, trips, payments, fleet, people, profile, and account settings where applicable.

## Authentication Flow

1. The user signs in through the login dialog or social login provider.
2. The frontend stores the returned access token in the auth session helper.
3. Axios attaches the token as a Bearer token to API requests.
4. The dashboard loads the user profile and selects the appropriate role workspace.
5. Logout clears the local access token and returns the user to the homepage.

## Design System

The frontend uses a shared CallNow visual system:

- Navy for navigation, primary text, and operational surfaces.
- Teal for active states, links, availability, and focus indicators.
- Red for emergency actions and urgent contact actions.
- Pale blue backgrounds for public page sections and information surfaces.
- Geist Variable for consistent responsive typography.
- Shared `max-w-7xl` containers and responsive gutters across public pages.

## Backend

The backend lives in the sibling `fastapi/em-ambulance-dispatch-system` project. It is a FastAPI application with SQLAlchemy models, authentication, role-based dependencies, Redis-backed OTP/OAuth state, and payment gateway integration.

Start the backend separately according to its own README and ensure its CORS configuration allows the frontend origin.

## Production Notes

- Configure `VITE_BACKEND_URL` for the deployed API origin before building.
- Configure backend CORS for the deployed frontend origin.
- Configure OAuth callback URLs for the deployed backend and frontend origins.
- Use HTTPS in production for token transport and OAuth flows.
- Do not commit `.env` files or expose private backend credentials in frontend source code.
