import {Slix, ProtocolProvider} from 'slix-app';
import config from './config/config.json'

let server = new Slix();

server.replaceParamProvider(ProtocolProvider, config.ProtocolProvider);

server.run();