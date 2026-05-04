// Type declarations for @m3e/web custom elements used in JSX

namespace JSX {
    interface IntrinsicElements {
        'm3e-app-bar': {
            style?: Partial<CSSStyleDeclaration>;
            slot?: string;
            class?: string;
            id?: string;
            key?: string | number;
            children?: unknown;
            size?: string;
            centered?: boolean;
            for?: string;
            [key: string]: unknown;
        };
        'm3e-button': {
            style?: Partial<CSSStyleDeclaration>;
            slot?: string;
            class?: string;
            id?: string;
            key?: string | number;
            children?: unknown;
            variant?: string;
            href?: string;
            target?: string;
            title?: string;
            disabled?: boolean;
            type?: string;
            size?: string;
            [key: string]: unknown;
        };
        'm3e-card': {
            style?: Partial<CSSStyleDeclaration>;
            slot?: string;
            class?: string;
            id?: string;
            key?: string | number;
            children?: unknown;
            variant?: string;
            actionable?: boolean;
            orientation?: string;
            [key: string]: unknown;
        };
        'm3e-loading-indicator': {
            style?: Partial<CSSStyleDeclaration>;
            slot?: string;
            class?: string;
            id?: string;
            key?: string | number;
            children?: unknown;
            variant?: string;
            [key: string]: unknown;
        };
        'm3e-theme': {
            style?: Partial<CSSStyleDeclaration>;
            slot?: string;
            class?: string;
            id?: string;
            key?: string | number;
            children?: unknown;
            color?: string;
            scheme?: string;
            motion?: string;
            variant?: string;
            contrast?: string;
            density?: number;
            [key: string]: unknown;
        };
    }
}
