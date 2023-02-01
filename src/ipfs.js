//imports the IPFS API
import { create } from 'ipfs-http-client';
import { Buffer } from "buffer";

/**
 * creates & exports new instance for 
 * IPFS using infura as host, for use.
 */
const projectId = '2KiK6S75slDQfxRFU5dfP7z7TQG';
const projectSecret = '622237ae0de6536fe6464071ffa0a100'
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64');

//const ipfs = create({ host: 'ipfs.io', port: 5001, protocol: 'https' });
//const ipfs = create();
const ipfs = create({
     host: 'ipfs.infura.io', 
     port: 5001, 
     protocol: 'https',
    headers: {
        authorization: auth
    } })
export default ipfs;
