# TransMedWebPTIN

Web interface for the TransMed - Transportation of Medicines project developed in the context of the subject "PTIN" in the Spring 2023 semester of the group A3.

## Roadmap
- [ ] Static website
  - [ ] Sample login page
  - [ ] Profile for users
  - [ ] Management area
    - [ ] Map with the positioning of the (local) drones
    - [ ] Map with the positioning of the cars
    - [ ] Inventory with filtering
  - [ ] Patient area
    - [ ] My orders
    - [ ] Request medicine
  - [ ] Doctor area
    - [ ] Assigned patient list
    - [ ] Notifications
- [ ] Interactivity with sample/local information
- [ ] Retrieval/Storage of information through the common API developed

## Local build/deployment with docker

### Development environment - for doing testing

```
make build-development
make start-development
```

Open http://localhost:3001

### Staging environment - for doing UAT testing

```
make build-staging
make start-staging
```

Open http://localhost:3002

### Production environment - for users

```
make build-production
make start-production
```

Open http://localhost:3003

## Running Locally without docker

First, install the dependencies:

```bash
npm install

```
Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
