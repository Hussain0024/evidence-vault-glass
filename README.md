# Blockchain Guardian

**A secure, blockchain-powered digital evidence management platform built for integrity, compliance, and scale.**

---

## Table of Contents

- [Project Info](#project-info)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Technologies Used](#architecture--technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Developer](#developer)
- [License](#license)

---

## Project Info

- **Vision**: To create an unbreachable digital evidence vault that maintains absolute data integrity through blockchain technology, serving critical industries with court-admissible verification.

---

## Features

- **Blockchain-Powered Integrity:** All evidence operations are cryptographically verified and blockchain-backed.
- **Audit Trails & Compliance:** Automated audit logs for regulatory needs (HIPAA, legal, etc.).
- **Role-Based Access & Encryption:** Advanced access controls and encryption for protecting sensitive data.
- **Real-Time Updates:** See changes and updates as they happen.
- **Seamless User Experience:** Modern, responsive, and easy to use.

---

## Tech Stack

- **Frontend:**
  - React (TypeScript)
  - Vite (build tool)
  - shadcn/ui (component library)
  - Tailwind CSS (utility-first styling)
  - Radix UI (accessible UI primitives)
  - Embla Carousel, Lucide Icons, Recharts

- **Backend / Database:**
  - Supabase (Postgres, auth, storage, instant APIs)
  - Advanced cryptographic algorithms for secure hashing and verification

- **Other:**
  - Eslint, Prettier (code quality)
  - Blockchain integrations (for data integrity)

---

## Architecture & Technologies Used

- **React** with **TypeScript** for robust, type-safe UI development.
- **Vite** for ultra-fast development and builds.
- **Tailwind CSS** and **shadcn/ui** for modern, beautiful, and consistent design.
- **Supabase** provides backend database, authentication, storage, and real-time features.
- **Radix UI** for accessible, composable UI primitives.
- **Blockchain** is leveraged for evidence verification, immutability, and audit trails.
- **Role-based access controls** are implemented for security and compliance.
- **Eslint, Prettier, and Typescript** ensure code quality and maintainability.

#### Key NPM Dependencies

```json
{
  "react": "^18.3.1",
  "typescript": "^5.5.3",
  "vite": "^5.4.1",
  "@supabase/supabase-js": "^2.49.8",
  "tailwindcss": "^3.4.11",
  "shadcn-ui": "...",
  "radix-ui": "...",
  "embla-carousel-react": "^8.3.0",
  "lucide-react": "^0.462.0",
  "recharts": "^2.12.7"
  // ...see package.json for full list
}
```

#### Notable Config Files

- `vite.config.ts` - Project build and dev server configuration.
- `tailwind.config.ts` - Custom theming, colors, and animations for UI.
- `src/integrations/supabase/types.ts` - Typed database schema for Supabase.

---

## Setup & Installation

You can use your preferred IDE or GitHub Codespaces.

### 1. Clone the Repository

```sh
git clone https://github.com/Hussain0024/evidence-vault-glass.git
cd evidence-vault-glass
```

### 2. Install Dependencies

Make sure you have **Node.js** and **npm** installed.  
If unsure, install Node.js via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
npm install
```

### 3. Start Development Server

```sh
npm run dev
```

This will launch the app with auto-reloading and instant preview.

---

## Usage

- **Edit Locally:**  
  Use your preferred code editor/IDE. Push changes to GitHub to update the repository.

- **Edit on GitHub:**  
  Use the web interface to edit and commit files directly.

- **GitHub Codespaces:**  
  Launch a cloud dev environment with one click from the GitHub UI.

---

## Deployment

Deployment can be handled using your preferred hosting provider.  
Build the project using:

```sh
npm run build
```

Then, serve the output in the `dist` directory using your chosen static site hosting solution.

---

## Developer

**Shaik Mohammed Hussain**  
- Full Stack Developer | Blockchain Enthusiast | Security Expert
- Specialist in React, TypeScript, distributed systems, and blockchain security.
- Committed to revolutionizing digital evidence management across legal, healthcare, finance, and government sectors.

---

## License

This repository is licensed under the MIT License.  
See [LICENSE](LICENSE) for details.

---

> _For more info, see the [GitHub repo](https://github.com/Hussain0024/evidence-vault-glass)._

```
**Note:** This README is based on the latest available files and may not reflect files in subdirectories or future updates.  
To explore all details, visit: [GitHub Repository Contents](https://github.com/Hussain0024/evidence-vault-glass/tree/main/)
```
