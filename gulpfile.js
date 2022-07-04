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



const WhiteList = {
	// https://regexr.com/

	standard: [
		'h1','h2','h3','h4','h5','h6',
		
		'wp-post-image', 'attachment-full', 'size-full',
		
		// 'accordion',
		'loaded',
		// 'current-lang',
		// 'scroll',
		// 'lang-item',
		// 'breadcrumb_last', // yoast breadcrumb
		// 'max-mega-menu',
		// 'collapsing',
		// 'header__logo',
		// 'header',
		// 'header__logo__svg',
		// 'header__navigation',
		// 'menu',
		// 'menu-item',
		// 'menu-button',
		// 'menu-main-menu-container',
		// 'menu-main-menu',
		// 'menu-item',
		// 'menu-item-type-post_type',
		// 'menu-item-object-page',
		// 'menu-item-home',
		// 'menu-item-type-custom',
		// 'menu-item-object-custom',
		// 'current-menu-item',
		// 'ul.menu li.menu-item',
		// 'wpform',
		// 'wpbutton',
		// 'tippy-box', 'tippy-iOS', 'tippy-arrow', 'tippy-content',

		// // Bootstrap modal
		// 'modal', 'modal-dialog', 'modal-header', 'modal-title', 'modal-body', 'modal-footer',
		// 'fade', 'show',
		// 'logged-in', 'collapse', 'mb-2', 'small',
		'mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'mb-6',
		'pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'pb-6',
		'mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'mt-6',
		'pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5', 'pt-6',

		'column', 'o', 'o--pt', 'o--pb', 'section',
		'home', 'body',
		
		'avatar',

	],

	// Deep = includes children
	deep: [
		// /mobilenav/,
		// /header/,
		// /mega-sub-menu/,
		// /dropdown/,
		// /hidden/,
		// /collapsed/, /collapse/, /collapsing/,
		// /show/,
		/^o--/,
		/^header/,
		/^gryform/
		
	],

	// Greedy = any part
	greedy: [
		/^d-/, // Starts with ".d-"
		// /^r--/, // Starts with ".r--"
		// /page--top/,
	]
}


function purgeCSS() {
	return gulp
		.src('./dist/css/*.css')
		.pipe(
			purgecss({
				content: [
					'./*.php',
					'./*.html',
					'./include/*.php'
				],
				safelist: WhiteList
			})
		)
		.pipe(gulp.dest('./dist/css'));
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
// exports.compressImagesCopy = compressImagesCopy;

// copySVGs
// Series scripts
exports.watch = series(copyImages, copySVGs, copyVideos);
exports.build = series(copyImages, copyVideos, copySVGs, compressCSS);
exports.buildnopurge = series(copyImages, copySVGs, copyVideos, compressCSS);