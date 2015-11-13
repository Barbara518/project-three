#API Docs
##Ruby on Rails and ERB

User + Session are all done with ERB.

ROOT will take you to the sign in or sign up page.
Session POST will create a user.


##JSON

GET /amiloggedin will return JSON with current user.

GET /articles/all_articles will return array of articles.

```json
{
  user: "Barbara Rodriguez",
      articles: [
      {
          id: 1,
          user_id: 2,
          username: "Cristina Rempel",
          location: "Winifredport",
          latitude: "-41.84337327423664",
          longitude: "-123.67628424066976",
          body: "Doloribus consequuntur ut provident modi cumque. Architecto aut ut modi ducimus voluptas et. Ipsa culpa doloremque alias. Quibusdam debitis sapiente ea esse. Perspiciatis enim dolorum consequuntur numquam.",
          date_traveled: "2015-03-29",
          comments: [
          {
              id: 1,
              user_id: 1,
              username: "Barbara Rodriguez",
              article_id: 1,
              body: "This is a comment"
              }]
          }]};

```
