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

**Datra Platform** is a centralized **Digital Signage Operations Platform** — *Monitor Every Screen. Manage Every Player. Fix Issues Remotely.* It gives digital signage owners and technical teams one platform to monitor, manage, troubleshoot, and maintain their entire screen network — without the site visits.

### Platform Ecosystem & Suite Structure:
* **Datra Platform (Core Solution)**: Centralized monitoring and remote troubleshooting application with enterprise reporting. Real-time telemetry, remote diagnostic terminal, reboot & restart actions, and uptime SLA reporting.
* **Our Other Products**:
  1. **Datra CMS (Content Distribution)**: Dynamic playlist scheduling, dayparting, verified proof of play (POP), and playback compliance reporting across every screen.
  2. **Orbit Platform (Network Operations)**: Enterprise network infrastructure orchestrator — manage routers, wireless access points (APs), PoE switches, cellular 4G/5G failover, and bandwidth allocation.
  3. **Orbit Desk (Incident Management)**: Signage-specialized NOC ticketing tool to manage incidents, hardware faults, CMS sync problems, change requests, and RMA dispatches with automated SLA workflows.

### Tailored Audience Architecture (Individual Cards & Master Covers):
* **For Asset Owners (6 Capabilities)**:
  1. *Real-Time Asset Visibility*: Monitor screens, media players, and connected devices from one dashboard.
  2. *Online / Offline Monitoring*: Instantly identify connected, disconnected, degraded, and inactive players.
  3. *Location-Based Management*: Organize assets by city, site, branch, zone, terminal, or customer.
  4. *Hardware Monitoring*: Track RAM, storage, CPU, temperature, network status, BIOS, and device information.
  5. *Performance Insights*: Understand uptime, downtime trends, SLA adherence, and operational history.
  6. *Proactive Alerts*: Catch issues before customers or staff notice or report them.

* **For Technical Operators (8 Capabilities)**:
  1. *Remote Monitoring*: Check player health, hardware utilization, background processes, and network latency.
  2. *Live Screenshots*: View what is currently rendering on screen without physical inspection.
  3. *Camera Verification*: Confirm physical display environment and screen illumination where ambient cameras are installed.
  4. *Remote Diagnostics*: Investigate player status, HDMI/EDID handshakes, connected peripherals, and OS behavior.
  5. *Logs & System Details*: Access application logs, crash reports, and system diagnostics for fast root-cause identification.
  6. *Remote Commands*: Restart signage software, reboot media players, flush caches, or execute maintenance scripts.
  7. *Service Monitoring*: Track critical digital signage software, media services, and Daemons with auto-recovery.
  8. *Task Automation*: Trigger scheduled maintenance jobs, OS patches, and fleet-wide configurations across single or grouped devices.

### End-to-End 6-Step Operational Lifecycle:
* **Step 01 — Create**: Ingest media assets, configure dynamic data widgets, and design high-impact visual campaigns.
* **Step 02 — Schedule**: Establish targeted calendar dates, dayparting time slots, frequency caps, and fallback playlists.
* **Step 03 — Deploy**: Push cryptographically signed packages to targeted display groups, cities, or individual screens.
* **Step 04 — Display**: High-performance hardware acceleration renders synchronized 4K/8K content with sub-millisecond precision.
* **Step 05 — Monitor**: Real-time telemetry ingestion streams device health, proof of play hashes, and environmental telemetry.
* **Step 06 — Troubleshoot**: Remotely diagnose, power-cycle, reboot stalled applications, or dispatch field engineers automatically.

### Enterprise Value Badges:
* **Secure**: ISO 27001 & SOC 2 Type II certified, TLS 1.3 outbound-only communication, per-tenant data isolation.
* **Easy Management**: Single pane of glass for mixed-hardware fleets with intuitive map and mosaic dashboards.
* **Scalable**: Cloud-native event streaming supporting thousands of concurrent endpoints with sub-second latency.
* **Reliable**: 99.999% SLA uptime, automated offline caching, and self-healing watchdog daemons.
* **Remote Control**: Zero-VPN remote terminal access and multi-manufacturer RS232 hardware bus execution.
* **Measurable Impact**: Verifiable Proof of Play, automated SLA dispute recovery, and 84% reduction in site callouts.


