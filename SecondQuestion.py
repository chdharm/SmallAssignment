import requests,datetime, zipfile, io
from bs4 import BeautifulSoup

def getURL(page):
    start_link = page.find("a href")
    if start_link == -1:
        return None, 0
    start_quote = page.find('"', start_link)
    end_quote = page.find('"', start_quote + 1)
    url = page[start_quote + 1: end_quote]
    return url, end_quote

def get_data_file(day):
    if day<10:
        day="0"+str(day)
    date=str(day)+"-02-2019"
    if isValidDate(date)==False:
        return
    url="https://nseindia.com/ArchieveSearch?h_filetype=eqbhav&date="+date+"&section=EQ"
    res=requests.get(url)
    return res
def isValidDate(date_string):
    date_format = '%d-%m-%Y'
    try:
        datetime.datetime.strptime(date_string, date_format)
        return True
    except ValueError:
        return False
if __name__=='__main__':
    print ("Enter the start day:")
    start=int(input())
    print("Enter the end day:")
    end=int(input())
    for i in range(start,end+1):
        final_res=get_data_file(i)
        if final_res==None:
            print ("Unscuccessfull for day",i)
        else:
            page = str(BeautifulSoup(final_res.content))
            #print (page)
            #print ("GOT URL:",getURL(page))
            #print (final_res.content)
            file_url=getURL(page)
            zip_url = "https://nseindia.com"+file_url
            zip_res = requests.get(zip_url)
            zip_file = zipfile.ZipFile(io.BytesIO(zip_res.content))
            extracted_zip = zip_file.extractall()
            #print("Scuccessfull for day", i)
