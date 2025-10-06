# RunWei API - Project Structure Documentation

## Overview

RunWei API is a comprehensive FastAPI-based backend platform designed to connect entrepreneurs with business opportunities, events, and networking resources. The platform features sophisticated user management, AI-powered recommendations, content scraping, and multi-channel communication systems.

## Technology Stack

- **Framework**: FastAPI with async/await support
- **Database**: PostgreSQL with SQLModel/SQLAlchemy ORM
- **Cache**: Redis for caching and rate limiting
- **Background Tasks**: Celery for asynchronous processing
- **Authentication**: JWT-based with OAuth2/OIDC support
- **AI Integration**: Azure OpenAI for recommendations and content processing
- **Storage**: MinIO for file storage
- **Monitoring**: Sentry for error tracking
- **Containerization**: Docker and Docker Compose

## Project Architecture

### Core Application Structure

```
runwei-api/
├── app/                           # Main application package
│   ├── api/                       # API layer and endpoints
│   │   ├── v1/                    # API version 1 endpoints (/api/v1/)
│   │   ├── deps.py                # Dependency injection
│   │   └── celery_task.py         # Background tasks
│   ├── core/                      # Core configuration and utilities
│   ├── crud/                      # Database operations layer
│   ├── db/                        # Database configuration
│   ├── models/                    # SQLModel database models
│   ├── schemas/                   # Pydantic request/response schemas
│   ├── utils/                     # Utility functions and helpers
│   ├── templates/                 # HTML email templates
│   ├── plugins/                   # External service integrations
│   └── main.py                    # FastAPI application entry point
├── config/                        # Configuration files
│   ├── environment/               # Environment configuration
│   │   ├── .env                   # Environment variables (local)
│   │   ├── .env.example           # Environment template
│   │   ├── .env.development       # Development environment
│   │   ├── .env.staging           # Staging environment
│   │   └── .env.production        # Production environment
│   ├── docker/                    # Docker configuration
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── docker-compose-dev.yml
│   ├── deploy/                    # Deployment configuration
│   │   ├── deploy.sh
│   │   ├── deploy-beta.sh
│   │   └── containerapp-deploy.yaml
│   ├── database/                  # Database configuration
│   │   └── alembic.ini
│   ├── services/                  # Service configurations
│   │   ├── celery.conf.py         # Celery worker configuration
│   │   ├── redis.conf             # Redis configuration
│   │   ├── minio.conf             # MinIO storage configuration
│   │   └── sentry.conf            # Sentry monitoring configuration
│   └── logging/                   # Logging configuration
│       └── log_config.yaml
├── alembic/                       # Database migrations
├── data/                          # Training data and datasets
├── scripts/                       # Utility scripts
├── test/                          # Test suite
└── project configuration files    # pyproject.toml, requirements.txt, Makefile, etc.
```

## Detailed Structure Breakdown

### Configuration Management (`config/`)

**Purpose**: Centralized configuration file organization for better project structure

- **`environment/`**: Environment variables and secrets
  - `.env`: Local development environment variables
  - `.env.example`: Template for environment setup
  - `.env.development`: Development environment variables
  - `.env.staging`: Staging environment variables
  - `.env.production`: Production environment variables

- **`docker/`**: Container configuration
  - `Dockerfile`: Application container definition
  - `docker-compose.yml`: Production environment setup
  - `docker-compose-dev.yml`: Development environment setup

- **`deploy/`**: Deployment scripts and configurations
  - `deploy.sh`: Production deployment script
  - `deploy-beta.sh`: Beta environment deployment
  - `containerapp-deploy.yaml`: Azure Container Apps configuration

- **`database/`**: Database configuration files
  - `alembic.ini`: Database migration configuration

- **`services/`**: External service configurations
  - `celery.conf.py`: Celery worker and task configuration
  - `redis.conf`: Redis cache and session configuration
  - `minio.conf`: MinIO object storage configuration
  - `sentry.conf`: Sentry error tracking configuration

- **`logging/`**: Logging and monitoring configuration
  - `log_config.yaml`: Logging configuration and formatting

