const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require("gulp-babel-minify");
const strip = require('gulp-strip-comments');
const fs = require('fs-extra');
const orig = "./src";
const src = `${orig}/**/*.js`;
const dest = "./dist";

/**
 * Builda o projeto a cada alteração
 * @returns {undefined}
 */
const watch = () => {
    gulp.watch(src, ["build"]);
};

/**
 * Build do projeto
 * @returns {undefined}
 */
const build = () => {
    console.log("Building");
    process.env.NODE_ENV = "production";
    /**/
    gulp
            .src(src)
            .pipe(babel({
                presets: ['env'],
                plugins: ["transform-class-properties"]
            }))
            .pipe(gulp.dest(dest));
};

/**
 * Gera o index em dist
 * @returns {undefined}
 */
const genIndex = () => {
    console.log("Gerando o index!");
    /**/
    let imports = "";
    let exports = "";
    const index = `${orig}/index.js`;
    const listFiles = (dir) => {
        fs.readdirSync(dir).forEach((file) => {
            let tmp = `${dir}/${file}`;
            if (fs.statSync(tmp).isDirectory()) {
                listFiles(tmp);
            } else {
                if (tmp.substr(tmp.lastIndexOf(".")) === ".js") {
                    let imp = file.replace(".js", "");
                    let exp = tmp.replace(".js", "").replace(orig, '.');
                    imports+=`require('${exp}');`;
                    exports+=`${imp},`;
                }
            }
        });
    };
    /**/
    if (fs.existsSync(index)) {
        fs.removeSync(dest);
        fs.removeSync(index);
    }
    listFiles(orig);
    fs.writeFileSync(index, `${imports}`);
    build();
};

/**/
gulp.task('build', genIndex);
gulp.task('watch', watch);
