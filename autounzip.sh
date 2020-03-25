#!/bin/bash
cd tests
echo "> Décompression de l'archive..."
unzip sample-*
echo "> Suppression de l'archive..."
rm sample-*.zip
echo "> Déplacement des fichiers de test..."
mv sample-*/* .
echo "> Suppression du dossier des fichiers de test..."
rm -r sample-*
cd ..
