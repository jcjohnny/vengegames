# rvngrplyr

#### VIEW ME ON BITBALOON
http://engineer-development-70664.bitballoon.com/#

A data analyzing app for the NBA that parses through all nba player data and collects all nba players that potential revenge games for the week

#### Why do we care?
Fantasy basketball is a huge niche and data plays a huge role for the people who play it. As it stands right now, there are no apps that showcase a nba players day for revenge, or projected stats of a player for that revenge game. Data is valuable for fantasy players who are looking for nba players who can perform at higher standards than normal for their sport fantasy team. Whether a player would care about performing will play a huge role in selecting a player for a daily fantasy league, or for the week


#### Determination
initial phase will gather all player data and determine which nba players will have a match that against a former team for the week.
- stats against former teams
    - some nba players care, some nba players don't. a compilation of stats from a player who has played against a former team will be a large factor in determining the chances of a player "going off"
    - overall calculation of stats from season average for the year, and previous years performance during revenge games.

#### Visualization
- how else but in the form of graphs and charts? visual representation of data will play a prominent role in user experience, as well as the user experience itself. graphs should have hover points to display further data. data sorting should also be available.
    - should figure out other ways to visualize data. d3 can help, but maybe unnecessary.


- when a nba player plays against a former team, sometimes the player would want to have a revenge game, and perform at a higher level than he usually would against other teams, showing more:
    - aggressiveness
    - emotions
    - skill
    - some other feelings I can't think of atm

##### after completing the first idea and returning data, how can I figure out other ways to determine revenge data?
- twitter api - lots of news on nba players are tweeted every day and hour. grab data that has the nba players name tagged or mentioned in real time and update the page by the week.
- not just revenge against former teams, but maybe player vs player (player rivalry, sibling rivalry though rare)? is it possible to determine this information with data and how?

#### users can play too(lowest priorty)
- users can vote for an nba player that will have the most vengeful game and win nothing but pride
- users can save there favorite players of the week to use for later in there fantasy leagues, including notes!

#### user interaction
user stories: https://trello.com/b/EWPuywCr/rvngrplyr
-overview-
- as a user I want graphs to depicts all the revenge type data that a player has for all revenge games played.
- i want to hover over graphs to view information, and see details and descprtions of the stats being depicted (avg revenge games stats compared to depicted revenge game stats against average stats)
- I want to comment on a players chances for going off during the game, and have a conversation with other users(maybe not)
- I want to see all the teams that a previous player was a part of, and the average revenge game stat against average game stat
- i want an overall estimation graph cirle showcasing the chances of a player going off during a revenge game
- I want an overall estimation of performance against a certain team, vs other teams. does he care about a vengeful games against a certain team more than another?
- i want overall performance of a player during a revenge game.





#### some issues
specify the data. if the player was on a different team playing a former team. gotta say it
add buttons for graphs. view recent 3 revenge games, and view by year.
add +/- and minutes to a chart
store the data.
next 7 days
