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

## Building docker image of the web and deploying it locally

```sh
git clone https://github.com/RabadanDotDev/TransMedWebPTIN
cd TransMedWebPTIN/web
docker build -t TransMedWebPTIN .
docker run -p 80:80 TransMedWebPTIN
```
