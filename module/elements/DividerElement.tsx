import React from 'react';
import type { Divider } from '@/module/studio/type';

export interface DividerElementProps {
    args: Divider;
}

export const DividerElement: React.FC<DividerElementProps> = ({ args }) => {
    return (
        <div style={{
            width: args.width ? `${args.width}px` : '100%',
            height: args.height ? `${args.height}px` : '1px',
            backgroundColor: args.color || 'var(--fallback-bc, oklch(var(--bc) / 0.2))',
            borderRadius: '9999px'
        }} />
    );
};
