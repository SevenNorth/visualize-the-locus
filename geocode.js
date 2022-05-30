const _ = require('lodash');
const axios = require('axios');
// const gcoord = require('gcoord');
const inquirer = require('inquirer')

const fs = require('fs');
const data = require('./src/features/Panel/classes/mock/2022-5-13.json');

function getAddress() {
    const address = []
    _.each(data.patientsList, patient => {
        _.each(patient.tracksList, tracks => {
            _.each(tracks.track, geo => {
                if (geo.type === 'point') {
                    address.push(patient.city + geo.address)
                } else {
                    address.push(patient.city + geo.path[0].address)
                    address.push(patient.city + geo.path[1].address)
                }
            })
        })
    })
    return address;
}

async function getlonLat() {
    const addressList = getAddress();
    const uniqList = Array.from(new Set(addressList))
    const  questions = [
            {
                type: 'input',
                name: 'tk',
                message: "输入tk: "
            }
        ] 
    const { tk } = await inquirer.prompt(questions)
    const resMap = {};
    for (let index = 0; index < uniqList.length; index++) {
        const address = uniqList[index];
        const target_url = `http://api.tianditu.gov.cn/geocoder?ds={"keyWord":"${address}"}&tk=${tk}`;
        console.log("🚀-fjf : target", address);
        const res = await axios.get(encodeURI(target_url));
        resMap[address] = res.data.location;
    }
    return resMap;
}

async function buildResult(){
    const resMap = await getlonLat();
    _.each(data.patientsList, patient => {
        _.each(patient.tracksList, tracks => {
            _.each(tracks.track, geo => {
                if (geo.type === 'point') {
                    const geoAddress = patient.city + geo.address;
                    // const point = [ resMap[geoAddress].lon, resMap[geoAddress].lat]
                    geo.x = resMap[geoAddress].lon;
                    geo.y = resMap[geoAddress].lat;
                } else {
                    const startAddress = patient.city + geo.path[0].address;
                    geo.path[0].x = resMap[startAddress].lon;
                    geo.path[0].y = resMap[startAddress].lat;
                    const endAddress = patient.city + geo.path[1].address;
                    geo.path[1].x = resMap[endAddress].lon;
                    geo.path[1].y = resMap[endAddress].lat;
                }
            })
        })
    })

    const dataStr = JSON.stringify(data, '', '\t')
    writeFileRecursive('./src/mockdata/2022-05-13.json',dataStr, (err)=>{
        console.log("🚀-fjf : err", err);
    })
}

const writeFileRecursive = function(path, buffer, callback){
    let lastPath = path.substring(0, path.lastIndexOf("/"));
    fs.mkdir(lastPath, {recursive: true}, (err) => {
        if (err) return callback(err);
        fs.writeFile(path, buffer, function(err){
            if (err) return callback(err);
            return callback(null);
        });
    });
}

buildResult()