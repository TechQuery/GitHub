# GitHub 中文版 (Chinese GitHub Client)

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

This is a Chinese-language GitHub client web application built as a modern Single Page Application (SPA) using TypeScript, WebCell v3, Bootstrap 5, and BeerCSS. The application provides a localized interface for browsing GitHub repositories, users, organizations, and gists with a modern, type-safe architecture.

## Working Effectively

### Quick Start
- **Build required** - this is a modern TypeScript application that needs compilation
- **Package Manager**: Prioritize PNPM but NPM commands are compatible (replace `pnpm` with `npm run` for NPM)
- Install dependencies: `pnpm install` (requires Node.js, takes ~1-2 minutes)
- Start development server: `pnpm dev` (starts Parcel dev server in ~5-10 seconds, NEVER CANCEL)
- Access application: `http://localhost:1234` (Parcel default port)
- **Build for production**: `pnpm build` (creates optimized bundle with PWA support)

### Dependencies and Limitations
- **Modern Dependencies**: All dependencies are managed through pnpm/package.json (npm compatible):
  - WebCell v3 (modern web components with Stage-3 decorators)
  - TypeScript for type safety
  - MobX + MobX-RESTful for state management
  - cell-router for client-side routing
  - Bootstrap 5 + BeerCSS for UI components
  - Parcel 2 for zero-config building
  - ESLint 9 + TypeScript ESLint for code quality
- **GitHub API Integration**: Uses `mobx-github` package with modern API patterns (will migrate to OAuth token system)
- **Network Access**: GitHub API access requires internet connectivity

### Validation Requirements
- **ALWAYS** test development server startup with Node.js
- **ALWAYS** verify TypeScript compilation and linting: `pnpm test`
- **ALWAYS** test development build: `pnpm dev`
- Test navigation structure by accessing key routes:
  - Main page: `http://localhost:1234/`
  - User pages: `http://localhost:1234/#users/{username}`
  - Repository pages: `http://localhost:1234/#repos/{owner}/{repo}`
  - Issue pages: `http://localhost:1234/#repos/{owner}/{repo}/issues/{number}`
- **IMPORTANT**: Development requires Node.js and PNPM (or npm) for building
- Test production build occasionally: `pnpm build`

## Project Structure

### Key Directories and Files
```
/home/runner/work/GitHub/GitHub/
├── src/                     # TypeScript source code
│   ├── index.html           # Main HTML template
│   ├── index.tsx           # Application entry point
│   ├── App.tsx             # Main application component
│   ├── global.d.ts         # TypeScript global declarations
│   ├── utility.ts          # Utility functions
│   ├── components/         # Reusable UI components
│   │   ├── NavBar.tsx      # Main navigation bar
│   │   └── Loading.tsx     # Loading indicator
│   ├── page/               # Page components
│   │   ├── Home.tsx        # Home page
│   │   ├── Users.tsx       # Users listing
│   │   ├── User.tsx        # User profile
│   │   ├── Repos.tsx       # Repositories listing
│   │   ├── Repo.tsx        # Repository details
│   │   ├── Issue.tsx       # Issue details
│   │   ├── Milestone.tsx   # Milestone details
│   │   ├── Events.tsx      # Events feed
│   │   ├── Gists.tsx       # Gists listing
│   │   └── Gist.tsx        # Gist details
│   ├── stores/             # MobX state management
│   │   └── github.ts       # GitHub API store
│   └── image/              # Static assets
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── eslint.config.ts        # ESLint configuration
├── .parcelrc               # Parcel configuration
├── workbox-config.js       # PWA service worker configuration
├── pnpm-lock.yaml          # Package lock file (preferred: pnpm)
├── .editorconfig           # Code formatting rules
└── .gitignore              # Git ignore rules
```

