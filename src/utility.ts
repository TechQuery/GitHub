import { parseURLData } from 'web-utility';

export const { renderMode = 'sync' } = parseURLData() as {
    renderMode?: 'sync';
};