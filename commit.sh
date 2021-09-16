#!/bin/bash
#
# commit.sh
#
# Syntax:
#   commit.sh 'commit_message' -r version
#
# Params:
#   commit_message: Semantic Versioning commit message
#                   e.g. 'feat: CRUD endpoint with OpenAPI spec'
#   -r version: new version code to be released as v{MAYOR}.{MINOR}.{PATCH}
#

SYNTAX="SYNTAX:\n  commit.sh 'commit_message' -r version\n \
  \n  commit_message: Semantic Versioning commit message \
  \n                  e.g. 'feat: CRUD endpoint with OpenAPI spec' \
  \n  -r version: new version code to be released as v{MAYOR}.{MINOR}.{PATCH}"  

if [ $# -gt 3 ] || [ $# -lt 1 ]
then
  echo -e "$SYNTAX"
  exit -1
elif [ $# -eq 2 ] || ([ $# -eq 3 ] && [ "$2" != "-r" ])
then
  echo -e "$SYNTAX" 
  exit -1
fi

if [ $# -eq 3 ]
then
  echo -e "\nDANGER!!"
  echo -e "1. Increment Build index (package.json)"
  echo -e "2. Update the new version in the source code (package.json)"
  echo -e "3. Update CHANGELOG (CHANGELOG.md)"
  echo -en "\nAre you sure? (y/n) "
  read opt
  if [ $opt != "y" ] && [ $opt != "Y" ]
  then
    echo -e "\nAborted!"
    exit 0
  fi
else
  echo -e "\nDANGER!!"
  echo -e "1. Increment Build index (package.json)"
  echo -en "\nAre you sure? (y/n) "
  read opt
  if [ $opt != "y" ] && [ $opt != "Y" ]
  then
    echo -e "\nAborted!"
    exit 0
  fi
fi

git add .
git commit -m "$1"

if [ $# -eq 1 ]
then
  git push -u origin-git master
else
  git tag "$3"
  git push origin-git master --tags
fi

git log -n 4 --oneline