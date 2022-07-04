const {series} 			= require('gulp')
const gulp            	= require('gulp')

const postcss         	= require('gulp-postcss')
const cssnano         	= require('cssnano')
const purgecss			= require('gulp-purgecss');





function copyImages() {
	return gulp
		.src([
			'./src/images/*.png',
			'./src/images/*.jpg',
			'./src/images/*.gif'
		])
		.pipe(gulp.dest('./dist/images/'));
}


function copySVGs() {
	return gulp
		.src([
			'./src/svg/*.svg'
		])
		.pipe(gulp.dest('./dist/svg/'));
}



function copyVideos() {
	return gulp
		.src([
			'./src/videos/*.mp4',
            './src/videos/*.webm'
		])
		.pipe(gulp.dest('./dist/videos/'));
}




function compressCSS() {
	var plugins = [
		cssnano()
	]
	return gulp.src('./dist/css/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dist/css/'))
}


// Scripts
exports.default = compressCSS;
exports.copyImages = copyImages;

// copySVGs
// Series scripts
exports.watch = series(copyImages, copySVGs, copyVideos);
exports.build = series(copyImages, copyVideos, copySVGs, compressCSS);
exports.buildnopurge = series(copyImages, copySVGs, copyVideos, compressCSS);