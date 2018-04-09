#!/bin/bash

function gulpBuild() {
    gulp pug
    gulp sass
    gulp
}
# ## なぜかpackage.jsonに"./scripts.sh gulpBuild"しても通らないため記述
# gulpBuild

$1
