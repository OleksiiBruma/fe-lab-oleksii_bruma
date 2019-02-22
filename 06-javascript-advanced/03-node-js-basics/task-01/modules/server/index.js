const fs = require('fs');
const modules = {
    getFilePaths(dir, result = []) {
        let files = fs.readdirSync(dir);
        for (let i in files) {
            let name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                this.getFilePaths(name, result);
            } else {
                result.push(name.replace(/\.\/content\//i, ''));
            }
        }
        return result;
    },
    sort(paths) {
        var sorted = {};
        paths.filter((file) => {
            if (/\w+.(js|jsx)$/igm.test(file)) {
                if (!sorted.javascript) {
                    sorted.javascript = [];
                }
                sorted.javascript.push(file);
            } else if (/\w+.(d.ts)$/igm.test(file)) {
                if (!sorted.definition) {
                    sorted.definition = [];
                }
                sorted.definition.push(file);
            } else if (/\w+(.ts|.tsx)$/igm.test(file)) {
                if (!sorted.typescript) {
                    sorted.typescript = [];
                }
                sorted.typescript.push(file);
            } else if (/\w+.(json|yaml|yml)$/igm.test(file)) {
                if (!sorted.configuration) {
                    sorted.configuration = [];
                }
                sorted.configuration.push(file);
            } else if (/\w+.(jpg|jpeg|png|svg|gif)$/igm.test(file)) {
                if (!sorted.images) {
                    sorted.images = [];
                }
                sorted.images.push(file);
            } else if (/(?=logs)(.)+.(log)$/igm.test(file)) {
                if (!sorted.logs) {
                    sorted.logs = [];
                }
                sorted.logs.push(file);
            } else {
                if (!sorted.others) {
                    sorted.others = [];
                }
                sorted.others.push(file);
            }
        });
        return sorted
    },
    render(files){
        const headings = Object.keys(files);
        headings.forEach((heading)=>{
            const headingHTML = `<h2>${heading}</h2>`;
            document.querySelector("body").insertAdjacentHTML("beforeend",headingHTML);
            files[heading].forEach((filePath)=>{
                const filePathHTML = `<pre>${filePath}<pre>`;
                document.querySelector("body").insertAdjacentHTML("beforeend",filePathHTML);
            })

        });

    }
};

module.exports.modules = modules;
