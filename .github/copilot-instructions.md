# GitHub 中文版 (Chinese GitHub Client)

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

This is a Chinese-language GitHub client web application built as a Single Page Application (SPA) using HTML5, CSS3, jQuery, Bootstrap v3, and the EasyWebApp framework. The application provides a localized interface for browsing GitHub repositories, users, organizations, and gists.

## Working Effectively

### Quick Start
- **NEVER build or compile anything** - this is a static web application that runs directly in the browser
- Start HTTP server: `npx http-server -p 8080` (requires npm, starts in ~5-10 seconds, NEVER CANCEL)
- Alternative: `python3 -m http.server 8080` (starts in ~1-2 seconds, NEVER CANCEL)
- Access application: `http://localhost:8080`
- **CRITICAL**: External CDN dependencies may be blocked in some environments - document this limitation

### Dependencies and Limitations
- **External CDNs Required**: The application currently depends on external CDNs (cdn.bootcss.com, will migrate to unpkg.com) for:
  - jQuery 3.3.1
  - Bootstrap 3.3.7
  - RequireJS 2.3.5 (will migrate to ECMAScript modules)
  - Marked (markdown parser)
  - Layer.js (UI dialogs)
  - HTML5 History API polyfill
  - MutationObserver polyfill
- **GitHub API Token**: Hardcoded token in `script/index.js` may be expired (will migrate to OAuth token system)
- **Network Access**: CDN blocking will prevent full functionality in restricted environments

### Validation Requirements
- **ALWAYS** test HTTP server startup with both Python and Node.js options
- **ALWAYS** verify static file serving for HTML, CSS, JS, JSON files
- Test navigation structure by accessing key routes:
  - Main page: `/`
  - Configuration: `/page/index.json`
  - Components: `/component/NavBar.html`
- **IMPORTANT**: Due to CDN dependencies, full functionality testing requires network access
- Document any CDN accessibility issues encountered

## Project Structure

### Key Directories and Files
```
/home/runner/work/GitHub/GitHub/
├── index.html              # Main application entry point
├── ReadMe.md              # Project documentation (Chinese)
├── .editorconfig          # Code formatting rules
├── .gitignore             # Git ignore rules
├── script/                # JavaScript modules
│   ├── index.js           # Main application logic & GitHub API integration
│   ├── EasyWebApp.js      # Web component framework
│   ├── jQueryKit.js       # jQuery utilities
│   ├── FixData.js         # GitHub API data transformation
│   └── TimeKit.js         # Time formatting utilities
├── component/             # Reusable UI components
│   ├── NavBar.html        # Main navigation bar
│   ├── PageList.html      # Paginated list component
│   ├── Tab.html           # Tab navigation component
│   └── loading.html       # Loading indicator
├── page/                  # SPA page templates
│   ├── index.json         # Navigation configuration
│   ├── Event.html         # GitHub events feed
│   ├── Repository/        # Repository-related pages
│   ├── User/             # User and organization pages
│   └── Gist/             # Gist pages
├── style/                 # CSS stylesheets
│   ├── BootEWA.css       # Bootstrap + EasyWebApp styles
│   └── index.css         # Application-specific styles
└── image/                 # Static assets
```

### Architecture Overview
- **Module System**: AMD modules loaded with RequireJS (will migrate to ECMAScript modules)
- **Framework**: EasyWebApp v4 for component-based development
- **UI Library**: Bootstrap v3 for responsive design
- **API Integration**: Direct GitHub REST API calls with OAuth token (will migrate to OAuth system)
- **Routing**: Client-side routing using EasyWebApp
- **Localization**: Chinese language interface throughout

## Validation Scenarios

After making changes, ALWAYS run through these validation steps:

### HTTP Server Testing
```bash
# Test Node.js HTTP server (recommended for JavaScript project)
cd /home/runner/work/GitHub/GitHub
npx http-server -p 8080 &
sleep 5
curl -I http://localhost:8080/
# Should return HTTP/1.1 200 OK

# Test Python alternative (fallback)
pkill -f "npx.*http-server" 
python3 -m http.server 8080 &
sleep 2
curl -I http://localhost:8080/
# Should return HTTP/1.0 200 OK
```

### File Serving Validation
```bash
# Test key file types are served correctly
curl -s http://localhost:8080/page/index.json | jq .title
# Should return "GitHub 中文版"

curl -I http://localhost:8080/component/NavBar.html
# Should return 200 OK with text/html content-type

curl -I http://localhost:8080/script/index.js  
# Should return 200 OK with application/javascript content-type
```

### Application Structure Verification
```bash
# Verify all required directories exist
ls -la /home/runner/work/GitHub/GitHub/{script,component,page,style,image}

# Count HTML templates (should be ~19 files)
find /home/runner/work/GitHub/GitHub -name "*.html" | wc -l

# Verify JavaScript modules exist
ls /home/runner/work/GitHub/GitHub/script/*.js
```

## Common Tasks

### Server Operations
- Start Node.js server: `npx http-server -p 8080` (recommended for JavaScript project)
- Start Python server: `python3 -m http.server 8080` (alternative option)
- Stop servers: `pkill -f "npx.*http-server"` or `pkill -f "python3.*http.server"`
- Check server status: `curl -I http://localhost:8080/`

### Code Navigation
- **Main logic**: `script/index.js` - GitHub API integration, routing, error handling
- **Framework**: `script/EasyWebApp.js` - Component system implementation  
- **Navigation**: `page/index.json` - Menu structure and routing configuration
- **Components**: `component/*.html` - Reusable UI components
- **Pages**: `page/*/` - Individual SPA page templates
- **Styling**: `style/BootEWA.css` and `style/index.css`

### Troubleshooting
- **CDN Loading Issues**: External dependencies from cdn.bootcss.com may be blocked (will migrate to unpkg.com)
- **GitHub API Access**: Token in script/index.js may be expired (will migrate to OAuth token system)
- **CORS Errors**: Use proper HTTP server, not file:// protocol
- **Module Loading**: RequireJS errors indicate missing or blocked CDN dependencies (will migrate to ECMAScript modules)

## Important Notes

### Security Considerations
- **Exposed API Token**: GitHub personal access token is hardcoded in `script/index.js` (will migrate to OAuth system)
- **CORS Configuration**: Application expects to run from HTTP server, not file system
- **CDN Dependencies**: External resource loading creates security and availability dependencies (will migrate to unpkg.com)

### Development Workflow
1. **ALWAYS** start HTTP server before testing changes
2. **NEVER** try to build or compile - this is a static application
3. **VERIFY** that static files serve correctly after modifications
4. **TEST** navigation and component loading when changing templates
5. **DOCUMENT** any CDN access issues encountered in your environment

### Performance Expectations
- Server startup: 1-10 seconds depending on method used
- File serving: Near-instantaneous for static assets
- Component loading: Dependent on CDN accessibility and network speed
- **NEVER CANCEL** server operations during startup phase

## Frequent Commands Reference

### Repository root listing
```
.editorconfig
.git/
.gitignore  
ReadMe.md
component/
image/
index.html
page/
script/
style/
```

### Required HTTP server test
```bash
cd /home/runner/work/GitHub/GitHub && npx http-server -p 8080
```
Expected output: Server starts and serves files on port 8080