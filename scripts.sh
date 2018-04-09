#!/bin/bash

function gulpBuild() {
    gulp pug
    gulp sass
    gulp
}

$1