/* eslint-disable no-console */
const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Poems collection and inserts the poems below

mongoose.connect(
  process.env.MONGODB_URI
  || "mongodb://localhost/poemSpot",
);

// Test data
const poemSeed = [
  {
    title: "Footprints",
    author: "Eleanor Roosevelt",
    body:
      "Many people will walk in and out of your life, but only true friends leave footprints in your heart.",
    date: new Date(Date.now()),
  },
  {
    title: "It’s all I have to bring today",
    author: "Emily Dickenson",
    body:
      "This, and my heart beside. This, and my heart, and all the fields. And all the meadows wide—Be sure you count— should I forget. Some one the sum could tell. This, and my heart, and all the Bees. Which in the Clover dwell.",
    date: new Date(Date.now()),
  },
  {
    title: "The Black Art",
    author: "Anne Sexton",
    body:
      "A woman who writes feels too much, those trances and portents! As if cycles and children and islands weren't enough; as if mourners and gossips and vegetables were never enough. She thiks she can warn the stars. A writer is essentially a spy. Dear love I am that girl.",
    date: new Date(Date.now()),
  },
  {
    title: "300 Goats",
    author: "Naomi Shihab Nye",
    body:
      "In icy fields.Is water flowing in the tank ? Will they huddle together, warm bodies pressing? (Is it the year of the goat or the sheep? Scholars debating Chinese zodiac, follower or leader.) O lead them to a warm corner, little ones toward bulkier bodies. Lead them to the brush, which cuts the icy wind. Another frigid night swooping down. Aren’ t you worried about them ? I ask my friend, who lives by herself on the ranch of goats, far from here near the town of Ozona. She shrugs, “Not really, they know what to do.They’ re goats.",
    date: new Date(Date.now()),
  },
  {
    title: "Sigh no more, ladies, sigh no more",
    author: "William Shakespear",
    body:
      "Sigh no more, ladies, sigh no more. Men were deceivers ever, One foot in sea, and one on shore, To one thing constant never. Then sigh not so, but let them go, And be you blithe and bonny, Converting all your sounds of woe Into hey nonny, nonny. Sing no more ditties, sing no more Of dumps so dull and heavy. The fraud of men was ever so Since summer first was leafy. Then sigh not so, but let them go, And be you blithe and bonny, Converting all your sounds of woe Into hey, nonny, nonny.",
    date: new Date(Date.now()),
  },
];

// TestData
const userSeed = {
  name: "User",
  lastName: "Data",
  email: "userdata@test.com",
  password: "p@ssword123",
};

// Poem insert into DB
db.poemSpot
  .remove({})
  .then(() => db.Poem.collection.create(poemSeed))
  .then((data) => {
    console.log(`${data.result.n}Poem records inserted!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// User inserte into DB
db.poemSpot
  .remove({})
  .then(() => db.NewUser.collection.create(userSeed))
  .then((data) => {
    console.log(`${data.result.n}User records inserted!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
