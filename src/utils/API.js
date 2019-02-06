/* eslint-disable prefer-template */
import axios from "axios";

const cors = "https://cors-anywhere.herokuapp.com/";
const meetUpURL = "https://api.meetup.com/find/groups?photo-host=public&zip=30305&page=20&country=United+States&sig_id=272753321&topic_id=16728&sig=bcedfde34581831a9452606762c089cae458621f";
const poemsURL = "https://www.poemist.com/api/v1/randompoems";

export default {
  // get meetup match
  getMeetUp() {
    return axios.get(cors + meetUpURL);
  },
  // get random poem
  getPoems() {
    return axios.get(cors + poemsURL);
  },
  // Gets all poems
  getPoemsDB() {
    return axios.get("/poems");
  },
  // Gets poems myPoems
  getMyPoems() {
    return axios.get("/poems/self/");
  },
  // Gets User data
  getUserData() {
    return axios.get("/user/self/");
  },
  // Gets the poem with the given id
  getPoemsById(id) {
    return axios.get("/poems/" + id);
  },
  // Saves a poem to the database
  savePoem(poemData) {
    return axios.post("/poems", poemData);
  },

};
