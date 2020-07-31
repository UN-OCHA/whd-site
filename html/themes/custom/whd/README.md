# WHD 2020 theme for Drupal 8

## CSS

This project uses [Sass](http://sass-lang.com/). To make changes edit the `.scss` files in the `sass/` folder, do NOT edit the files in `css/` directly.

Run `gulp dev` in the theme folder to have gulp watch for changes and automatically rebuild the CSS.

Run `gulp sass` to compile the CSS only.

Preferably use Jenkins to run the Gulp task on build to generate the CSS. If this is possible on your project, add the `css/` folder to the `.gitignore` file and delete generated CSS from the repo.


## Gulp

This project uses [Gulp 4](https://github.com/gulpjs/gulp#whats-new-in-40)

To see a task listing, run the following command:

`gulp --tasks`


## Icons

The available icons can be found in `img/icons`

There are two techniques used, depending on context.

1. SVG as a background-image value, usually on a pseudo element. The SVG fill colour is added as an attribute in the SVG file. We use this technique only when using technique 2 isn't possible.
The icons are black by default. If you need another color, it's best to copy the icon and manually adjust the fill/stroke to suit your needs. Rename the copy to include the color in the filename eg. `arrow-down--white.svg`.

2. SVG symbol sprite using the `<use>` element. The SVG sprite is loaded as a single asset in the `html.tpl.php` before the closing body tag. Each icon within the sprite can be referenced by its ID eg.
```
<svg class="cd-icon cd-icon--arrow-down">
  <use xlink:href="#cd-icon--arrow-down"></use>
</svg>
```
Each icon should have the class `cd-icon` and a BEM selector if needed eg. `cd-icon--arrow-down`. We can create associated CSS rules to control dimension and fill. We're using https://github.com/jkphl/gulp-svg-sprite. See https://una.im/svg-icons for more details.

### Generating the icons sprite
As defined in the gulp task, all new icons should be placed in the `img/icons` directory.
Run `gulp sprites` to generate a new sprite.
This generates the sprite SVG and places it in `img/icons/icons-sprite.svg` and it creates an html page with all SVGs for reference `img/icons/sprite.symbol.html`.


## Browser support

Progressive enhancement approach to layout, using Feature Queries to detect support for flexbox and grid.


## Favicons

OCHA default favicons are provided. Update these with your logo.

http://realfavicongenerator.net/ is a good tool for generating favicons.
