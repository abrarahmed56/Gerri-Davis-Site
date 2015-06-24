from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def index():
    f = open("C:/Users/Admin/Desktop/Gerri Davis Website/flaskversion/static/files/names.txt", "r")
    line = f.readline()
    paintingsList = []
    paintingsDict = {}
    randLoadImgs = []
    yearA = []
    yearB = []
    yearC = []
    yearOther = []
    while line:
        name = line[:-1]
        if line[0] == "<":
            line = f.readline()
            while line != ">":
                print "AAAA"
                while line[0:2] != "A:":
                    print "while a: " + line
                    randLoadImgs.append(line[:-1])
                    #break
                    '''if line == "":
                        print "end, fail"
                        break'''
                    #print line
                    line = f.readline()
                line = f.readline()
                while line[0:2] != "B:":
                    print "while b: " + line
                    yearA.append(line[:-1])
                    line = f.readline()
                line = f.readline()
                while line[0:2] != "C:":
                    print "while c: " + line
                    yearB.append(line[:-1])
                    line = f.readline()
                line = f.readline()
                while line[0:6] != "Other:":
                    print "while other: " + line
                    yearC.append(line[:-1])
                    line = f.readline()
                line = f.readline()
                while line[0:3] != "end":
                    yearOther.append(line[:-1])
                    line = f.readline()
                print "OPEN BRACKET- " + str(line[0:2] == "A:")
                line = f.readline()
            print "randload: " + str(randLoadImgs)
            print "a: " + str(yearA)
            print "b: " + str(yearB)
            print "c: " + str(yearC)
            print "other: " + str(yearOther)
            print "CLOSE BRACKET"
            break
        #print name
        line = f.readline()
        #if len(line)>=1:
        details = []
        while line[0] == "-":
            if line[1:7] == "V1d3O:":
                pass
            else:
                details.append(line[1:-1])
            line = f.readline()
        paintingsList.append(name)
        paintingsDict[name] = details
    #print paintingsDict
    menuLeft = [ "01 click for", "02 exhibition calendar", "03 available editions", "04 cv" ]
    menuMid = [ "05 follow", "06 fb", "07 instagram", "08 twitter", "09 email" ]
    menuRight = [ "10 press", "11 ren weschler", "year a", "year b", "year c", "15 other misc press" ]
    #testPaintDict = {"the Dance" : ["Exhibition View Gowanus Ballroom", "Study 1 Ropeswing"], "test": []}
    #testPaintList = ["the Dance", "test"]
    f.close()
    return render_template("index.html", paintingsList=paintingsList, paintingsDict=paintingsDict, menuLeft=menuLeft, menuMid=menuMid, menuRight=menuRight, randLoadImgs=randLoadImgs, yearA=yearA, yearB=yearB, yearC=yearC, yearOther=yearOther)
    #return render_template("index.html", paintingsList=paintingsList, paintingsDict=paintingsDict)

@app.route("/image/<painting>")
def showImage(painting):
    painting = painting.replace("%20", " ");
    #return "<img src='../static/files/Images/ImagesOfPaintings/" + painting + ".jpg'>";
    return render_template("image.html", painting=painting);

if __name__ == "__main__":
    app.debug = True
    app.run()