### Architecture Overview
- **Programming Language**: TypeScript for full type safety
- **Web Framework**: WebCell v3 with Stage-3 decorators for modern web components
- **State Management**: MobX + MobX-RESTful for reactive state and API integration
- **Routing**: cell-router for client-side navigation
- **Build System**: Parcel 2 for zero-configuration bundling and development
- **Package Manager**: PNPM (preferred) or npm for dependency management
- **UI Framework**: Bootstrap 5 (utility classes) + BeerCSS (components) for responsive design
- **Code Quality**: ESLint 9 + TypeScript ESLint for linting and style enforcement
- **API Integration**: `mobx-github` package for GitHub REST API v3 (will migrate to OAuth token system)
- **PWA Support**: Complete Progressive Web App experience with service worker
- **Localization**: Chinese language interface throughout

## Validation Scenarios

After making changes, ALWAYS run through these validation steps:

### Development Server Testing
```bash
# Start development server (JavaScript project)
cd /home/runner/work/GitHub/GitHub
pnpm dev
# Should start Parcel dev server on http://localhost:1234
# Wait for "Built in Xs" message before testing
```

### Code Quality Validation
```bash
# Test TypeScript compilation and ESLint
pnpm test
# Should pass without errors

# Check specific linting
npx eslint src --ext .ts,.tsx
# Should show no errors

# Check TypeScript compilation
npx tsc --noEmit
# Should compile successfully
```

### Application Structure Verification
```bash
# Verify all required directories exist
ls -la /home/runner/work/GitHub/GitHub/{src,package.json,tsconfig.json}

# Count TypeScript files
find /home/runner/work/GitHub/GitHub/src -name "*.tsx" -o -name "*.ts" | wc -l

# Verify main source files exist
ls /home/runner/work/GitHub/GitHub/src/{index.tsx,App.tsx,stores,page,components}
```

## Common Tasks

### Development Operations
- Install dependencies: `pnpm install` (JavaScript project)
- Start development server: `pnpm dev` (starts Parcel on port 1234)
- Build for production: `pnpm build` (creates optimized dist/ folder with PWA)
- Run linting and type checking: `pnpm test`
- Clean build cache: `pnpm clean`

### Code Navigation
- **Application entry**: `src/index.tsx` - Main application bootstrap
- **Main component**: `src/App.tsx` - Router configuration and main layout
- **State management**: `src/stores/github.ts` - MobX stores for GitHub API data
- **Components**: `src/components/*.tsx` - Reusable UI components (NavBar, Loading)
- **Pages**: `src/page/*.tsx` - Individual page components for different routes
- **Global types**: `src/global.d.ts` - TypeScript type definitions
- **Utilities**: `src/utility.ts` - Helper functions

### Troubleshooting
- **Build Errors**: Check TypeScript compilation with `npx tsc --noEmit`
- **Linting Issues**: Run `npx eslint src --ext .ts,.tsx --fix` to auto-fix
- **Dependency Issues**: Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- **GitHub API Access**: API integration through `mobx-github` package (will migrate to OAuth token system)
- **Development Server**: Use `pnpm dev`, not static file serving

## Important Notes

### Security Considerations
- **API Authentication**: GitHub API integration through `mobx-github` package (will migrate to OAuth token system)
- **Type Safety**: Full TypeScript coverage prevents many runtime errors
- **Dependency Management**: All dependencies managed through pnpm/package.json, no external CDNs

### Development Workflow
1. **ALWAYS** install dependencies with `pnpm install` before starting development
2. **ALWAYS** run `pnpm test` to check linting and TypeScript compilation
3. **ALWAYS** use `pnpm dev` for development server (not static file serving)
4. **VERIFY** TypeScript compilation passes before committing changes
5. **TEST** in development server to ensure proper routing and API integration

### Performance Expectations
- Development server startup: 5-10 seconds with Parcel
- TypeScript compilation: 1-5 seconds for incremental builds
- Hot module replacement: Near-instantaneous during development
- Production build: 1-2 minutes for full optimization
- **NEVER CANCEL** build operations during bundling phase

## Frequent Commands Reference

### Repository root listing
```
.editorconfig
.git/
.github/
.gitignore
.parcelrc
ReadMe.md
eslint.config.ts
package.json
pnpm-lock.yaml
src/
tsconfig.json
workbox-config.js
```

### Required development server test
```bash
cd /home/runner/work/GitHub/GitHub && pnpm dev
```
Expected output: Parcel dev server starts on http://localhost:1234 with TypeScript compilation