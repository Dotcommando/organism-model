import * as fs from 'fs';
import * as path from 'path';
import * as libxmljs from 'libxmljs';

function validateXML(xmlPath: string, xsdPath: string): boolean {
  const xsdData = fs.readFileSync(xsdPath, 'utf-8');
  const xsdDoc: libxmljs.XMLDocument = libxmljs.parseXml(xsdData);

  const xmlData = fs.readFileSync(xmlPath, 'utf-8');
  const xmlDoc: libxmljs.XMLDocument = libxmljs.parseXml(xmlData);

  const isValid = xmlDoc.validate(xsdDoc) as boolean;

  if (!isValid) {
    console.error(`File ${xmlPath} failed validation against ${xsdPath}:`);

    xmlDoc.validationErrors?.forEach(err => {
      console.error(`- Line ${err.line}, column ${err.column}: ${err.message.trim()}`);
    });
  }

  return isValid;
}

function getDirectories(source: string): string[] {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function sortVersions(versions: string[]): string[] {
  return versions.sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
}

function main() {
  const examplesDir = path.resolve(__dirname, '..', 'examples');
  const devXsdFilePath = path.resolve(__dirname, '..', 'xsd', 'dev', 'organism-model.xsd');

  if (!fs.existsSync(devXsdFilePath)) {
    console.error(`No new standard found: ${devXsdFilePath}`);
    process.exit(1);
  }

  const versions = getDirectories(examplesDir);

  if (versions.length === 0) {
    console.error('No version directories found in examples.');
    process.exit(1);
  }

  const sortedVersions = sortVersions(versions);
  const latestVersion = sortedVersions[sortedVersions.length - 1];
  const latestExamplesDir = path.join(examplesDir, latestVersion);

  const xmlFiles = fs.readdirSync(latestExamplesDir).filter(f => f.endsWith('.xml') || f.endsWith('.omxml'));

  if (xmlFiles.length === 0) {
    console.warn(`No XML files found in ${latestExamplesDir}.`);
    process.exit(0);
  }

  console.log(`Validating files from ${latestExamplesDir} against new standard ${devXsdFilePath}:`);
  let overallSuccess = true;

  for (const xmlFile of xmlFiles) {
    const xmlPath = path.join(latestExamplesDir, xmlFile);
    const result = validateXML(xmlPath, devXsdFilePath);

    if (!result) overallSuccess = false;
  }

  if (overallSuccess) {
    console.log('All files in the latest version passed validation against the new standard successfully.');
    process.exit(0);
  } else {
    console.error('Some files in the latest version failed validation against the new standard.');
    process.exit(1);
  }
}

main();
