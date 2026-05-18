import React from 'react';
import type { Text } from '@/module/studio/type';

export interface TextElementProps {
    args: Text;
}

export const TextElement: React.FC<TextElementProps> = ({ args }) => {
    return (
        <div style={{
            textAlign: args.textAlign,
            fontSize: `${args.fontSize}px`,
            fontWeight: args.fontWeight,
            fontStyle: args.fontStyle,
            color: args.color,
            fontFamily: args.fontFamily,
        }}>
            {args.content}
        </div>
    );
};
