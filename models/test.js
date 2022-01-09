import moment from "moment";

const date = moment(); // moment.utc() for created_at, but not for event dates, as they need to be in local time...
// console.log(date.add(3, "days").format("dddd, DD MMMM YYYY"));
// console.log(date.add(3, "days").format("HH:mm"));
// console.log(date.format());
console.log(date.format()); // gives local time, not UTC!
console.log(date.date())
console.log(date.month()) // zero indexed 0 - 11
console.log(moment(date).isSame('2021-11-30','day'));
const today = moment(date).day();
console.log(today);
console.log(moment(date).add(3, "days").startOf("day"));
console.log(moment(date).add(5, "days").endOf("day"));
// console.log(moment('2022-01-01').format("dddd, DD MMMM YYYY")); // pass the string from frontend into the moment() function