**Benefits of this organization**:
- Clear separation of concerns
- Easier to locate configuration files
- Better version control for deployment configurations
- Simplified CI/CD pipeline management
- Centralized service configuration management
- Environment-specific configurations and secrets management
- Secure handling of environment variables
- Reduced root directory clutter

### API Layer (`app/api/`)

**Purpose**: Handles HTTP requests, routing, and API versioning

**What it does**: This is where all REST API endpoints are defined. Think of it as the "front door" of your application - all external requests come through here.

#### API Versioning Strategy

**Current Version**: v1 (API version 1)
**URL Structure**: `/api/v1/endpoint`

**Benefits of Versioning**:
- **Backward Compatibility**: Old API versions continue to work
- **Gradual Migration**: Clients can upgrade at their own pace
- **Feature Evolution**: New features can be added without breaking existing clients
- **Clear Documentation**: Each version has its own documentation

#### `v1/` Directory - API Version 1 Endpoints
**Purpose**: Contains all API version 1 endpoints

**Version 1 Features**:
- User authentication and profile management
- Opportunity and event management
- Organization and partner management
- Notification and recommendation systems
- Content scraping and media management
- Basic CRUD operations for all entities

**Key Files Explained**:
- **Authentication Routes** (`auth.py`, `login.py`, `register.py`): Handle user login, registration, password reset, and token management
- **User Management** (`users.py`, `profiles.py`): CRUD operations for users and profiles
- **Opportunities** (`opportunities.py`): Manage business opportunities, grants, funding, etc.
- **Events** (`events.py`): Handle event creation, management, and RSVPs
- **Organizations** (`organizations.py`): Company and organization management
- **Partners** (`partners.py`): Partner relationship management
- **Notifications** (`notifications.py`): Send and manage user notifications
- **Recommendations** (`recommendations.py`): AI-powered content recommendations
- **Scrapers** (`scrapers.py`): Web scraping and data collection endpoints
- **Media** (`media.py`, `images.py`): File upload and media management

**For Team Members**: When you need to add a new API endpoint, create a new file here or add to an existing relevant file. Always follow the v1 API patterns.

#### Future API Versions

**v2/ Directory** (Future):
- Enhanced authentication with multi-factor authentication
- Advanced recommendation algorithms
- Real-time collaboration features
- GraphQL endpoints alongside REST
- Improved pagination and filtering
- WebSocket support for real-time updates

**Versioning Best Practices**:
- **Breaking Changes**: Only introduce breaking changes in new major versions
- **Deprecation Notice**: Provide 6-month notice before removing old versions
- **Migration Guides**: Create detailed migration documentation
- **Feature Flags**: Use feature flags to gradually roll out new features
- **Testing**: Test all versions simultaneously in CI/CD

#### `deps.py` - Dependency Injection
**Purpose**: Central dependency management system

**What it contains**:
- **Database Sessions**: Automatic database connection management
- **Authentication**: JWT token validation and user authentication
- **Authorization**: Role-based access control checks
- **Rate Limiting**: API rate limiting and throttling
- **Caching**: Redis cache integration
- **Current User**: Get the currently authenticated user

**For Team Members**: Use these dependencies in your API endpoints by importing them. Example: `@router.get("/users", dependencies=[Depends(get_current_user)])`

#### `celery_task.py` - Background Tasks
**Purpose**: Define long-running background tasks

**What it contains**:
- **Email Tasks**: Send welcome emails, notifications, newsletters
- **Scraping Tasks**: Automatically scrape websites for opportunities/events
- **Recommendation Tasks**: Generate AI-powered recommendations
- **Data Processing**: Clean and process uploaded data
- **Scheduled Tasks**: Daily/weekly maintenance tasks

**For Team Members**: When you need to run something in the background (like sending emails), define it here and call it from your API endpoints.

### Core Configuration (`app/core/`)

**Purpose**: Application-level configuration management and core utilities

**What it does**: This folder contains the "brain" of the application - all the core settings, security, and configuration logic.

