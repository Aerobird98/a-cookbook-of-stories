# A CookBook of stories

An animated webcomic, running on top of the phaser game engine.

## Why phaser?

This webcomic, as it is mentioned above, runs on phaser, and the reson for it is basically nothing, it runs on it because we could do it.

## Usage

run `npm i` to install all dependencies then `npm run build` to build into the `build/` directory. You can deploy the contents of `build/` to gh-pages with the `npm run deploy` command. If you want to build & deploy with one command use `npm run release`.

We use htttp-server, a simple zero configuration webserver for local testing. After `npm run build` you can run `npm start` to start the webserver and serve the contents of `build/` on `localhost` or use `npm run test` to automaticaly build before starting the local test server.

## Customizability

This program is designed to be reusable for future animated webcomics, there are a few constant values that can be customized like: How many pages does your comic has? Whats their resolution? How many frames? FPS? Etc...

Just place your images in the `img/` folder under the `build/` directory. Each page is another folder numbered from `0` to whatever number of pages you need minus `1`. The image names need to be the same (for every image in every directory) and must use a format like `[IMAGE_NAME]_0000...[IMAGE_NAME]_0024`, most professional animation softwares use naming systems like this.

# Licenses

Each file in this repository falls under one of two licenses. Files whose extension is ".png" use a Creative Commons license. All other files, including (but not limited to) ".html", ".md", ".js", use the MIT license. For details see the LICENSE file.

# End

That's it folks have fun.
