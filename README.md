# ElixirBackend

A Node.js backend application with a well-organized structure.

## Project Structure

```
ElixirBackend/
├── src/                    # Source code
│   ├── api/               # API related code
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # API routes
│   │   └── validators/    # Request validation schemas
│   ├── config/            # Configuration files
│   ├── db/                # Database related files
│   │   ├── migrations/    # Database migrations
│   │   └── schema/        # Database schemas
│   ├── services/          # Business logic services
│   ├── utils/             # Utility functions
│   └── app.js             # Application entry point
├── tests/                 # Test files
├── .env                   # Environment variables
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables as needed

3. Run the application:
   ```bash
   npm start
   ```

## Development

- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm run lint` - Run linter 