#### `config.py` - Application Settings
**Purpose**: Central configuration file that reads from environment variables

**What it contains**:
- **Database Settings**: Connection strings, pool sizes, timeouts
- **External Services**: API keys for Mailgun, Azure, OpenAI, etc.
- **Feature Flags**: Enable/disable features based on environment
- **CORS Settings**: Which domains can access your API
- **Security Settings**: Secret keys, token expiration times

**For Team Members**: Add new configuration options here when integrating new services. Always use environment variables for sensitive data.

#### `security.py` - Authentication & Security
**Purpose**: Handle all security-related operations

**What it contains**:
- **Password Hashing**: Secure password storage using bcrypt
- **JWT Tokens**: Create and validate authentication tokens
- **OAuth Integration**: Google, LinkedIn, Facebook login
- **API Keys**: Generate and validate API access keys
- **Password Validation**: Check password strength requirements

**For Team Members**: Use functions from this file for any security-related operations. Never handle passwords or tokens manually.

#### `authz.py` - Authorization Logic
**Purpose**: Control who can access what resources

**What it contains**:
- **Role-Based Access**: Define what each user role can do
- **Resource Permissions**: Control access to specific opportunities, events, etc.
- **Policy Engine**: Uses Oso library for complex authorization rules

**For Team Members**: When you need to restrict access to certain features, define the rules here.

#### `celery.py` - Background Task Configuration
**Purpose**: Configure how background tasks are processed

**What it contains**:
- **Task Routing**: Which worker handles which type of task
- **Queue Configuration**: Priority queues for different task types
- **Worker Settings**: How many workers, memory limits, etc.

**For Team Members**: Modify this file when you need to change how background tasks are processed.

### Data Layer

#### Models (`app/models/`)

**Purpose**: Database schema definitions using SQLModel

**What it does**: These files define the structure of your database tables. Each file represents a database table with its columns, relationships, and constraints.

#### Core Entity Models Explained:

**User Management Models**:
- **`user_model.py`**: Internal system users (admins, staff)
- **`profile.py`**: External users (entrepreneurs, business owners)
- **`role_model.py`**: User roles (admin, moderator, user)
- **`group_model.py`**: User groups for permissions
- **`user_group.py`**: Many-to-many relationship between users and groups

**Content Models**:
- **`opportunity.py`**: Business opportunities, grants, funding
- **`event.py`**: Networking events, workshops, conferences
- **`organisation.py`**: Companies and organizations
- **`partner.py`**: Business partners and affiliates

**Interaction Models**:
- **`profile_opportunity.py`**: Track which opportunities users have viewed/applied to
- **`profile_event.py`**: Track event attendance and RSVPs
- **`recommendation.py`**: AI-generated recommendations for users

**Communication Models**:
- **`notification.py`**: In-app notifications
- **`email_preferences.py`**: User email preferences
- **`chat.py`**: Chat messages and threads

**Media Models**:
- **`media_model.py`**: General file storage
- **`image_media_model.py`**: Image-specific metadata

**Audit & Logging Models**:
- **`*_audit.py`**: Track changes to opportunities, events, partners
- **`user_log.py`**, **`profile_log.py`**: Track user activities

#### Reference/Lookup Models:
- **`industry.py`**: Industry categories
- **`opportunity_type.py`**: Types of opportunities (grant, loan, etc.)
- **`event_type.py`**: Event categories
- **`target_community.py`**: Target demographics
- **`sdg.py`**: Sustainable Development Goals
- **`tag.py`**: Content tags

**For Team Members**: When you need to add a new database table, create a new model file here. Each model automatically creates a database table.

#### CRUD Operations (`app/crud/`)

**Purpose**: Database operations layer (40+ CRUD files)

**What it does**: These files contain all the database operations (Create, Read, Update, Delete) for each model. They act as a bridge between your API endpoints and the database.

