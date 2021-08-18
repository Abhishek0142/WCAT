#!/usr/bin/env node

const { count } = require("console");
const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];
for(let i of arguments){
    if(i[0] == "-"){
        flags.push(i);
    }
    else if(i[0] == "%"){
        secondaryArguments.push(i.slice(1));
    }
    else{
        filenames.push(i);
    }
}
//Optimized Code
for(let file of filenames){
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        //Remove Spaces
        if(flag == "-rs"){
            fileData = removeAll(fileData, " ");
        }
        //Remove Newlines
        if(flag == "-rn"){
            fileData = removeAll(fileData, "\r\n");
        }
        //Remove Specific Characters after %
        if(flag == "-rsc"){
            let tempString = "";
            for(let secondaryArgument of secondaryArguments){
                fileData = removeAll(fileData, secondaryArgument);
            }
        }
        //This flag shows content with numbering on both newlines and written lines.
        if(flag == "-s"){
            let data = addSequence(fileData);
            console.log(data);
        }
        //This flag shows content with numbering on only written lines.
        if(flag == "-sn"){
            let data = addSequenceTnel(fileData);
            console.log(data);
        }
        //Remove extra lines
        if(flag == "-rel"){
            let ans = removeExtLine(fileData);
            for(let i=0; i<ans.length; i++){
                console.log(ans);
            }
        }
    }
    //console.log(fileData);
}
function removeAll(String, removalData){
    return String.split(removalData).join("");
}
function addSequence(content){
    let contentArr = content.split("\r\n");
    for(let i=0; i<contentArr.length; i++){
        contentArr[i] = [i+1] + " " + contentArr[i];
    }
    return contentArr;
}
function addSequenceTnel(content){
    let contentArr = content.split("\r\n");
    let count = 1;
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = count + " " + contentArr[i];
            count++;
        }
    }
    return contentArr;
}
function removeExtLine(fileData){
    let contentArr = fileData.split("\r\n");
    let data = [];
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != null){
            data.push(contentArr[i]);
        }
    }
    return data;
}