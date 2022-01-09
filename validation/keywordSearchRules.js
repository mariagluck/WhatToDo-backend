import { body } from "express-validator";

const keywordSearchRules = [
    body("s").trim().escape().stripLow()
];

export default keywordSearchRules;