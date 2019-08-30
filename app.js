const express = require("express");

const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("./models/event");

const app = express();
app.use(cors());
app.use(express.json());

// first ! cant be nullable alwasy return list of strings
//  second always will return list not a list of nulls

// ! in ID makes it not nullable

//dfsafsdfds/
//fsdfsdasdf

app.get("/home", (req, res) => {
  res.send("ho");
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`

        type Event {
            _id: ID
            title: String!
            description: String!
            price: Float!
            date: String!

        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }


        type RootQuery {
            events: [Event!]!


        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event

        }


        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event.id.toString() };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });
        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    },
    graphiql: true
  })
);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/your-app-name"
);

mongoose.connect(
  "mongodb+srv://rodbromberg:qSa3ZuYrSHoq39jS@graphql-rxba8.mongodb.net/test?retryWrites=true&w=majority"
);
//   .then(() => {
//     app.listen(4000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
mongoose.connection.once("open", () => {
  console.log("connected");
});

const port = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log("${port} is up");
});
