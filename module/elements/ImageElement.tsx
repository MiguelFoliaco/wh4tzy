import React from 'react';
import type { Image } from '@/module/studio/type';

export interface ImageElementProps {
    args: Image;
}

export const ImageElement: React.FC<ImageElementProps> = ({ args }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
            src={args.src} 
            alt={args.alt || ''} 
            style={{
                width: `${args.width}px`,
                height: `${args.height}px`,
                borderRadius: args.borderRadius ? `${args.borderRadius}px` : undefined,
                objectFit: 'cover'
            }}
        />
    );
};
