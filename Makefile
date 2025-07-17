.PHONY: dev backend frontend install build start format lint preview

# Start both frontend and backend concurrently in dev mode
dev:
	@echo "Starting backend and frontend in development mode..."
	cd backend && pnpm run dev & cd frontend && pnpm run dev

# Start backend only
backend:
	@echo "Starting backend..."
	cd backend && pnpm run dev

# Start frontend only
frontend:
	@echo "Starting frontend..."
	cd frontend && pnpm run dev

# Install dependencies for both frontend and backend
install:
	@echo "Installing backend dependencies..."
	cd backend && pnpm install
	@echo "Installing frontend dependencies..."
	cd frontend && pnpm install

# Build both frontend and backend
build:
	@echo "Building backend..."
	cd backend && pnpm run build
	@echo "Building frontend..."
	cd frontend && pnpm run build

# Start backend and frontend in production mode
start:
	@echo "Starting backend..."
	cd backend && pnpm run start &
	@echo "Previewing frontend build..."
	cd frontend && pnpm run preview