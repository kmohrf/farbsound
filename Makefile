default: deps assets

assets:
	mkdir -p web/assets
	cp -r --target-directory=web/assets src/img src/js bower_components/font-awesome/build/assets/font-awesome/font
	mkdir -p web/assets/css
	# current lessc version fail to compile old bootstrap versions. we just steal the build from the docs
	cp bower_components/bootstrap/docs/assets/css/bootstrap.css web/assets/css/bootstrap.min.css
	node_modules/.bin/lessc src/css/player.less --autoprefix="> 5%" --clean-css="--s1 --advanced" --strict-units=on --strict-math=on > web/assets/css/player.css
	node_modules/.bin/lessc src/css/site.less --autoprefix="> 5%" --clean-css="--s1 --advanced" --strict-units=on --strict-math=on > web/assets/css/site.css
	mkdir -p web/assets/js
	cp bower_components/eventdispatcher.js/src/* web/assets/js

deps:
	npm install
	bower install
