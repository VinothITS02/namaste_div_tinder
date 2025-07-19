const fs = require("fs");

export const createFile = () => {
    // Writing to a file
    const contentToWrite = 'This is some content to write to the file.';
    fs.writeFile('output.txt', contentToWrite, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('File has been written successfully.');
        }
    });
};

export const fileRead = () => {
    // Reading a file
    fs.readFile('output.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('File content:', data);
        }
    });
};

module.exports = {
    createFile,
    fileRead
}