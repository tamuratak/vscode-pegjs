export type PegjsTable = {
    defs: Map<string, Location>;
    refs: Map<string, Location[]>;
}

export type Location = {
    start: {
        offset: number;
        line: number;
        column: number;
    };
    end: {
        offset: number;
        line: number;
        column: number;
    };
}

export declare class SyntaxError extends Error {
    message: string;
    expected: string | null;
    found: string | null;
    location: Location;
    name : 'SyntaxError';
}

export type ParserOptions = {
    startRule?: string;
    tracer?: Tracer;
    enableComment?: boolean;
}

export type TraceArg = {
    type: 'rule.enter' | 'rule.match' | 'rule.fail';
    rule: string;
    result: string | Node;
    location: Location;
}

export type Tracer = {
    trace: (e: TraceArg) => any;
}

export declare function parse(input: string, options?: ParserOptions): PegjsTable;
