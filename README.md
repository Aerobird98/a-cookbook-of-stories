# A CookBook of stories

An animated webcomic, running on top of the phaser game engine.

## Why phaser?

This webcomic, as it is mentioned above, runs on phaser, and the reson for it is basically nothing, it runs on it because we could do it.

## Usage

run `npm i` to install all dependencies then `npm run build` to build into the `build/` directory. You can deploy the contents of `build/` to gh-pages with the `npm run deploy` command. If you want to build & deploy with one command use `npm run release`.

We use htttp-server, a simple zero configuration webserver for local testing. After `npm run build` you can run `npm start` to start the webserver and serve the contents of `build/` on `localhost` or use `npm run test` to automaticaly build before starting the local test server.

## Customizability

The images in this website are of the same size,
both in width, and height. the naming of the images
should be the same, with unique numbers starting from 10,
as it is easier to loop through them that way.

The image names use a format like it can be seen ("FRAMES_0000"), most animating softwares use naming systems like this.

The constant values can be modified for personalization.

# Licenses

Each file in this repository falls under one of two licenses. Files whose extension is ".png" use a Creative Commons license. All other files, including (but not limited to) ".html", ".md", ".js", use the MIT license. For details see the LICENSE file.

# End

That's it folks have fun.
