# bukku-client

[![npm version](https://badge.fury.io/js/bukku-client.svg)](https://badge.fury.io/js/bukku-client)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Publish Package to npm](https://github.com/farhan-syah/bukku-client/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/farhan-syah/bukku-client/actions/workflows/publish-npm.yml)

A TypeScript client library for interacting with the Bukku REST API. This package aims to provide an easy way to integrate Bukku services into your Node.js or TypeScript projects.

## Features

- TypeScript-first: Written in TypeScript for strong typing and better developer experience.
- Provides convenient methods for accessing Bukku API endpoints.
- Easy to integrate and use.

## Installation

You can install `bukku-client` using npm or yarn:

```bash
bun install bukku-client
# or
npm install bukku-client
# or
yarn add bukku-client
```

## Usage

To use the `bukku-client`, you'll first need to instantiate the `BukkuClient` with your API Access Token and Company Subdomain. You can find your Access Token in the Control Panel > Integrations section of your Bukku web application.

```typescript
import { BukkuClient } from "bukku-client";

const bukku = new BukkuClient({
  accessToken: "YOUR_BUKKU_ACCESS_TOKEN", // Replace with your actual Access Token
  companySubdomain: "YOUR_COMPANY_SUBDOMAIN", // Replace with your company's Bukku subdomain
  apiBaseUrl: "https://api.bukku.fyi", // Example for Bukku staging environment
});
```

## API Documentation

This library aims to implement the functionalities exposed by the Bukku REST API. For detailed information about the API endpoints, request/response structures, and authentication, please refer to the official Bukku API Documentation:

- **[Bukku Official API Documentation](https://developers.bukku.my)**

Detailed documentation for each method and available types within this library will be provided here as the library evolves.

The main client class, `BukkuClient`, will be the entry point for all API interactions.

## Development

To get started with development:

1.  Clone the repository:
    ```bash
    git clone https://github.com/farhan-syah/bukku-client.git
    cd bukku-client
    ```
2.  Install dependencies:
    ```bash
    bun install
    ```

## Contributing

Contributions are welcome! If you'd like to contribute, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

---

_This is an unofficial client library for Bukku. Bukku is a trademark of its respective owners._
