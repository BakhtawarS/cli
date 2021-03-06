import { run } from '../../services/command';
import { readJson } from '../../services/project';

import { backendPushCommand } from './backend-push';
import { backendDeployCommand } from './backend-deploy';

export async function backendCommand(command: string, commander: any) {
    const commanderRawArgs = commander['parent']['rawArgs'];
    const cwd = 'backend';

    switch (command) {
        case 'push':
            await backendPushCommand();
        break;

        case 'deploy':
            await backendDeployCommand();
        break;

        case 'install':
        case 'i':
            await run('npm install', command, commanderRawArgs, cwd);
        break;

        case 'uninstall':
        case 'un':
            await run('npm uninstall', command, commanderRawArgs, cwd);
        break;

        case 'run':
            await run('npm run', command, commanderRawArgs, cwd, true);
        break;

        default:
            let cmd = command;
            // run script if available
            const { scripts = {} } = await readJson('package.json', cwd);
            if (!!scripts[command]) {
                cmd = 'npm run ' + command;
            }
            await run(cmd, command, commanderRawArgs, cwd);
        break;
    }
}
