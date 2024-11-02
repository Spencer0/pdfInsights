# SpendSage Developer Documentation

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Local Development](#local-development)
- [Testing](#testing)
- [AWS Deployment](#aws-deployment)
- [Common Issues](#common-issues)
- [Useful Commands Reference](#useful-commands-reference)

## Prerequisites

### Required Software
```bash
# macOS (using Homebrew)
brew install node@18
brew install docker
brew install aws-cli
brew install terraform
brew install jq

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y docker.io
sudo apt-get install -y awscli
sudo apt-get install -y terraform
sudo apt-get install -y jq

# Windows (using Chocolatey)
choco install nodejs-lts
choco install docker-desktop
choco install awscli
choco install terraform
choco install jq
```

### AWS Configuration
```bash
# Configure AWS CLI
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (e.g., us-west-2)
# - Default output format (json)

# Test AWS CLI configuration
aws sts get-caller-identity
```

## Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-org/spendage
cd spendage

# Install project dependencies
npm install

# Install Turborepo globally
npm install -g turbo

# Copy environment files
cp packages/frontend/.env.example packages/frontend/.env
cp packages/backend/.env.example packages/backend/.env

# Initialize git hooks
npm run prepare
```

## Local Development

### Start Development Environment
```bash
# Start all services using Docker Compose
docker-compose up

# Or start specific services
docker-compose up frontend backend redis

# Start in detached mode
docker-compose up -d
```

### Frontend Development
```bash
# Start frontend development server
cd packages/frontend
npm run dev

# Build frontend for production
npm run build

# Start production build locally
npm run start
```

### Backend Development
```bash
# Start backend development server
cd packages/backend
npm run dev

# Build backend for production
npm run build

# Start production build locally
npm run start
```

### Watch Mode (Development)
```bash
# Watch all packages
turbo run dev --parallel

# Watch specific package
turbo run dev --filter=frontend
```

## Testing

### Run All Tests
```bash
# Run all tests across packages
npm test

# Run tests with coverage
npm run test:coverage
```

### Package-Specific Tests
```bash
# Frontend tests
cd packages/frontend
npm test
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run e2e          # Run Cypress E2E tests

# Backend tests
cd packages/backend
npm test
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run test:e2e     # Run E2E API tests
```

## AWS Deployment

### Infrastructure Deployment
```bash
# Deploy CloudFormation stack
cd infrastructure
./scripts/deploy.sh <environment>

# Example for development environment
./scripts/deploy.sh dev

# Destroy stack (careful!)
./scripts/destroy.sh <environment>
```

### Application Deployment
```bash
# Deploy all packages
npm run deploy

# Deploy specific package
npm run deploy:frontend
npm run deploy:backend

# Deploy to specific environment
npm run deploy:staging
npm run deploy:production
```

### Monitor Deployment
```bash
# View CloudFormation stack status
aws cloudformation describe-stacks --stack-name spendage-dev

# View ECS service status
aws ecs describe-services --cluster spendage-cluster-dev --services spendage-service-dev

# View logs
aws logs get-log-events --log-group /ecs/spendage-dev --log-stream <stream-name>
```

## Common Issues

### Docker Issues
```bash
# Reset Docker environment
docker system prune -a
docker volume prune

# Restart Docker daemon
# macOS/Windows: Restart Docker Desktop
# Linux:
sudo systemctl restart docker
```

### AWS Issues
```bash
# Clear AWS CLI credentials
rm ~/.aws/credentials
aws configure

# Check AWS resource limits
aws service-quotas get-service-quota \
    --service-code servicequotas \
    --quota-code L-F678F1CE
```

## Useful Commands Reference

### Docker Commands
```bash
# View running containers
docker ps

# View logs
docker logs -f container_name

# Shell into container
docker exec -it container_name bash

# Rebuild specific service
docker-compose build service_name
```

### Database Commands
```bash
# Connect to local DocumentDB
mongosh "mongodb://localhost:27017"

# Connect to AWS DocumentDB (requires SSH tunnel)
./scripts/docdb-connect.sh
```

### Cache Commands
```bash
# Connect to Redis CLI
redis-cli

# Monitor Redis
redis-cli monitor

# Clear Redis cache
redis-cli FLUSHALL
```

### Build Commands
```bash
# Clean builds
npm run clean

# Build all packages
npm run build

# Build specific package
turbo run build --filter=package_name
```

### Lint and Format
```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Performance Testing
```bash
# Run load tests
npm run test:load

# Run performance benchmarks
npm run benchmark
```

### Dependency Management
```bash
# Update all dependencies
npm run update-deps

# Check for outdated packages
npm outdated

# Audit dependencies
npm audit
npm audit fix
```

## Environment Variables

Required environment variables for local development:

```bash
# Frontend (.env)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AWS_REGION=us-west-2
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-west-2_xxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxx

# Backend (.env)
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
MONGODB_URI=mongodb://localhost:27017/spendage
REDIS_URL=redis://localhost:6379
SQS_QUEUE_URL=https://sqs.us-west-2.amazonaws.com/123456789012/spendage-processing-queue-dev
```

Remember to never commit sensitive environment variables to version control.
