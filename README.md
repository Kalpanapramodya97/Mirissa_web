# 🌴 Mirissa — Sri Lanka's Tropical Paradise

A stunning, modern travel destination website for **Mirissa, Sri Lanka** — featuring pristine beaches, world-class whale watching, and breathtaking sunsets.

![Mirissa Hero](public/images/hero.png)

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Developer   │────▶│   GitHub     │────▶│ GitHub       │────▶│  AWS S3      │
│  (git push)  │     │  Repository  │     │ Actions CI/CD│     │  (Private)   │
└─────────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
                                                                      │ OAC
                                                               ┌──────▼───────┐
                                              Users ◀──────────│  CloudFront  │
                                                               │  (CDN/HTTPS) │
                                                               └──────────────┘
```

## ✨ Features

- 🎨 **Premium Design** — Dark ocean theme with glassmorphism, gradients, and micro-animations
- 🐋 **Whale Watching** — Dedicated section with seasonal information
- 📍 **Attractions** — Coconut Tree Hill, Secret Beach, Parrot Rock
- 🖼️ **Interactive Gallery** — Lightbox viewer with tilt effects
- 📱 **Fully Responsive** — Mobile-first design
- ⚡ **Lightning Fast** — Served via CloudFront CDN
- 🔒 **Secure** — HTTPS only, private S3 bucket with OAC
- 🔄 **Auto Deploy** — Push to `main` → builds → deploys automatically

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- AWS CLI v2
- Git

### Local Development
```bash
npm install
npm run dev
```

### Deploy Infrastructure
```bash
aws cloudformation deploy \
  --template-file infrastructure/template.yaml \
  --stack-name mirissa-website \
  --capabilities CAPABILITY_NAMED_IAM
```

### CI/CD Setup
Add these secrets to your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`

Push to `main` to trigger automatic deployment.

## 💰 Cost

Designed to stay within AWS Free Tier:
| Service | Free Tier | Usage |
|:---|:---|:---|
| S3 | 5 GB storage | ~50 MB |
| CloudFront | 1 TB transfer/month | Minimal |
| CodePipeline | 1 free pipeline | GitHub Actions (free) |

**Estimated monthly cost: $0**

## 📄 License

MIT — Built with ❤️ for Sri Lanka's southern coast.
