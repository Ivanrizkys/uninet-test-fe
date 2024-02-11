# Frontend Test - Ivan Rizky Saputra

![thumbnail](https://raw.githubusercontent.com/Ivanrizkys/uninet-test-fe/main/public/image/login-page.png)

<p align="center">
<a href="https://uninet-test-fe.vercel.app/">Live Demo</a>
</p>

This is user management dashboard build with React - Typesctript, ShadcnUI and Firebase. This project adheres to the atomic design concept in the component preparation process. This website was created to follow the recruitment process at Uninet Media Sakti.


## Features
- Login
- Register
- See list user
- See detail user
- Update user
- Create new user
- Delete user

## Credential
Credentials for login and register on this website have been determined. Even for the registration process, you cannot use credentials other than those specified. For this reason, below are the credentials that you can use for the login and registration process.
```bash
Login
email: eve.holt@reqres.in
password: cityslicka

Register
email: eve.holt@reqres.in
password: pistol
```

## Run on Local
- Clone this github repository
- Enter directory
- Install all deppendency using "npm install" or "yarn"
- Setup ".env" file, you can check file ".env.example"
- Then, run project on terminal using "npm run dev" or "yarn dev"
- Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Generate PWA Assets
This website also supports PWA. You can run the command below to generate assets for PWA.
```bash
npm run generate-pwa-assets

or

yarn generate-pwa-assets
```
After that, if you want to see/try to install PWA locally. You can build and run projects by running the commands **npm run build** and **npm run preview**.

## Run Test
This project uses Jest and React Testing Libraries for testing purposes. You can run the command below to run all existing test cases.
```bash
npm run test

or

yarn test
```