---

## 2. Information Architecture & Routing System

The website is engineered as a high-performance **Single Page Application (SPA)** with clean deep linking and separate dedicated industry sector pages.

### SPA Hash Routing (`/#/route/`):
| URL Path | Target Section | Description |
| :--- | :--- | :--- |
| `/#/architecture/` | `#solution-blueprint` | End-to-End System Blueprint (Components, Cloud Platform, Verticals, 6-Step Lifecycle) |
| `/#/features/` | `#features` | Core platform capabilities (Telemetry, SSH, Proof of Play, Mobile) |
| `/#/platform/` | `#platform` | Dual architecture view & interactive terminal simulator |
| `/#/sectors/` | `#sectors` | Industry-specific deployment solutions (9 Sectors: Rail & Transit, Airports & Aviation, DOOH & Roadside, Retail & QSR, Corporate & Workplace, Healthcare & Clinical, Stadiums & Venues, Banking & Finance, Higher Education) |
| `/#/integrations/` | `#integrations` | Certified CMS partners & OS environments (Broadsign, Scala, Dise, Windows, Linux, Android, Chrome OS) |
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

## 4. Design System & Theme Engine (Royal Violet Identity)

Built using the **Unity Platform** structural design language paired with Datra's signature **Royal Violet** brand identity and a multi-theme engine for maximum rendering performance, crisp corporate clarity, and authentic digital signage fleet aesthetics.

### Color Palette & Visual Identity:
* **Primary Royal Violet (`--violet` / `--violet2`)**: `#7c3aed` / `#8b5cf6` (Dark: `#8b5cf6` / `#a78bfa`)
* **Violet Accents (`--violet-light` / `--violet-dk` / `--violet-pale`)**: `#a78bfa` / `#6d28d9` / `#f5f3ff`
* **Violet Ambient Glow (`--violet-glow`)**: `rgba(124, 58, 237, 0.28)`
* **Canvases (Light)**: `#ffffff` (Card) / `#f9f8fe` (Alt Section) / `#0c0a1a` (Navy)
* **Canvases (Dark Mode `[data-theme="dark"]`)**: `#090616` (Deep Obsidian Violet) / `#130d2a` (Card) / `#1a1238` (Grey)
* **High-Contrast Clean Borders (`--border`)**: `#e2d9f3` (Light) / `rgba(255,255,255,0.10)` (Dark)
* **Status Accents**: Green (`#10b981`), Amber (`#f59e0b`), Red (`#ef4444`)
* **Typography**: `'Montserrat', sans-serif` (Weights 300 to 900, with letter-spacing `-0.03em` to `-0.04em` on display headings)

### Full-Width Screen Coverage & Responsive Layout System:
* **Edge-to-Edge Navigation**: Nav container spans 100% full-screen width with fluid horizontal padding (`padding: 0 clamp(16px, 2.5vw, 48px)`), anchoring the brand logo on the far left and the login/demo/theme controls on the far right.
* **Full-Width Canvas Grid (`.container`)**: Expanded from legacy 1200px to an edge-covering fluid canvas (`max-width: 1720px` to `1880px` on ultrawide displays) with dynamic clamp padding (`clamp(20px, 3.5vw, 64px)`), eliminating massive empty gutters on widescreen monitors.
* **Proportional Hero Display**: Hero columns utilize fluid distribution (`1.15fr 1fr`), dynamic headline scaling (`clamp(38px, 4.2vw, 64px)`), lead text expanding up to 720px+, and the interactive browser frame height scaling with screen width (`clamp(360px, 25vw, 480px)`).
* **Tablet View (768px – 1180px)**: Desktop links collapse into a full-height slide-down drawer (`#navMenu.open`) with backdrop blur, 2-column feature and industry grids, and stacked 3-column steps.
* **Mobile View (< 768px)**: 1-column touch-friendly cards, mobile drawer containing both navigation anchors and direct quick-action buttons ("Client Login" + "Book a Demo"), and responsive typography scaling.
* **Dual Theme Synchronization**: Header sliding pill switch (`#themePillToggle`) and footer segmented switcher (`#themeSwitchSegment`) smoothly sync across dark and light modes, persisting visitor preference in `localStorage`.

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
