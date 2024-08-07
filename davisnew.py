from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def index():
    f = open("static/files/names.txt", "r")
    line = f.readline()
    paintingsList = []
    paintingsDict = {}
    videosDict = {}
    randLoadImgs = []
    yearA = []
    yearB = []
    yearC = []
    yearOther = []
    while line:
        name = line[:-1]
        if line[0] == "<":
            line = f.readline()
            while line[0] != ">":
                while line[0:2] != "A:":
                    randLoadImgs.append(line[:-1])
                    line = f.readline()
                line = f.readline()
                while line[0:2] != "B:":
                    yearA.append(line[:-1])
                    line = f.readline()
                line = f.readline()
                while line[0:2] != "C:":
                    yearB.append(line[:-1])
                    line = f.readline()
                line = f.readline()
                while line[0:6] != "Other:":
                    yearC.append(line[:-1])
                    line = f.readline()
                line = f.readline()
                while line[0:3] != "end":
                    yearOther.append(line[:-1])
                    line = f.readline()
                line = f.readline()
            break
        line = f.readline()
        details = []
        while line[0] == "-":
            if line[1:7] == "V1d3O:":
                videosDict[name] = line[7:]
            else:
                details.append(line[1:-1])
            line = f.readline()
        paintingsList.append(name)
        paintingsDict[name] = details
    menuLeft = [ "01 click for", "02 exhibition calendar", "03 available editions", "04 cv" ]
    menuMid = [ "05 follow", "06 fb", "07 instagram", "08 twitter", "09 email" ]
    menuRight = [ "10 press", "11 ren weschler", "year a", "year b", "year c", "15 other misc press" ]
    f.close()
    return render_template("index.html", paintingsList=paintingsList, paintingsDict=paintingsDict, videosDict=videosDict, menuLeft=menuLeft, menuMid=menuMid, menuRight=menuRight, randLoadImgs=randLoadImgs, yearA=yearA, yearB=yearB, yearC=yearC, yearOther=yearOther)

@app.route("/image/<painting>")
def showImage(painting):
    painting = painting.replace("%20", " ");
    return render_template("image.html", painting=painting);

if __name__ == "__main__":
    app.debug = True
    app.run()
