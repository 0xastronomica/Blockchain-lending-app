# Lending Protocol

## Overview
This project is a decentralized lending protocol that allows users to lend and borrow assets in a secure and efficient manner. It includes features for leveraging positions, enabling users to borrow against their collateral to increase their exposure.

## Features
- **Lending Pool**: Users can deposit assets into the lending pool and earn interest.
- **Leverage Management**: Users can borrow against their collateral to increase their investment exposure.
- **Interest Rate Model**: Dynamic interest rates based on supply and demand.
- **Mock ERC20 Token**: A mock implementation of the ERC20 standard for testing purposes.

## Project Structure
```
lending-protocol
├── contracts
│   ├── LendingPool.sol
│   ├── LeverageManager.sol
│   ├── InterestRateModel.sol
│   ├── ERC20Mock.sol
│   └── interfaces
│       ├── ILendingPool.sol
│       └── ILeverageManager.sol
├── packages
│   ├── sdk
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── backend
│   │   ├── src
│   │   │   ├── server.ts
│   │   │   ├── routes
│   │   │   │   └── api.ts
│   │   │   └── services
│   │   │       └── protocolService.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend
│       ├── src
│       │   ├── App.tsx
│       │   ├── pages
│       │   │   └── Dashboard.tsx
│       │   └── components
│       │       └── LeverageWidget.tsx
│       ├── package.json
│       └── tsconfig.json
├── scripts
│   ├── deploy.ts
│   └── helpers.ts
├── test
│   ├── lendingPool.test.ts
│   └── leverage.test.ts
├── hardhat.config.ts
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- TypeScript
- Hardhat
- Ethereum wallet (e.g., MetaMask)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd lending-protocol
   ```

2. Install dependencies for each package:
   ```
   cd packages/sdk && npm install
   cd ../backend && npm install
   cd ../frontend && npm install
   ```

### Running the Application
- Start the backend server:
  ```
  cd packages/backend
  npm run start
  ```

- Start the frontend application:
  ```
  cd packages/frontend
  npm run start
  ```

### Testing
To run the tests for the smart contracts:
```
npx hardhat test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License. See the LICENSE file for details.