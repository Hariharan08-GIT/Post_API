const express = require('express');
const fs = require('fs');
const  path = require('path');
const app = express();

const filePath = path.join(__dirname, '../Data/posts.json');

function readJSON(filePath){
    try{
        const data = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(data);
    }catch(error){
        console.error('Error reading JSON file: ',error);
        return[];
    }
};

function writeJSON(filePath, data){
    try{
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    }catch(error){
        console.error('Error writing JSON file: ', error);
        return false;
    }
};

app.get('/', (req, res) =>{
    const data = readJSON(filePath);
    res.json(data);
})

app.post('/', (req, res) =>{
    const {content, author, tags} = req.body;

    if(!content || !author){
        return res.status(400).json({error:"Content or Author is missing"});
    }
    if(content.length < 1 || content.length > 280){
        return res.status(400).send({error:"The Content must be 1 to 280 characters long"});
    }
    if(!Array.isArray(tags) || tags.length > 5){
        return res.status(400).send({error:"Should be Array and max length 5"});
    }

    const posts = readJSON(filePath)

    const newPosts = {
        postId:Date.now().toString(),
        content,
        author,
        tags,
        like: 0,
        status:'published',
        createdAt: new Date().toISOString(),
    }

    posts.push(newPosts);
    writeJSON(filePath, posts);
    res.status(201).json({success: "Posts added", ...newPosts});
})

module.exports = app;
