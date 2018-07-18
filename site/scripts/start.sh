node webpack/dll
if [ $? == 0 ]; then
    webpack --config=webpack/dll.config --color --progress
fi
cross-env NODE_ENV=development webpack-dev-server --color --progress