**Key CRUD Files Explained**:
- **`base_crud.py`**: Base CRUD operations that other files inherit from
- **`user_crud.py`**: User management operations (create user, find by email, etc.)
- **`profile_crud.py`**: Profile management operations
- **`opportunity_crud.py`**: Opportunity CRUD operations
- **`event_crud.py`**: Event management operations
- **`organisation_crud.py`**: Organization operations
- **`notification_crud.py`**: Notification operations

**Common CRUD Functions**:
- **`create()`**: Add new records to database
- **`get()`**: Retrieve single record by ID
- **`get_multi()`**: Get multiple records with pagination
- **`update()`**: Update existing records
- **`delete()`**: Remove records from database
- **`get_by_*()`**: Custom queries (e.g., get user by email)

**For Team Members**: When you need to add new database operations, add them to the relevant CRUD file. Always use these functions instead of writing raw SQL.

#### Schemas (`app/schemas/`)

**Purpose**: Pydantic schemas for request/response validation

**What it does**: These files define the structure and validation rules for API requests and responses. They ensure data integrity and provide automatic documentation.

**Schema Types Explained**:

**Request Schemas** (Input validation):
- **`user_create.py`**: Validation for user registration
- **`opportunity_create.py`**: Validation for creating opportunities
- **`event_create.py`**: Validation for creating events

**Response Schemas** (Output formatting):
- **`user_response.py`**: How user data is returned to clients
- **`opportunity_response.py`**: How opportunities are formatted in responses

**Update Schemas** (Partial updates):
- **`user_update.py`**: Fields that can be updated for users
- **`profile_update.py`**: Fields that can be updated for profiles

**Filter Schemas** (Query parameters):
- **`opportunity_filter.py`**: Search and filter options for opportunities
- **`event_filter.py`**: Filter options for events

**For Team Members**: When creating new API endpoints, create corresponding schemas for request/response validation. This provides automatic validation and API documentation.

### Database Management (`app/db/`)

**Purpose**: Database connection and initialization management

#### `session.py` - Database Session Configuration
**What it does**: Manages database connections and sessions
- **Connection Pooling**: Manages database connection pools
- **Session Management**: Creates and manages database sessions
- **Transaction Handling**: Manages database transactions
- **Connection Health**: Monitors database connection health

**For Team Members**: This file handles all database connections automatically. You don't need to modify it unless you're changing database settings.

#### `init_db.py` - Database Initialization
**What it does**: Sets up the database when the application starts
- **Table Creation**: Creates database tables from models
- **Initial Data**: Loads initial data (roles, industries, etc.)
- **Database Health Check**: Verifies database is accessible

**For Team Members**: Run this when setting up a new database or after major schema changes.

### Utilities (`app/utils/`)

**Purpose**: Reusable utility functions and middleware

**What it contains**:
- **Middleware**: Custom FastAPI middleware for logging, CORS, etc.
- **Helper Functions**: Common utilities used across the application
- **Data Transformers**: Convert data between different formats
- **External API Clients**: Wrappers for third-party services
- **File Processing**: Handle file uploads, image processing, etc.
- **Email Utilities**: Email sending and template processing
- **Date/Time Utilities**: Timezone handling, date formatting

**For Team Members**: Add common utility functions here that are used in multiple places. Keep functions small and focused.

### Communication System

#### Email Templates (`app/templates/`)

**Purpose**: HTML email templates for notifications (19+ template files)

**Template Files Explained**:
- **`welcome_email.html`**: New user welcome message
- **`verification_email.html`**: Email verification
- **`password_reset.html`**: Password reset instructions
- **`opportunity_recommendation.html`**: Weekly opportunity recommendations
- **`event_invitation.html`**: Event invitations
- **`partner_welcome.html`**: Partner onboarding
- **`newsletter.html`**: Newsletter templates

**For Team Members**: When creating new email templates, use Jinja2 syntax for dynamic content. Test templates with real data before deployment.

#### External Integrations (`app/plugins/`)

**Purpose**: Third-party service integrations

**Integration Files**:
- **`linkedin/`**: LinkedIn API integration for social features
- **`gmail/`**: Gmail API for email processing
- **`azure/`**: Azure services integration (AI, storage)
- **`mailgun/`**: Email delivery service
- **`openai/`**: AI service integration

