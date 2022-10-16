from operator import invert
from PIL import Image
from rembg import remove
import cv2



def removeBg(images):
    transparentImages=[]
    for image in images:
        input_path = image
        output_path = 'no-bg-'+ input_path.split(".")[0]+".png"
        with open(input_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                input = i.read()
                output = remove(input)
                o.write(output)
                transparentImages.append(output_path)
    return transparentImages

def combineImages(images,backgroundImage="",backgroundImagePadding=0,mode="normal"):
    
    images = [Image.open(x) for x in removeBg(images)]
    
    widths, heights = zip(*(i.size for i in images))

    


    total_width = sum(widths)
    max_height = max(heights)
    min_height= min(heights)
    max_width = max(widths)
    new_im = Image.new('RGB', (total_width, max_height))
    x_offset = 0

    if  backgroundImage:
        backgroundImage=Image.open(backgroundImage)
        new_im = Image.new('RGB', (total_width+backgroundImagePadding, max_height+backgroundImagePadding))
        new_im.paste(backgroundImage, (0,0))   

    for im in images:
    
        w=im.size[0]
        h=im.size[1]
        
        if(im.size[1]==min_height):
            w=int(w*float(h/w))
            h=max_height
            im=im.resize((w, h))
        
        im.crop(im.getbbox())
        new_im.paste(im, (int(x_offset+backgroundImagePadding/2), int(0+backgroundImagePadding/2)), im)
        x_offset += max_width

    new_im.save('test.jpg')

    if mode=='sketch':
        img=cv2.imread('test.jpg')
        gray_image=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
        inverted_gray_image=255-gray_image
        blurred_image=cv2.GaussianBlur(inverted_gray_image,(21,21),0)
        inverted_blurred_image=255-blurred_image
        pencil_sketch_image=cv2.divide(gray_image,inverted_blurred_image,scale=256.0)
        cv2.imwrite('test.jpg',pencil_sketch_image)