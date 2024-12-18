import * as fs from 'fs';
import * as path from 'path';
import * as libxmljs from 'libxmljs';
function validateXML(xmlPath, xsdPath) {
    const xsdData = fs.readFileSync(xsdPath, 'utf-8');
    const xsdDoc = libxmljs.parseXml(xsdData);
    const xmlData = fs.readFileSync(xmlPath, 'utf-8');
    const xmlDoc = libxmljs.parseXml(xmlData);
    const isValid = xmlDoc.validate(xsdDoc);
    if (!isValid) {
        console.error(`File ${xmlPath} failed validation against ${xsdPath}:`);
        xmlDoc.validationErrors?.forEach(err => {
            console.error(`- Line ${err.line}, column ${err.column}: ${err.message.trim()}`);
        });
    }
    return isValid;
}
function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}
function main() {
    const examplesDir = path.resolve(__dirname, '..', 'examples');
    const xsdDir = path.resolve(__dirname, '..', 'xsd');
    const versions = getDirectories(examplesDir);
    let overallSuccess = true;
    for (const version of versions) {
        const exampleVersionDir = path.join(examplesDir, version);
        const xsdVersionDir = path.join(xsdDir, version);
        if (!fs.existsSync(xsdVersionDir)) {
            console.warn(`Skipping ${version}, no matching schema directory found in xsd/`);
            continue;
        }
        const xsdFilePath = path.join(xsdVersionDir, 'organism-model.xsd');
        if (!fs.existsSync(xsdFilePath)) {
            console.warn(`Skipping ${version}, no organism-model.xsd found in ${xsdVersionDir}`);
            continue;
        }
        const xmlFiles = fs.readdirSync(exampleVersionDir).filter(f => f.endsWith('.xml'));
        if (xmlFiles.length === 0) {
            console.warn(`No XML files found in ${exampleVersionDir}.`);
            continue;
        }
        console.log(`Validating files from ${exampleVersionDir} using ${xsdFilePath}:`);
        for (const xmlFile of xmlFiles) {
            const xmlPath = path.join(exampleVersionDir, xmlFile);
            const result = validateXML(xmlPath, xsdFilePath);
            if (!result)
                overallSuccess = false;
        }
    }
    if (overallSuccess) {
        console.log('All files passed validation successfully.');
        process.exit(0);
    }
    else {
        console.error('Some files failed validation.');
        process.exit(1);
    }
}
main();
//# sourceMappingURL=validate-all.js.map