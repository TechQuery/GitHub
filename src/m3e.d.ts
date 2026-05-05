// Import @m3e/web component types via their declaration files.
// Each import augments the global HTMLElementTagNameMap, which dom-renderer
// uses to automatically populate JSX.IntrinsicElements.
//
// Note: Direct dist paths are required because tsconfig uses "moduleResolution": "node"
// which does not resolve package.json "exports" subpath mappings.
// Using e.g. `import type {} from '@m3e/web/app-bar'` would not resolve here.
import type {} from '@m3e/web/dist/src/app-bar/AppBarElement';
import type {} from '@m3e/web/dist/src/button/ButtonElement';
import type {} from '@m3e/web/dist/src/card/CardElement';
import type {} from '@m3e/web/dist/src/loading-indicator/LoadingIndicatorElement';
import type {} from '@m3e/web/dist/src/theme/ThemeElement';
