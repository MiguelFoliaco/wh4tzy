export interface Report {
    title: string;
    id: string;
    sheets: Sheet[]
    readOnly: boolean;
    version?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    dataSourcesId: { name: string, id: string, url?: string }[];
    width: number;
    height: number;
}

export interface Sheet {
    name: string;
    id: string;
    elements: Element[];
    pageStr: string;
}

export type ElementMap = 'text' | 'image' | 'table' | 'chart' | 'divider';

export interface Element {
    type: ElementMap;
    id: string;
    coordinates?: {
        x: number;
        y: number;
    };
    size?: {
        width: number;
        height: number;
    };
    args: Elements;
}

export type Elements =
    | Text
    | Image
    | Table
    | Chart
    | Divider

export type Text = {
    content: string;
    textAlign: 'left' | 'center' | 'right';
    fontSize: number;
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
    color: string;
    fontFamily: string;
}

export type Image = {
    src: string;
    alt?: string;
    borderRadius?: number;
    width: number;
    height: number;
}

export type Table = {
    columns: string[];
    headers: string[];
    data: string[][];
}

export type Chart = {
    data: { [key: string]: number };
    type: 'bar' | 'line' | 'pie';
}

export type Divider = {
    width?: number;
    height?: number;
    color?: string;
}
