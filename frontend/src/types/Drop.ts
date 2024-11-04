// Drpp Interface
export interface Drop {
  id: string;
  name?: string;
  profile: {
    id: string;
    handle: {
      localName: string;
    };
    profilePicture?: {
      raw: {
        uri: string;
      };
    };
  };
  description: string;
  apy: number;
  createdAt: string;
  tvl: number;
  investors?: {
    number: number;
  };
  topInvestors?: [
    {
      id?: string;
      //   handle?: {
      //     localName: string;
      //   };
      //   profilePicture?: {
      //     raw: {
      //       uri: string;
      //     };
      //   };
    }
  ];
}
