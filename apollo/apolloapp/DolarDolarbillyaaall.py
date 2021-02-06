import urllib.request
import json

def dolar_data(periodo):

    headers = {}
    headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"

    try:
        dolar_url = 'https://economia.awesomeapi.com.br/list/USD-BRL/'+periodo+'?format=csv/'

        base_dolar_url = 'https://economia.awesomeapi.com.br/list/USD-BRL/?start_date=20191010&end_date=20191010&?format=csv'

        source_code_req = urllib.request.Request(dolar_url, headers=headers)
        base_code_req = urllib.request.Request(base_dolar_url, headers=headers)

        source_code = urllib.request.urlopen(source_code_req).read().decode()
        base_code = urllib.request.urlopen(base_code_req).read().decode()

        jsource = json.loads(source_code)
        jbase = json.loads(base_code)

        source_entry = jsource[0]
        base_entry = jbase[0]
        
        dolar_var = float(base_entry['high']/source_entry['high'])
       
        return dolar_var, True

    except Exception as e:
        return 1, False