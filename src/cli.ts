import * as commander from "commander";
import { translate } from "./main";

const program = new commander.Command();

program
  .version("0.0.2")
  .name("fy")
  .usage("<english>")
  .option("-s, --source <char>", "set source language")
  .option("-t, --target <char>", "set target language")
  .arguments("<english>")
  .action((word, options) => {
    if (/[a-zA-z]/.test(word[0])) {
      options.source = "en";
      options.target = "zh";
    } else if (/[\u4e00-\u9fa5]/.test(word[0])) {
      options.source = "zh";
      options.target = "en";
    }
    translate(word, options.source, options.target);
  });

program.parse(process.argv);

// npx ts-node src/cli.ts -h
// npx ts-node src/cli.ts fuck

// npx ts-node src/cli.ts おおばかやろう -s jp -t zh
