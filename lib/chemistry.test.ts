import test from "node:test"; import assert from "node:assert/strict"; import { evaluateDemo } from "./chemistry.ts";
test("independent setup advances to verify",()=>{const r=evaluateDemo("4.00",[{quantity:"4",unit:"mol H2",operation:"2:2",result:"4"}]);assert.equal(r.answerCorrect,true);assert.equal(r.recommendedNextState,"VERIFY")});
test("unsupported arithmetic is isolated",()=>{const r=evaluateDemo("3",[{quantity:"4",unit:"mol H2",operation:"2:2",result:"3"}]);assert.equal(r.firstUnsupportedStep,1);assert.equal(r.recommendedNextState,"DIAGNOSE")});
test("uncertain input changes no evidence",()=>{const r=evaluateDemo("I am not sure",[]);assert.equal(r.status,"invalid_input");assert.equal(r.answerCorrect,"unknown")});
