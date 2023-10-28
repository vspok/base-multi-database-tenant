const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');
const { exec } = require('child_process');
const path = require("path");



const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false
});
gitInfo.version = version;
const file = resolve(__dirname, '..', 'src', 'version.ts');
writeFileSync(file,
    `// IMPORTANTE: ESTE ARQUIVO É GERADO AUTOMATICAMENTE! NÃO EDITAR OU VERIFICAR MANUALMENTE!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
                /* tslint:enable */
                `, { encoding: 'utf-8' });

console.info(`Informação da versão ${gitInfo.raw} para ${relative(resolve(__dirname, '..'), file)}`);