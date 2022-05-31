declare function MakeRequest(s: string): string;

export class HttpHandler {
    constructor() {}

    static MakeRequest(s: string): string {
        return MakeRequest(s);
    }
}