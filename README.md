# Project Description: Web3 Authorization Integration in RatersApp
**Raters Frontend Example** integrates Web3 authorization using Next.js and TypeScript.

For the RatersApp project, Web3 authorization was integrated using various libraries and tools. The primary framework for the application is Next.js, and the project is written in TypeScript. Below are the details of the libraries and their purposes in this integration:


## NFID Integration
- **Library:** `@nfid/embed`
- **Purpose:** This library connects NFID, facilitating authorization and obtaining the principal, public/private keys, and wallet address.

## Internet Identity Integration
- **Authorization Library:** `@dfinity/identity`
- **Community Hook Library:** `@ic-use-internet-identity`
- **Purpose:** This custom community library integrates a hook for handling authorization within React applications.

## Wallet Address Retrieval
- **Library:** `@dfinity/ledger`
- **Method Used:** `fromPrincipal`
- **Purpose:** This method retrieves the wallet address for both NFID and ICP methods.

## Detailed Description
To integrate Web3 authorization into RatersApp, the `@nfid/embed` library was used for connecting NFID, setting up the authorization, and extracting necessary cryptographic keys (principal, public/private keys) and the wallet address.

For integrating Internet Computer Protocol (ICP) authorization, `@dfinity/identity` was employed for basic authorization functionalities. Additionally, a custom community library `@ic-use-internet-identity` was utilized to provide a convenient hook for incorporating ICP authorization seamlessly into the React component structure of the application.

To ensure compatibility and retrieve the wallet addresses required for transactions and further operations, the `@dfinity/ledger` library was used. Specifically, the `fromPrincipal` method was crucial for obtaining the wallet address corresponding to the principal obtained from both NFID and ICP integrations.

## Repository Information
This repository is a trimmed example implementation of the frontend part of the RatersApp service, demonstrating the milestone implementations within the ICP developer grant framework.

**Disclaimer:** This is not the complete codebase of RatersApp frontend, but solely for demonstrating Web3 authorization and data recording on the blockchain.

## Installation
Clone the repository:
```bash
git clone https://github.com/RatersApp/raters-fe-example.git
cd raters-fe-example
```

## Getting Started

First, run the development server:
```bash
npm run dev
```
# or
```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

API routes can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in pages/api/hello.js.

The pages/api directory is mapped to /api/*. Files in this directory are treated as API routes instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License
This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) license, except for the following open-source libraries used in this project:

- **Next.js** - [MIT License](https://github.com/vercel/next.js/blob/canary/license.md)
- **React.js** - [MIT License](https://github.com/facebook/react/blob/main/LICENSE)
- **TypeScript** - [Apache License 2.0](https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt)
- **@dfinity/agent** - [Apache License 2.0](https://github.com/dfinity/agent-js/blob/main/LICENSE)
- **@dfinity/identity** - [Apache License 2.0](https://github.com/dfinity/agent-js/blob/main/LICENSE)
- **@dfinity/candid** - [Apache License 2.0](https://github.com/dfinity/agent-js/blob/main/LICENSE)
- **@dfinity/ledger** - [Apache License 2.0](https://github.com/dfinity/agent-js/blob/main/LICENSE)

See the [LICENSE](https://github.com/RatersApp/raters-fe-example/blob/main/LICENSE.md) file for more details.
