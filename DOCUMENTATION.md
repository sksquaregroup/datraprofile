# Datra Platform™ — Enterprise Architecture & Operations Manual

> **Official Technical Documentation for Datra Platform Web Profile, Tools, & Integrations**  
> Technology of **SK Square Group Ltd** &bull; Version 2.0.0 (Production Enterprise Edition)

---

## 📑 Table of Contents

1. [Executive Overview & Value Proposition](#1-executive-overview--value-proposition)
2. [Information Architecture & Routing System](#2-information-architecture--routing-system)
3. [Interactive Components & Engineering Engines](#3-interactive-components--engineering-engines)
4. [Design System & Theme Engine](#4-design-system--theme-engine)
5. [Serverless Contact & Lead Delivery API](#5-serverless-contact--lead-delivery-api)
6. [Hosting & Vercel Deployment Configuration](#6-hosting--vercel-deployment-configuration)
7. [Local Development & CLI Reference](#7-local-development--cli-reference)
8. [Security, SLAs & Regulatory Compliance](#8-security-slas--regulatory-compliance)

---

## 1. Executive Overview & Value Proposition

**Datra Platform** is a mission-critical operating system and centralized fleet management platform built for large-scale digital signage networks, DOOH (Digital Out-of-Home) media owners, transport hubs, and high-density retail estates.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATRA ENTERPRISE CLOUD                          │
│                                                                        │
│   ┌─────────────────────┐  ┌───────────────────┐  ┌────────────────┐   │
│   │  Telemetric Fleet   │  │  SHA-256 Frame    │  │  Zero-VPN SSH  │   │
│   │  GeoSpatial Engine  │  │  Proof of Play    │  │  & RS232 Bus   │   │
│   └──────────┬──────────┘  └─────────┬─────────┘  └───────┬────────┘   │
└──────────────┼───────────────────────┼────────────────────┼────────────┘
               │                       │                    │
    Outbound Encrypted WebSocket TLS 1.3 Tunnels (Port 443 Only)
               │                       │                    │
┌──────────────▼───────────────────────▼────────────────────▼────────────┐
│                    PHYSICAL DISPLAY INFRASTRUCTURE                     │
│                                                                        │
│   [ Airport FIDS ]    [ Rail Concourses ]    [ DOOH Billboards ]        │
│   Samsung Tizen / LG webOS / BrightSign / Windows / Linux SoC / LED     │
└────────────────────────────────────────────────────────────────────────┘
```

### Dual-Audience Value Pillars:
* **For Network & Media Owners**:
  * **Revenue Assurance**: Eliminates advertiser billing disputes with tamper-evident cryptographic Proof of Play (PoP).
  * **Opex Reduction**: Cuts on-site engineer truck rolls by over 80% via automated self-healing and remote RS232/IP remediation.
  * **99.999% SLA Compliance**: Automated failover and live SLA penalty tracking.
* **For Technical Operators & NOC Teams**:
  * **Zero-VPN Remote Shell**: Direct browser-based SSH and diagnostic terminal without opening risky firewall ports.
  * **Multi-Protocol Hardware Bus**: 80+ pre-compiled RS232 commands (power toggle, input source, backlight calibration, thermal logs).
  * **Live Visual Mosaic**: Sub-second synchronized screen captures and optical camera feed inspection.

---

## 2. Information Architecture & Routing System

The website is engineered as a high-performance **Single Page Application (SPA)** with clean deep linking and separate dedicated industry sector pages.

### SPA Hash Routing (`/#/route/`):
| URL Path | Target Section | Description |
| :--- | :--- | :--- |
| `/#/features/` | `#features` | Core platform capabilities (Telemetry, SSH, Proof of Play, Mobile) |
| `/#/platform/` | `#platform` | Dual architecture view & interactive terminal simulator |
| `/#/sectors/` | `#sectors` | Industry-specific deployment solutions (Airports, Rail, Retail, DOOH) |
| `/#/integrations/` | `#integrations` | Certified CMS partners (Broadsign, Scala, Dise, Navori, BrightSign) |
| `/#/hardware/` | `#hardware` | Hardware compatibility matrices (Samsung, LG, Sharp/NEC, NovaStar) |
| `/#/pricing/` | `#pricing` | Tiered pricing packages (Starter, Professional, Enterprise) |
| `/#/calculator/` | `#calculator` | Interactive 3-Year ROI & TCO financial estimator |
| `/#/demo/` | `#demo` | Live platform walkthrough consultation booking form |

### Standalone Deep-Dive Routes:
* `/platform/` — Technical platform deep-dive with raw specs.
* `/sectors/` — Multi-sector index & industry case studies:
  * `/sectors/airports/` — Aviation, FIDS & terminal concessions.
  * `/sectors/rail/` — High-speed rail & concourse synchronisation.
  * `/sectors/bus-stations/` — Low-bandwidth cellular IoT & transit shelters.
  * `/sectors/roadside-ooh/` — Solar-powered digital billboards & ambient control.
  * `/sectors/premium-media/` — 8K flagship curved LED spectaculars.
  * `/sectors/retail/` — In-store digital merchandising & franchisee multi-tenancy.
* `/proof-of-play/` — Framebuffer auditing & revenue compliance breakdown.
* `/dooh-fleet-management/` — NOC dashboard and remote diagnostics manual.

---

## 3. Interactive Components & Engineering Engines

The web application includes custom JavaScript engines located in [`js/main.js`](file:///c:/Users/girim/Desktop/Profile/js/main.js):

### A. Dynamic ROI & TCO Calculator
An interactive financial projection model allowing network executives to calculate their 3-year cost reductions:
$$\text{Annual Callout Savings} = (\text{Estate Size} \times \text{Callout Frequency}) \times £285 \times 0.82$$
$$\text{Revenue Dispute Protection} = \text{Estate Size} \times £1,450 \times 0.045$$
$$\text{Projected 3-Year ROI} = \frac{\text{Total 3-Year Gross Savings} - \text{Datra License Cost}}{\text{Datra License Cost}} \times 100\%$$

### B. Live Terminal & RS232 Emulator
Interactive interactive shell emulator allowing operators to test live diagnostic commands (`ping`, `status`, `reboot`, `rs232 query-power`, `clear-cache`, `backup`) with instant terminal output.

### C. Live Visual Mosaic Filters
Multi-tier filter matrix to simulate live screen thumbnails across:
* **All Screens** (5,400+ Units)
* **Digital Roadside**
* **Airport FIDS**
* **Rail Platforms**
* **Retail Stores**

### D. Dual Audience Perspective Switcher
Dynamic toggle in the Hero section allowing the layout and value points to instantly flip between **"For Network Owners"** (ROI, uptime SLAs, revenue compliance) and **"For Technical Operators"** (SSH tunnels, RS232, kernel logs, zero-VPN access).

---

## 4. Design System & Theme Engine

Built using modern **Vanilla CSS custom properties (Tokens)** for maximum rendering performance, zero external framework overhead, and sub-10ms theme switching.

### Color Palette & Visual Identity:
* **Background Obsidian (Dark)**: `#090615` / `#0e0920`
* **Electric Cyan (Primary)**: `#00f2fe`
* **Vibrant Sky Blue (Secondary)**: `#38bdf8`
* **Neon Fuchsia (Accent)**: `#d946ef`
* **Light Theme Canvas**: `#f8fafc` / `#ffffff`
* **Typography**: `'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Sliding Pill Theme Switcher:
An integrated oval switch (`58px × 30px`) located next to **"Book a Demo"** in the navigation header:
* **Dark Mode**: Sliding thumb sits on the **Moon 🌙** (right) with a deep slate background.
* **Light Mode**: Sliding thumb smoothly transitions to the **Sun ☀️** (left) with a crisp white circle and soft shadow.
* **Storage**: Preference is automatically remembered in `localStorage` under key `datraThemePreference` and respects the visitor's OS `prefers-color-scheme`.

---

## 5. Serverless Contact & Lead Delivery API

Located in [`api/contact.js`](file:///c:/Users/girim/Desktop/Profile/api/contact.js), this Vercel Serverless Function processes consultation inquiries and executes a **two-way email delivery flow**:

```
[ Visitor Submits Demo Form ]
             │
      POST /api/contact
             │
     ┌───────┴───────────────────────────────┐
     ▼                                       ▼
1. Internal Lead Notification        2. Client Confirmation Auto-Responder
   To: info@sksquaregroup.com           To: client@company.com
   Subject: [Demo Request] Company      Subject: Consultation Request Received
```

### Supported Providers:
1. **Resend API (Primary / Recommended)**: Fast, native serverless email delivery using `resend`.
2. **SMTP / Nodemailer (Enterprise Fallback)**: Supports Gmail, Microsoft 365, Amazon SES, Brevo, SendGrid.

---

## 6. Hosting & Vercel Deployment Configuration

The repository is configured for immediate zero-config deployment on Vercel via [`vercel.json`](file:///c:/Users/girim/Desktop/Profile/vercel.json).

### Vercel Deployment Steps:
1. Connect your GitHub repository `sksquaregroup/datraprofile` on [Vercel](https://vercel.com).
2. **Application Preset**: Select **`Other`** (or Static).
3. **Environment Variables**: Add your keys under **Project Settings &rarr; Environment Variables**:

| Variable Key | Required | Example / Recommended Value |
| :--- | :---: | :--- |
| `RESEND_API_KEY` | Yes | `re_123456789_your_api_key` |
| `CONTACT_TO_EMAIL` | Yes | `info@sksquaregroup.com` |
| `CONTACT_FROM_EMAIL` | Yes | `Datra Platform <info@sksquaregroup.com>` |
| `SMTP_HOST` | Optional | `smtp.gmail.com` (if not using Resend) |
| `SMTP_PORT` | Optional | `587` |
| `SMTP_USER` | Optional | `info@sksquaregroup.com` |
| `SMTP_PASS` | Optional | `your-app-password` |

### Custom Domain DNS Settings:
To map your custom domain (e.g. `datraplatform.com`):
* **A Record**: `@` &rarr; `76.76.21.21`
* **CNAME Record**: `www` &rarr; `cname.vercel-dns.com`

---

## 7. Local Development & CLI Reference

Datra Platform includes a built-in, zero-dependency Node.js HTTP server.

### Available Commands:
```bash
# Start local development server (Port 3000)
npm start
# or
npm run dev

# On Windows: Double-click start-dev.bat
start-dev.bat
```

### Server Endpoint:
Navigate to **`http://localhost:3000`** in any web browser.

---

## 8. Security, SLAs & Regulatory Compliance

* **ISO/IEC 27001 Certified**: Governed information security management system.
* **SOC 2 Type II Certified**: Audited operational availability, confidentiality, and integrity.
* **99.999% High Availability SLA**: Guaranteed enterprise uptime across global multi-region cloud clusters.
* **GDPR Compliance**: Visual telemetry inspection operates with zero PII retention and client-side framebuffer hashing.

---

&copy; 2026 **SK Square Group Ltd**. All rights reserved.  
*Datra Platform™* and *DatraField™* are trademarks of SK Square Group Ltd.
