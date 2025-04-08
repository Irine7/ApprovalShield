import { InsertApproval } from "@shared/schema";

// Sample approval data for testing
export const sampleApprovals: InsertApproval[] = [
  {
    title: "Unlimited Token Approval",
    provider: "DeFi Protocol XYZ",
    description: "Request to approve unlimited spending of your tokens by an unverified smart contract.",
    codeSnippet: "Requesting approval for UNLIMITED tokens from 0x7ae...c1e2 to 0x1f2...8a9b",
    riskLevel: "high",
    type: "token",
    details: "Unlimited token approvals are dangerous as they give the approved contract control over all tokens in your wallet."
  },
  {
    title: "Suspicious Transaction",
    provider: "Unknown Wallet",
    description: "Transaction to an address flagged in past scams with unusual parameters.",
    codeSnippet: "Sending 0.5 ETH to address 0x3e5...9f2d with suspicious data payload",
    riskLevel: "medium",
    type: "transaction",
    details: "The destination address has been linked to previous scams and the transaction includes unusual calldata."
  },
  {
    title: "Limited Token Approval",
    provider: "Verified Exchange",
    description: "Limited approval to a verified contract with reasonable spending limit.",
    codeSnippet: "Approving 100 USDC to verified contract 0xa1b...e3f4",
    riskLevel: "low",
    type: "token",
    details: "Limited approvals to verified contracts are generally safer than unlimited approvals."
  },
  {
    title: "Wallet Connection",
    provider: "NFT Marketplace",
    description: "Standard connection request from a verified marketplace.",
    codeSnippet: "Read-only connection to wallet from verified domain opensea.io",
    riskLevel: "none",
    type: "wallet",
    details: "This is a standard wallet connection request that only asks for read access to your wallet."
  }
];

// Mock malicious approval for testing
export const mockMaliciousApproval: InsertApproval = {
  title: "Deceptive Domain Connection",
  provider: "metamask.phishing-site.com",
  description: "Connection request from a site with typosquatting patterns attempting to mimic a legitimate service.",
  codeSnippet: "Site metamask.phishing-site.com requesting connection to wallet using deceptive visual elements",
  riskLevel: "medium",
  type: "wallet",
  details: "This domain uses typosquatting to impersonate a legitimate service. The site contains visual elements that mimic the real MetaMask interface to deceive users."
};
