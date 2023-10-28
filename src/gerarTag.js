const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');
const { exec } = require('child_process');
const path = require("path");


let tag = new Date().getFullYear().toString();
exec(`git log --pretty=format:'' | wc -l`, (error, stdout, stderr) => {
    console.info("==Pegadando Numero de commits==")

    if (error) {
        console.error(`error: ${error.message}`);
        return
    }
    if (stderr) {
        console.warn(`stderr: ${stderr}`);
    }
    if (stdout) {
        console.info(`Numero de Commits: ${stdout}`);
        tag = tag + "-" + stdout;
        console.info(tag)
        console.info("==Criando Tag ==")

        exec((`git tag -a v${tag} -m "version ${tag} - ${version}"`).replace(/\n/g, ""), (error, stdout, stderr) => {

            const gitInfo = gitDescribeSync({
                dirtyMark: false,
                dirtySemver: false
            });
            gitInfo.version = version;
            if (error) {
                console.error(`error: ${error.message}`);
                return
            }
            if (stderr) {
                console.warn(`stderr: ${stderr}`);
            }
            if (stdout) {
                console.info(`stdout: ${stdout}`);

            }

            const file = resolve(__dirname, '..', 'src', 'version.ts');
            writeFileSync(file,
                `// IMPORTANTE: ESTE ARQUIVO É GERADO AUTOMATICAMENTE! NÃO EDITAR OU VERIFICAR MANUALMENTE!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
                /* tslint:enable */
                `, { encoding: 'utf-8' });

            console.info(`Informação da versão ${gitInfo.raw} para ${relative(resolve(__dirname, '..'), file)}`);
            exec((`git add . && git commit -m 'v${tag}' && git push`).replace(/\n/g, ""), (error, stdout, stderr) => {
                if (error) {
                    console.error(`error: ${error.message}`);
                }
                exec((`git push origin v${tag}`).replace(/\n/g, ""), (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                    }
                })
            })
        })
    }
    console.info("==Fim==")
});