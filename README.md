# ChampiFestin
ChampiFestin is a E-Shop for buying magic mushrooms with a nice and user-friendly interface ^^.

# Nice to know
The project is using TypeScript and SASS followed by API Platform in Symfony.

# How to install
Just copy paste the following commands to setup correctly the project:
```
git clone https://github.com/TryZorce/ChampiFestin.git
cd ChampiFestin
```
Then go to the Symfony folder and rename the `.env.dist` to `.env`:
```
cd symfony
mv .env.dist .env
```
Now you should edit the .env as you want (you should start by changing the database credentials).

Then install the dependencies:
```
composer install
```

Finally, open 3 (three) terminals in the main folder and execute the following commands:

### Terminal 1
```
cd symfony
symfony serve
```

### Terminal 2
```
cd symfony
npm run watch
```

### Terminal 3
If you are not in production:
```
cd next
npm run dev
```

Other commands for next:
```
npm run build
npm run start
```