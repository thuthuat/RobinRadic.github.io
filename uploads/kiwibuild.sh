#!/bin/bash

rdir=$PWD
destdir=/home/radic/radicos/result
rootdir=/home/radic/radicos/root
profiles="improved yast2 webserver kde software dev workstation"
verbose=1


function Start {
    if [ $verbose == 1 ]; then
        echo "| $1"
    fi
}

function Info {
    if [ $verbose == 1 ]; then
        echo "|-----> $1 "
    fi
}

function Error {
    echo -e "| \e[91mERROR\e[39m $1"
}

function Done {
    echo -e "| \e[92mDONE\e[39m $1"
}

function _isdir {
    if [ -d $1 ]; then
        return 0
    else
        return 1
    fi
}

_tarzip_profiles() {
    Start "Tarring profile directories"
    cd $rdir/build/profiles
    for PDIR in *; do
        cd $rdir/build/profiles
        if _isdir $PDIR; then
            Info "Found directory: ${PDIR}"
            cd $PDIR
            tar -zcf ../${PDIR}.tar.gz ./
            Info "Created ${rdir}/kiwi/profiles/${PDIR}.tar.gz"
        else
            Info "Skipping ${PDIR}"
        fi
    done
    Done "Tarring profile directories"
    cd $rdir
}

_clean_tarzip_profiles() {
    Start "Clearing tared profiles"
    cd $rdir/build/profiles
    for PDIR in *; do
        cd $rdir/build/profiles
        if ! _isdir $PDIR; then
            Info "Removing non-directory item: $PDIR"
            rm $PDIR
        fi
    done
    Done "Clearing tared profiles"
    cd $rdir
}

prepare() {
    Start "Preparing build"
    sudo rm -rf $rootdir
    sudo rm -rf $destdir
    mkdir -p $rootdir
    mkdir -p $destdir

    _tarzip_profiles

   # if ! _isdir /mnt/radicos/bin; then
   #     Error "mount dc first"
   #     exit 1;
   # fi


    local command="sudo kiwi --prepare $rdir/build --root $rootdir"
    for profile in $profiles; do
        command="$command --add-profile $profile"
    done
    eval $command


    _clean_tarzip_profiles
    Done "Preparing build"

    notify-send "radicos prepare is done"
}


create() {
    Start "Creating build"
    local type=$1
    local command="sudo kiwi --create $rootdir --type $type -d $destdir"
    for profile in $profiles; do
        command="$command --add-profile $profile"
    done

    sudo cp -rf /radicos/{bin,doc,lib,radicos.conf} $rootdir/radicos

    eval $command
    sudo chown radic:users $destdir/*

    Done "Creating build"
    notify-send "radicos create is done"
}

boot() {
    local action=$1
    local image=$2;
    local profiles="default"
    local prepare="sudo kiwi --prepare $rdir/build/boot/$image --root $rdir/bootimg/$image/root"
    local create="sudo kiwi --create $rdir/bootimg/$image/root -d $rdir/bootimg/$image"

    for profile in $profiles; do
        prepare="$prepare --add-profile $profile"
        create="$create --add-profile $profile"
    done



    if [ $action == "prepare" ]; then
        sudo rm -rf $rdir/bootimg/$image
        mkdir -p $rdir/bootimg/$image
        eval $prepare
    elif [ $action == "create" ]; then
        eval $create
    fi


    notify-send "build $action is done"
}

installer() {
    mkdir -p $rdir/installer/tmpcd
    cp -rvf $rdir/installer/original-unpacked/* $rdir/installer/tmpcd/
    cp -rvf $rdir/installer/data/* $rdir/installer/tmpcd/

    echo "done, do makeSUSEdvd -C"
}

installergo() {
    makeSUSEdvd -t

}
installerold() {
    local instsys=$rdir/installer-image/images/instsys
    cd $rdir
    mkdir $rdir/installer
    cp -rf $instsys/branding/openSUSE/CD1/* $rdir/installer/
    cp -rf $instsys/CD1/* $rdir/installer/

    mkisofs -o installer.iso \
       -b boot/x86_64/loader/isolinux.bin \
       -c boot/x86_64/loader/boot.cat \
       -no-emul-boot -boot-load-size 4 -boot-info-table -R -J -v -T \
       installer
}

$*