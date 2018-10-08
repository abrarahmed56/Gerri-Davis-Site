from flask import Flask, render_template, request
from flask.ext.mobility import Mobility
from flask.ext.mobility.decorators import mobile_template


app = Flask(__name__)
Mobility(app)

@app.route("/")
@mobile_template("{mobile/}home.html")
def index():
    print request.headers.get('User-Agent')
    paintings_file = open("files/names.txt", "r")
    line = paintings_file.readline()
    paintings_list = []
    details_dict = {}
    videos_dict = {}
    while line:
        name = line.strip()
        painting_item = {}
        details = []
        image_info = []
        line = paintings_file.readline()
        while line and line[:2] == "##":
            part_of_title = line[2:]
            #name = name + part_of_title
            painting_item['extra_name'] = part_of_title
            line = paintings_file.readline()
        while line and line[0] == "#":
            image_info_item = {}
            line = line[1:]
            image_info_text = line.split(" #")
            image_info_item['text'] = image_info_text[0]
            if len(image_info_text) == 2:
                link = image_info_text[1]
                image_info_item['link'] = link
                if 'link' not in painting_item:
                    painting_item['link'] = link
            image_info.append(image_info_item)
            line = paintings_file.readline()
        while line and line[0] == "-":
            details.append(line[1:-1])
            line = paintings_file.readline()
        #paintings_list.append(name)
        painting_item['painting_name'] = name
        painting_item['details'] = details
        painting_item['image_info'] = image_info
        paintings_list.append(painting_item)
        details_dict[name] = details
    paintings_file.close()
    #paintings_list = ["Three", "the Dance", "Night Window", "Window to Window"]
    rand_load_imgs = []
    year_a = []
    year_b = []
    year_c = []
    other_content = []
    menu = []
    menu_file = open("files/menu.txt")
    #column_1 = open("files/column1.txt", "r")
    #line = column_1.readline()
    column_name = menu_file.readline()
    while column_name:
        menu_column = []
        column_file = open("files/" + column_name.strip())
        line = column_file.readline()
        while line:
            menu_item_text = line.strip()
            menu_item_with_link = menu_item_text.split(" #")
            menu_item_with_more_menu = menu_item_text.split(" ##")
            menu_item = {}
            if len(menu_item_with_more_menu) == 2:
                menu_item['text'] = menu_item_with_more_menu[0]
                menu_subitems = []
                subitem_file = open("files/" + menu_item_with_more_menu[1])
                subitem = subitem_file.readline()
                while subitem:
                    menu_subitem = {}
                    subitem = subitem.split(" #")
                    menu_subitem['text'] = subitem[0]
                    menu_subitem['link'] = subitem[1]
                    menu_subitems.append(menu_subitem)
                    subitem = subitem_file.readline()
                subitem_file.close()
                menu_item['more_menu'] = menu_subitems
            elif len(menu_item_with_link) == 2:
                menu_item['text'] = menu_item_with_link[0]
                menu_item['link'] = menu_item_with_link[1]
            else:
                menu_item['text'] = menu_item_text
            menu_column.append(menu_item)
            line = column_file.readline()
        menu.append(menu_column)
        column_name = menu_file.readline()
    column_file.close()
    random_images = open("files/random_loading_images.txt", "r")
    random_image = random_images.readline()
    while random_image:
        name = random_image.strip()
        image_item = {}
        image_info = []
        random_image = random_images.readline()
        while random_image and random_image[0] == "#":
            image_info.append(random_image[1:])
            random_image = random_images.readline()
        image_item['image_name'] = name
        image_item['image_info'] = image_info
        rand_load_imgs.append(image_item)
    random_images.close()
    return render_template("home.html", message="Hello, World!", 
                           paintings_list=paintings_list, details_dict=details_dict,
                           menu=menu, rand_load_imgs=rand_load_imgs)

@app.route("/image/<painting>")
def showImage(painting):
    painting = painting.replace("%20", " ");
    #return render_template("image.html", painting=painting);

if __name__ == "__main__":
    app.debug = True
    app.run()
