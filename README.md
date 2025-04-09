# Approval Shield

A modern web application for identifying malicious, risky, or deceptive approval requests in blockchain and web3 transactions. This tool helps users detect potentially harmful requests that could give attackers access to a user's assets.

## Features

### Core Functionality
- **Risk Detection**: Identifies and categorizes potentially malicious approvals
- **Risk Level Classification**: Categorizes approvals as high, medium, low, or no risk
- **Detailed Analysis**: Provides code snippets and explanations for detected risks
- **Mock Generation**: Generate sample malicious approvals for testing and training

### User Interface
- **Dashboard**: Central hub showing approval status and risk metrics
- **Scan History**: Track past approval scans and their results
- **Filtering System**: Filter approvals by risk level and approval type
- **Settings**: Configure scan behavior and notification preferences

## Technical Stack
- **Frontend**: React with TanStack Query for state management
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components

## Project Structure
- client/ - Frontend React application
- server/ - Backend Express server
- shared/ - Shared code between client and server

## Data Models

### Approval
Represents a transaction approval that has been analyzed for risk:
- `id`: Unique identifier
- `title`: Short description of the approval
- `provider`: Service or platform originating the approval
- `description`: Detailed explanation of the approval request
- `codeSnippet`: Code involved in the approval
- `riskLevel`: Risk classification (high, medium, low, none)
- `type`: Approval category (wallet, transaction, token)
- `detectedAt`: Timestamp when approval was detected
- `details`: Additional information (optional)

### Scan History
Represents a completed scan operation:
- `id`: Unique identifier
- `scanDate`: When the scan was performed
- `totalApprovals`: Total number of approvals found
- `riskyApprovals`: Number of risky (high/medium) approvals
- `riskScore`: Overall risk score (0-100)

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/approvals` | GET | Get all approval items |
| `/api/approvals/:id` | GET | Get approval by ID |
| `/api/approvals` | POST | Create new approval |
| `/api/stats` | GET | Get approval statistics |
| `/api/scan-history` | GET | Get scan history |
| `/api/scan-history/latest` | GET | Get latest scan |
| `/api/scan-history` | POST | Record new scan |
| `/api/scan` | POST | Perform new scan |
| `/api/generate-mock` | POST | Generate mock malicious approval |

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### Usage Guide

#### Performing a Scan
1. Navigate to the dashboard
2. Click the "Scan for Approvals" button
3. Wait for scan results to appear in the results panel
4. Review any detected risks

#### Testing with Mock Data
1. Navigate to the dashboard
2. Click the "Generate Mock Malicious" button
3. A sample high-risk approval will be generated
4. Review the details to understand potential attack vectors

## License

This project is licensed under the MIT License.
