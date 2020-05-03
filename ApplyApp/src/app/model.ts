export class Wedding {
    groomBrideName: string;
    brideGroomName: string;
    weddingDateTime: Date;
    mobiles: string[];
    email: string;
    events: WeddingEvent[];
}
export class WeddingEvent {
    title: string;
    from: Date;
    to: Date;
    address: string;
    locationUrl: string
}