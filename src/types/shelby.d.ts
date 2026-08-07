declare module '@shelby-protocol/sdk/browser' {
  export class ShelbyClient {
    constructor(config?: { apiKey?: string; network?: string });
    uploadAndCommit(params: {
      payload: any;
      lockUntilTimestamp?: number;
      metadata?: any;
    }): Promise<{ id: string }>;
  }
}

declare module '@shelby-protocol/sdk' {
  export class ShelbyClient {
    constructor(config?: { apiKey?: string; network?: string });
    uploadAndCommit(params: {
      payload: any;
      lockUntilTimestamp?: number;
      metadata?: any;
    }): Promise<{ id: string }>;
  }
}
