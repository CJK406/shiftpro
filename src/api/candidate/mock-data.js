

//========== Fake data to use until the api enpoints are ready



export const formerCompaniesList = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]


export const networkList = [
  {
    id: 1,
    parent: 'Costa',
    subsidiary: 'Costa Intu Watford',
    name: 'Lindsay Walton',
    imageUrl: require('@/assets/brands/costa.png'),
    distance: '1 mi away'
  },
  {
    id: 2,
    parent: 'Courtney Henry',
    subsidiary: 'Costa Intu Watford',
    name: 'Dries Vincent',
    imageUrl: require('@/assets/brands/subway.png'),
    distance: '0.4 mi away'
  },
  {
    id: 3,
    parent: 'Floyd',
    subsidiary: 'Nandos Watford',
    name: 'courtne Henry',
    imageUrl: require('@/assets/brands/greggs.png'),
   distance: '1.2 mi away'
 },
  {
    id: 4,
    parent: 'Costa',
    subsidiary: 'Costa Intu Watford',
    name: 'Kristin Watson',
    imageUrl: require('@/assets/brands/starbucks.png'),
   distance: '0.7 mi away'
 }
]


export const paymentHistory = [
  { 
    id: "#121212",
    position: "Grill chef",
    shiftInterval: "11 June 2021 10AM - 8PM",
    paidBy: "Nando's Harrow",
    date: "21 July 2021",
    amount: 80
  },
  { 
    id: "#123456",
    position: "Waiter/Waitress",
    shiftInterval: "16 June 2021 10AM - 8PM",
    paidBy: "The Fishery Rou Ruislip",
    date: "21 July 2021",
    amount: 120 
  }
]

export const perksList = [
  {
    id: 1,
    companyName: 'Costa',
    imgURL: require('@/assets/brands/costa.png'),
    discount: "5% off",
    additionalInfo: "every Monday, on any order"
  },
  {
    id: 2,
    companyName: 'Starbucks',
    imgURL: require('@/assets/brands/starbucks.png'),
    discount: "£15 off",
    additionalInfo: "every Monday, on any order"
  },
  {
    id: 3,
    companyName: 'Nando',
    imgURL: require('@/assets/brands/nando.png'),
    discount: "£10 off",
    additionalInfo: "Monday - Friday, minimum order £20"
  },
  {
    id: 4,
    companyName: 'Green King',
    imgURL: require('@/assets/brands/green-king.png'),
    discount: "6% off",
    additionalInfo: "every Monday, on any order"
  },
  {
    id: 5,
    companyName: 'Greggs',
    imgURL: require('@/assets/brands/greggs.png'),
    discount: "£5 off",
    additionalInfo: "every Monday, on any order"
  },
  {
    id: 6,
    companyName: 'Subway',
    imgURL: require('@/assets/brands/subway.png'),
    discount: "7% off",
    additionalInfo: "every Monday"
  }
  
]



export const networkMessagesData = [
  {
    id: 1,
    imageURL: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=356&q=80',
    from: 'Floyd Miless',
    message: 'Hi there, I waaas wondering if you could bring a black t-shirt tomorrow because we...',
    timeElapsed: '3h'
  },

  {
    id: 2,
    imageURL: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=60',
    from: 'Ben Edmo',
    message: 'Hi there, I wdddas wondering if you could bring a black t-shirt tomorrow because we...',
    timeElapsed: '3h'
  },
]

export const networkSentMessagesData = [
  {
    id: 1,
    imageURL: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=356&q=80',
    from: 'Floyd Milessssss',
    message: 'Hi there, I waaas wondering if you could bring a black t-shirt tomorrow because we...',
    timeElapsed: '3h'
  },

  {
    id: 2,
    imageURL: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=60',
    from: 'Ben Edmo',
    message: 'Hi there, I wdddas wondering if you could bring a black t-shirt tomorrow because we...',
    timeElapsed: '3h'
  },
]


export const messageThread = [
  {
    id: 1,
    userId: 2,
    from: 'Lindsay Walton',
    imageURL:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    altImage: 'Alt for the iage',
    timeElapsed: '1h',
    message: 'Hi did you bring you uniform ?'
  },
  {
    id: 2,
    userId: 2,
    from: 'Lindsay Walton',
    imageURL:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    altImage: 'Alt attribute',
    timeElapsed: '10m',
    message: 'Lorem ipsum dolores anctum'
  },
  {
    id: 3,
    userId: 2,
    from: 'Lindsay Walton',
    imageURL:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    altImage: 'Alt for the iage',
    timeElapsed: '1h',
    message: 'Hi did you bring you uniform ?'
    
  },
  {
    id: 42,
    userId: 1,
    from: 'Lindsay Walton',
    imageURL:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    altImage: 'Alt attribute',
    timeElapsed: '10m',
    message: 'Lorem ipsum dolores anctum'
  },
  // More messages...
]

export const userReliabilityStats = [
  {
    id: 1,
    userId: 1,
    imgURL: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=60",
    htmlAlt: "Alt for the image",
    stars: 3,
    reliability: {
      for: "Floyd Hames",
      percentage: 50
    },
    shifts: {
      successful: 73,
      failed: 21
    }
  },
  {
    id: 2,
    userId: 2,
    imgURL: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=60",
    htmlAlt: "Alt for the image",
    stars: 5,
    reliability: {
      for: "Ben Edmo",
      percentage: 95
    },
    shifts: {
      successful: 21,
      failed: 21
    }
  }

]