# Ecommerce Admin Dashboard

A modern, responsive admin dashboard built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components to manage your ecommerce platform.

## Features

- 🔐 **Authentication** - Secure login system with JWT tokens
- 📊 **Dashboard** - Overview of key metrics and statistics
- 📦 **Product Management** - Create, read, update, and delete products
- 🛒 **Order Management** - View and manage customer orders
- 👥 **Customer Management** - Manage customer accounts
- 🏪 **Vendor Management** - Oversee vendor accounts and products
- ⚙️ **Settings** - Configure platform settings
- 🎨 **Modern UI** - Beautiful interface with shadcn/ui components
- 📱 **Responsive** - Works on all device sizes
- 🚀 **Fast** - Optimized with Next.js 15 App Router

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: RESTful API at `https://ecommerce.shansarfraz.com`

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Access to the ecommerce API

## Installation

1. **Clone the repository**:
   ```bash
   cd ecommerce-admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your API URL:
   ```env
   NEXT_PUBLIC_API_URL=https://ecommerce.shansarfraz.com
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ecommerce-admin/
├── app/
│   ├── (auth)/
│   │   └── login/              # Login page
│   ├── (dashboard)/
│   │   ├── dashboard/          # Main dashboard
│   │   ├── products/           # Products management
│   │   ├── orders/             # Orders management
│   │   ├── customers/          # Customer management
│   │   ├── vendors/            # Vendor management
│   │   ├── settings/           # Settings page
│   │   └── layout.tsx          # Dashboard layout with sidebar
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── components/
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── api-client.ts           # API client for backend
│   ├── auth-context.tsx        # Authentication context
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Authentication

The admin dashboard uses JWT-based authentication:

1. Login at `/login` with your admin credentials
2. The access token is stored in `localStorage`
3. Protected routes automatically redirect to login if not authenticated
4. The token is included in all API requests via the Authorization header

## API Integration

The dashboard integrates with the ecommerce API at `https://ecommerce.shansarfraz.com`:

### API Client (`lib/api-client.ts`)

The API client provides methods for:
- Authentication (login, register, profile)
- Products (CRUD operations)
- Orders (list, view)
- Customers (list, view)
- Vendors (list, manage)
- Dashboard metrics

### Example Usage

```typescript
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';

const { token } = useAuth();

// Get products
const products = await apiClient.getProducts(token, { page: 1, limit: 10 });

// Create product
const newProduct = await apiClient.createProduct(token, {
  name: 'Product Name',
  price: 99.99,
  description: 'Product description'
});
```

## Styling

The dashboard uses:
- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming (supports light/dark mode)
- **shadcn/ui** for pre-built, accessible components

### Adding New Components

To add shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
```

Start the server:

```bash
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## Features Roadmap

- [ ] Dark mode toggle
- [ ] Advanced product filters
- [ ] Bulk operations
- [ ] Export data to CSV/Excel
- [ ] Real-time notifications
- [ ] File upload for product images
- [ ] Role-based access control UI
- [ ] Analytics and reports
- [ ] Email templates management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
