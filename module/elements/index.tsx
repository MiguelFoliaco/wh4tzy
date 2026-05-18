export * from './TextElement';
export * from './ImageElement';
export * from './TableElement';
export * from './ChartElement';
export * from './DividerElement';

// Helper component that renders the right element based on type
import React from 'react';
import type { Element, Text, Image, Table, Chart, Divider } from '@/module/studio/type';
import { TextElement } from './TextElement';
import { ImageElement } from './ImageElement';
import { TableElement } from './TableElement';
import { ChartElement } from './ChartElement';
import { DividerElement } from './DividerElement';

export interface DynamicElementProps {
    element: Element;
}

export const DynamicElement: React.FC<DynamicElementProps> = ({ element }) => {
    switch (element.type) {
        case 'text':
            return <TextElement args={element.args as Text} />;
        case 'image':
            return <ImageElement args={element.args as Image} />;
        case 'table':
            return <TableElement args={element.args as Table} />;
        case 'chart':
            return <ChartElement args={element.args as Chart} />;
        case 'divider':
            return <DividerElement args={element.args as Divider} />;
        default:
            return null;
    }
};
