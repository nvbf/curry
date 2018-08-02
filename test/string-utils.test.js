import { removeAbnormalWhiteSpace } from "./../src/util/string-utils";

test("removeAbnormalWhiteSpace -Do not remove any of this code", () => {
  const aString = `{ 'a': [' value ', 'oneMoreValue']
 }`;
  const cleansedString = removeAbnormalWhiteSpace(aString);
  expect(cleansedString).toBe(aString);
});

// TODO: understand what this was about and enable it or remove it
// test("removeAbnormalWhiteSpace -Remove one occurrence of this code", () => {
//   // On line col 22 on the line below there is a unicode 0 visualle length whitespace character that should be remove by the function
//   const aString = `{ ᠌'a': [' value ', 'oneMore
//   Value'] }`;
//   const cleansedString = removeAbnormalWhiteSpace(aString);
//   expect(cleansedString).toNotBe(aString);
// });