**For Team Members**: Add new third-party integrations in this folder. Keep API keys and secrets in environment variables.

## Additional Project Directories

### Database Migrations (`alembic/`)

**Purpose**: Database schema version control and migrations

**What it contains**:
- **`versions/`**: Migration files that update database schema
- **`env.py`**: Alembic configuration for migrations
- **`script.py.mako`**: Template for new migration files

**For Team Members**: When you change database models, create a new migration file using `alembic revision --autogenerate -m "description"`. Always review migration files before applying them.

### Training Data (`data/`)

**Purpose**: AI training data and datasets

**What it contains**:
- **CSV Files**: Training data for ML models (opportunities, events)
- **JSON Files**: Structured data for AI training
- **Text Files**: Raw text data for natural language processing
- **SQL Files**: Database queries for data extraction

**For Team Members**: Add new training data here when improving AI models. Keep data files organized by type and date.

### Utility Scripts (`scripts/`)

**Purpose**: Standalone utility scripts for maintenance and data processing

**Key Scripts**:
- **`email.py`**: Email sending utilities
- **`industry.py`**: Industry data processing
- **`opportunity-upload.py`**: Bulk opportunity upload
- **`partner.py`**: Partner data management

**For Team Members**: Add new utility scripts here for one-time tasks, data migration, or maintenance operations.

### Test Suite (`test/`)

**Purpose**: Automated testing for the application

**Test Structure**:
- **`test_main.py`**: Main application tests
- **`api/`**: API endpoint tests
- **`test_*.py`**: Specific feature tests

**For Team Members**: Write tests for new features. Run tests before deploying changes.

### Project Configuration Files

**Purpose**: Project setup and dependency management

**Key Files Explained**:

**`pyproject.toml`**: 
- **Poetry Configuration**: Python dependency management
- **Project Metadata**: Name, version, description
- **Development Dependencies**: Testing, linting tools
- **Build Configuration**: How to package the application

**`requirements.txt`**: 
- **Python Dependencies**: All required Python packages
- **Version Pinning**: Specific versions for reproducible builds
- **Production Dependencies**: What's needed to run the app

**`Dockerfile`**: 
- **Container Definition**: How to build the application container
- **Multi-stage Build**: Optimized for production
- **Dependencies**: System packages and Python requirements

**`docker-compose.yml`**: 
- **Service Orchestration**: How to run the full application stack
- **Database Setup**: PostgreSQL and Redis containers
- **Environment Variables**: Container configuration

**`Makefile`**: 
- **Common Commands**: Shortcuts for frequent tasks
- **Development Workflow**: Setup, testing, deployment commands
- **Documentation**: Available commands and their purposes

**`README.md`**: 
- **Project Overview**: What the project does
- **Setup Instructions**: How to get started
- **API Documentation**: How to use the API
- **Development Guide**: How to contribute

**For Team Members**: 
- Use `poetry` for Python dependency management
- Use `make` commands for common development tasks
- Update `README.md` when adding new features
- Keep `requirements.txt` in sync with `pyproject.toml`

## Database Architecture

### Entity Relationships

The platform uses a sophisticated database schema with the following key relationships:

1. **User Management**
   - Users can have multiple roles
   - Users can belong to multiple groups
   - Separate Profile entity for external users

2. **Content Management**
   - Opportunities and Events are core business entities
   - Organizations provide content
   - Reference tables for categorization

3. **User Interactions**
   - Many-to-many relationships between profiles and opportunities/events
   - Status tracking for user engagements
   - AI-driven personalized recommendations

4. **Audit and Logging**
   - Comprehensive audit trails for all major entities
   - User activity logging
   - Change tracking and versioning

5. **Communication**
   - Multi-channel notification system
   - Email preferences and frequency control
   - In-platform chat functionality

6. **Content Scraping**
   - Automated content ingestion from external sources
   - Queue-based processing system
   - Quality control and validation

## Development Workflow

### Environment Setup

