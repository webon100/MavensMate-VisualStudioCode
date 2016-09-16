import fs = require('fs');
import path = require('path');
import { BaseCommand } from './baseCommand';
import { MavensMateChannel } from '../../vscode/mavensMateChannel';
import { MavensMateClient } from '../mavensMateClient';

export function commandDirectory(): { [id: string]:  () => BaseCommand } {
    let commandFiles = fs.readdirSync(__dirname);
    let commandBuilders: { [id: string]:  () => BaseCommand } = {};
    for(let commandFile of commandFiles){
        if(commandFile.endsWith('js')){
            let commandBaseName = path.basename(commandFile, '.js');
            let commandKey = 'mavensmate.' + commandBaseName;
            let importedCommandFile = require('./' + commandFile);

            let buildCommand = importedCommandFile.build;
            if(buildCommand){
                console.info('Imported ' + commandKey);
                commandBuilders[commandKey] = buildCommand;
            }
            
        }
    }

    return commandBuilders;
}