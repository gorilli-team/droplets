import { Drop } from "../types/Drop";

export const mockedDrops: Drop[] = [
  {
    id: "1",
    name: "Guru NFT Fund",
    profile: {
      id: "guru",
      handle: {
        localName: "guru",
      },
      profilePicture: {
        raw: {
          uri: "/img/profilePictures/guru.jpg",
        },
      },
    },
    description: "Trading NFTs on the blockchain. Get in early!",
    createdAt: "2024-08-29",
    tvl: 1500000,
    apy: 12.5,
    investors: {
      number: 33,
      // topInvestors: [
      //   {
      //     id: "investor1",
      //     handle: {
      //       localName: "InvestorA",
      //     },
      //     profilePicture: {
      //       raw: {
      //         uri: "https://example.com/avatar1.jpg",
      //       },
      //     },
      //   },
      // {
      //   id: 'investor2',
      //   handle: {
      //     localName: 'InvestorB',
      //   },
      //   profilePicture: {
      //     raw: {
      //       uri: 'https://example.com/avatar2.jpg',
      //     },
      //   },
      // },
      //],
    },
  },
  {
    id: "2",
    name: "Luduvigo Evil",
    profile: {
      id: "luduvigo",
      handle: {
        localName: "luduvigo",
      },
      profilePicture: {
        raw: {
          uri: "/img/profilePictures/luduvigoevil.png",
        },
      },
    },
    apy: 8.75,
    description: "Value investing in the DeFi space.",
    createdAt: "2024-08-28",
    tvl: 4543343,
    investors: {
      number: 760,
      //     topInvestors: [
      //       {
      //         id: 'investor3',
      //         handle: {
      //           localName: 'InvestorC',
      //         },
      //         profilePicture: {
      //           raw: {
      //             uri: 'https://example.com/avatar3.jpg',
      //           },
      //         },
      //       },
      //       {
      //         id: 'investor4',
      //         handle: {
      //           localName: 'InvestorD',
      //         },
      //         profilePicture: {
      //           raw: {
      //             uri: 'https://example.com/avatar4.jpg',
      //           },
      //         },
      //       },
      //     ],
    },
  },
  {
    id: "3",
    name: "TraderX Ventures",
    profile: {
      id: "3",
      handle: {
        localName: "damarnezd",
      },
      profilePicture: {
        raw: {
          uri: "/img/profilePictures/damarnez.webp",
        },
      },
    },
    apy: 15.25,
    description: "A DeFi hedge fund with a focus on yield farming.",
    createdAt: "2024-08-27",
    tvl: 5030,
    investors: {
      number: 7,
      //     topInvestors: [
      //       {
      //         id: 'investor5',
      //         handle: {
      //           localName: 'InvestorE',
      //         },
      //         profilePicture: {
      //           raw: {
      //             uri: 'https://example.com/avatar5.jpg',
      //           },
      //         },
      //       },
      //       {
      //         id: 'investor6',
      //         handle: {
      //           localName: 'InvestorF',
      //         },
      //         profilePicture: {
      //           raw: {
      //             uri: 'https://example.com/avatar6.jpg',
      //           },
      //         },
      //       },
      //   },
    },
  },
  {
    id: "4",
    name: "Yolo Fund",
    profile: {
      id: "wagmi",
      handle: {
        localName: "wagmi",
      },
      profilePicture: {
        raw: {
          uri: "/img/profilePictures/wagmi.png",
        },
      },
    },
    apy: 10.0,
    description: "An NFT platform gaining traction.",
    createdAt: "2024-08-27",
    tvl: 342421,
    investors: {
      number: 4,
    },
    topInvestors: [
      {
        id: "investor7",
        // handle: {
        //   localName: "InvestorG",
        // },
        // profilePicture: {
        //   raw: {
        //     uri: "https://example.com/avatar7.jpg",
        //   },
        // },
      },
      // {
      //   id: "investor8",
      //   handle: {
      //     localName: "InvestorH",
      //   },
      //   profilePicture: {
      //     raw: {
      //       uri: "https://example.com/avatar8.jpg",
      //     },
      //   },
      // },
    ],
  },
  {
    id: "5",
    name: "Guru DAO",
    profile: {
      id: "guru",
      handle: {
        localName: "guru",
      },
      profilePicture: {
        raw: {
          uri: "/img/profilePictures/guru.jpg",
        },
      },
    },
    apy: 7.5,
    description: "A DAO focused on community building.",
    createdAt: "2024-08-26",
    tvl: 1000000,
    investors: {
      number: 17,
      //     topInvestors: [
      //       {
      //         id: 'investor9',
      //         handle: {
      //           localName: 'InvestorI',
      //         },
      //         profilePicture: {
      //           raw: {
      //             uri: 'https://example.com/avatar9.jpg',
      //           },
      //         },
      //       },
      //       {
      //         id: 'investor10',
      //         handle: {
      //           localName: 'InvestorJ',
      //         },
      //         profilePicture: {
      //           raw: {
      //             uri: 'https://example.com/avatar10.jpg',
      //           },
      //         },
      //       },
      //     ],
    },
  },
];