1. **Python Environment**: Python 3.11+ with Poetry dependency management
2. **Database**: PostgreSQL with Alembic migrations (configured in `config/database/`)
3. **Cache**: Redis for session management and caching
4. **Background Processing**: Celery with Redis broker
5. **Configuration**: Environment-specific configs organized in `config/` directory

### Code Quality

- **Linting**: Ruff for code formatting and style
- **Type Checking**: MyPy for static type analysis
- **Testing**: Pytest with async support
- **Pre-commit**: Automated code quality checks

### Deployment

- **Containerization**: Docker with multi-stage builds (configs in `config/docker/`)
- **Orchestration**: Docker Compose for local development
- **Deployment Scripts**: Organized in `config/deploy/` for different environments
- **Cloud Deployment**: Azure Container Apps integration
- **Monitoring**: Sentry for error tracking and performance monitoring

## Key Features

### 1. User Management
- Multi-role authentication system
- Profile management with detailed demographics
- Organization and partner management
- Email verification and password reset

### 2. Content Discovery
- Opportunity and event management
- AI-powered recommendation engine
- Advanced filtering and search
- Geographic and industry targeting

### 3. Communication
- Multi-channel notification system
- Email templates and preferences
- In-platform chat functionality
- Social media integration

### 4. Content Processing
- Automated web scraping
- AI-powered content analysis
- Quality control and validation
- Batch processing workflows

### 5. Analytics and Monitoring
- Comprehensive audit trails
- User activity tracking
- Performance monitoring
- Error tracking and reporting

## API Documentation

The platform provides comprehensive API documentation:
- **Swagger UI**: Interactive API documentation
- **ReDoc**: Alternative documentation format
- **OpenAPI Schema**: Machine-readable API specification

## Security Features

- JWT-based authentication
- Role-based access control
- Rate limiting and DDoS protection
- Input validation and sanitization
- Secure password hashing
- CORS configuration
- API key management

This architecture provides a robust, scalable foundation for connecting entrepreneurs with business opportunities while maintaining high security standards and excellent developer experience.

## Team Workflow Guide

### For New Team Members

**Getting Started**:
1. **Clone the repository** and read this documentation
2. **Set up environment**: Copy `.env.example` to `.env` and configure
3. **Install dependencies**: Run `poetry install` or `pip install -r requirements.txt`
4. **Set up database**: Run migrations with `alembic upgrade head`
5. **Start development**: Use `docker-compose -f docker-compose-dev.yml up`

### Development Workflow

**Adding New Features**:
1. **Create database model** in `app/models/`
2. **Create CRUD operations** in `app/crud/`
3. **Create schemas** in `app/schemas/`
4. **Create API endpoints** in `app/api/v1/`
5. **Write tests** in `test/`
6. **Create migration** with `alembic revision --autogenerate`

**Code Organization Rules**:
- **One model per file** in `app/models/`
- **One CRUD file per model** in `app/crud/`
- **Group related endpoints** in the same API file
- **Use descriptive names** for functions and variables
- **Add type hints** to all functions
- **Write docstrings** for complex functions

### File Naming Conventions

**Models**: `snake_case.py` (e.g., `user_model.py`, `opportunity_type.py`)
**API Routes**: `snake_case.py` (e.g., `opportunities.py`, `user_management.py`)
**Schemas**: `snake_case.py` (e.g., `user_create.py`, `opportunity_response.py`)
**CRUD**: `snake_case.py` (e.g., `user_crud.py`, `opportunity_crud.py`)
**Utilities**: `snake_case.py` (e.g., `email_utils.py`, `date_helpers.py`)

### Common Tasks

**Adding a New API Endpoint**:
1. Add route to appropriate file in `app/api/v1/`
2. Import required dependencies from `app/api/deps.py`
3. Use CRUD functions from `app/crud/`
4. Define request/response schemas in `app/schemas/`
5. Add tests in `test/api/`
6. Follow API versioning patterns and URL structure

