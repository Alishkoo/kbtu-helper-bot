import {unlink} from 'fs/promises';

export async function removeFile(path){
    try{
        await unlink(path);
    }catch(e){
        console.log("Error with removing file",e.message);
    }
}