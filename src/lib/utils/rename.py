# rename all the files in the current directory to have a given extension
# usage: rename.py extension

import os, sys

def renameFiles(extension):
    # get the current directory
    directory = os.getcwd()
    # get the list of files in the current directory
    files = os.listdir(directory)
    # for each file in the list
    for file in files:
        # if the file is a directory
        if os.path.isdir(file):
            # recursively rename the files in the directory
            os.chdir(file)
            renameFiles(extension)
            os.chdir(directory)
            continue
        # get the file name
        name = os.path.splitext(file)[0]
        # get the file extension
        ext = os.path.splitext(file)[1]
        # if the file extension is not the same as the given extension
        if ext != extension:
            # rename the file to have the given extension
            os.rename(file, name + extension)
    


def main():
    renameFiles(sys.argv[1])

if __name__ == '__main__':
    main()