**Creating a New API Version**:
1. Create new `v2/` directory in `app/api/`
2. Copy base structure from `v1/` directory
3. Update URL patterns to use `/api/v2/` prefix
4. Create new schemas for v2 if needed
5. Update API documentation and versioning
6. Implement backward compatibility for existing clients

**Adding a New Database Table**:
1. Create model in `app/models/`
2. Create CRUD operations in `app/crud/`
3. Create schemas in `app/schemas/`
4. Generate migration: `alembic revision --autogenerate -m "Add new table"`
5. Apply migration: `alembic upgrade head`

**Adding Background Tasks**:
1. Define task in `app/api/celery_task.py`
2. Configure task in `app/core/celery.py`
3. Call task from API endpoints using `task_name.delay()`
4. Monitor tasks in Celery dashboard

### Best Practices

**Code Quality**:
- Run `ruff check` before committing
- Run `mypy` for type checking
- Write tests for new features
- Use meaningful commit messages

**Security**:
- Never commit secrets to version control
- Use environment variables for sensitive data
- Validate all input data with schemas
- Use dependency injection for authentication

**Performance**:
- Use database indexes for frequently queried fields
- Implement caching for expensive operations
- Use pagination for large datasets
- Monitor database query performance

**Documentation**:
- Update this README when adding new features
- Add docstrings to complex functions
- Update API documentation (Swagger/ReDoc)
- Document environment variables in `.env.example`

This comprehensive guide ensures all team members understand the project structure and can contribute effectively to the RunWei API platform.

## Package Recommendations

### Core Framework & Web Server

**FastAPI & ASGI Server**:
- **`fastapi`**: Modern, fast web framework for building APIs with automatic documentation
- **`uvicorn`**: ASGI server for running FastAPI applications with hot reload
- **`gunicorn`**: Production WSGI server for deployment
- **`starlette`**: Lightweight ASGI framework (FastAPI dependency)

**Why these packages**: FastAPI provides automatic API documentation, type validation, and async support. Uvicorn enables development with hot reload, while Gunicorn handles production traffic.

### Database & ORM

**Database Operations**:
- **`sqlmodel`**: Modern ORM combining SQLAlchemy and Pydantic for type-safe database operations
- **`alembic`**: Database migration tool for schema version control
- **`psycopg`**: PostgreSQL adapter for Python with binary support
- **`asyncpg`**: High-performance async PostgreSQL driver
- **`SQLAlchemy`**: Core ORM library (SQLModel dependency)

**Why these packages**: SQLModel provides type safety and automatic validation. Alembic manages database schema changes safely. Async drivers enable high-performance async operations.

### Authentication & Security

**Security & Auth**:
- **`passlib`**: Password hashing library with bcrypt support
- **`python-jose`**: JWT token creation and validation
- **`bcrypt`**: Secure password hashing algorithm
- **`cryptography`**: Cryptographic recipes and primitives
- **`python-multipart`**: File upload handling for FastAPI
- **`python-dotenv`**: Environment variable management

**Why these packages**: Essential for secure user authentication, password protection, and secure file handling. JWT tokens enable stateless authentication.

### Background Tasks & Queue Management

**Async Task Processing**:
- **`celery`**: Distributed task queue for background processing
- **`redis`**: In-memory data store for caching and message broker
- **`celery-sqlalchemy-scheduler`**: Database-backed Celery scheduler
- **`celery-beat`**: Periodic task scheduler for Celery
- **`flower`**: Web-based monitoring tool for Celery

**Why these packages**: Celery handles long-running tasks (emails, scraping, AI processing) without blocking API responses. Redis provides fast caching and message queuing.

### Caching & Performance

**Performance Optimization**:
- **`fastapi-cache2`**: Redis-based caching for FastAPI
- **`fastapi-limiter`**: Rate limiting and throttling for API endpoints
- **`redis-py`**: Python Redis client library

**Why these packages**: Caching reduces database load and improves response times. Rate limiting prevents API abuse and ensures fair usage.

### AI & Machine Learning

