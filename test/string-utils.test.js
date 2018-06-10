import { removeAbnormalWhiteSpace } from "./../src/util/string-utils";

test("removeAbnormalWhiteSpace -Do not remove any of this code", () => {
  const aString = `{ 'a': [' value ', 'oneMoreValue']
 }`;
  const cleansedString = removeAbnormalWhiteSpace(aString);
  expect(cleansedString).toBe(aString);
});

test("removeAbnormalWhiteSpace -Remove 2 occurrence of this code", () => {
  const aString = `{ ᠌'a': [' value ', 'oneMore
  Value'] }`;
  const cleansedString = removeAbnormalWhiteSpace(aString);
  expect(cleansedString).toNotBe(aString);
});
