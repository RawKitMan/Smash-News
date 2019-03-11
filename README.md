# Smash-News

Welcome to Smash News, the one-stop-shop for all news in regards to Super Smash Brothers....from Kotaku. This site scrapes articles from https://kotaku.com/tag/smash-bros, stores them in a Mongoose Collection, and then displays them on the page via Handlebars. 

Each displayed article provides a link to the actual article, the ability to save or delete the article from the page, and add a note/comment for a specific article. Each note is stored in it's own Mongoose Collection with its unique ID stored in the associated Article document. The user can also update the comment.

Things to improve on:

- Add images to each article. The images associated with the articles I'm scraping are lazy loaded, which makes it very difficult, if not impossible, to scrape. I need to research into how I can pull this off

- Set up the notes text boxes through Handlebars rather than using front end Javascript

Technology utilized: Express, Handlebars, Mongoose, Morgan (to track database requests)Javascript/jQuery, Bootstrap, Cheerio, Axios

Heroku deployment URL: https://ancient-gorge-41927.herokuapp.com/
GitHub Repo: https://github.com/RawKitMan/Smash-News