**Artificial Intelligence**:
- **`openai`**: Official OpenAI API client for GPT models
- **`langchain`**: Framework for building LLM applications
- **`langchain-openai`**: OpenAI integration for LangChain
- **`transformers`**: Hugging Face transformers library
- **`scikit-learn`**: Machine learning library for recommendations
- **`numpy`**: Numerical computing library
- **`pandas`**: Data manipulation and analysis
- **`faiss-cpu`**: Facebook AI Similarity Search for vector operations

**Why these packages**: Essential for AI-powered recommendations, content analysis, and natural language processing features in the platform.

### Azure Cloud Integration

**Microsoft Azure Services**:
- **`azure-core`**: Core Azure SDK functionality
- **`azure-identity`**: Azure authentication and credential management
- **`azure-storage-blob`**: Azure Blob Storage for file management
- **`azure-ai-agents`**: Azure AI agents and assistants
- **`azure-ai-projects`**: Azure AI project management
- **`azure-keyvault-secrets`**: Secure secret management
- **`azure-monitor-opentelemetry`**: Application monitoring and telemetry

**Why these packages**: Provides cloud-native features, secure storage, AI services, and monitoring capabilities for production deployment.

### Email & Communication

**Email Services**:
- **`jinja2`**: Template engine for email templates
- **`emails`**: Email sending library
- **`email-validator`**: Email address validation
- **`celery-email`**: Async email sending with Celery
- **`mailgun`**: Mailgun email service integration

**Why these packages**: Enables reliable email delivery for notifications, user verification, and marketing communications.

### File Storage & Media Processing

**File Management**:
- **`minio`**: Object storage client (S3-compatible)
- **`pillow`**: Python Imaging Library for image processing
- **`python-magic`**: File type detection and validation
- **`aiofiles`**: Async file operations

**Why these packages**: Handles file uploads, image processing, and secure file storage for user-generated content.

### Web Scraping & Data Collection

**Data Extraction**:
- **`beautifulsoup4`**: HTML/XML parsing for web scraping
- **`playwright`**: Browser automation for dynamic content
- **`requests`**: HTTP library for API calls
- **`httpx`**: Async HTTP client
- **`scrapy`**: Advanced web scraping framework
- **`selenium`**: Web browser automation

**Why these packages**: Enables automated content collection from external sources for opportunities and events.

### Monitoring & Logging

**Observability**:
- **`sentry-sdk`**: Error tracking and performance monitoring
- **`structlog`**: Structured logging for better log analysis
- **`prometheus-client`**: Metrics collection for monitoring

**Why these packages**: Essential for production monitoring, error tracking, and performance analysis.

### Development & Testing

**Development Tools**:
- **`pytest`**: Testing framework
- **`pytest-asyncio`**: Async testing support
- **`pytest-cov`**: Test coverage reporting
- **`pytest-mock`**: Mocking utilities for tests
- **`factory-boy`**: Test data generation
- **`mypy`**: Static type checking
- **`ruff`**: Fast Python linter and formatter
- **`pre-commit`**: Git hooks for code quality
- **`coverage`**: Code coverage measurement

**Why these packages**: Ensures code quality, comprehensive testing, and consistent development practices.

### API Documentation & Validation

**API Features**:
- **`pydantic`**: Data validation and serialization
- **`pydantic-settings`**: Settings management with validation
- **`fastapi-pagination`**: Pagination utilities for API responses
- **`fastapi-sso`**: Single Sign-On integration

**Why these packages**: Provides automatic API documentation, data validation, and enhanced API features.

### Utility Libraries

**Helper Functions**:
- **`python-slugify`**: URL-friendly string conversion
- **`python-dateutil`**: Advanced date/time utilities
- **`pytz`**: Timezone handling
- **`tenacity`**: Retry logic for external API calls
- **`click`**: Command-line interface creation
- **`rich`**: Rich text and beautiful formatting
- **`typer`**: Modern CLI framework

**Why these packages**: Provides common utilities for data processing, CLI tools, and enhanced user experience.

This package selection provides a robust foundation for building, deploying, and maintaining the RunWei API platform with enterprise-grade features and development tools.
