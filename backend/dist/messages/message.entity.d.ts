export declare class Message {
    id: number;
    clientId: number;
    talentId: number;
    sender: 'client' | 'talent';
    text: string;
    timestamp: Date;
}
