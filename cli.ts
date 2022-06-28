const { Command } = require('commander');
const program = new Command();
const { translate } = require('./main.ts');

program
  .version('0.0.2')
  .name('fy')
  .usage('<english>')
  .arguments('<english>')
  .action((english) => {
    translate(english);
  });

program.parse(process.argv);
