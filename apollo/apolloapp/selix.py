import urllib.request
import json

def tax_selix():

    try:
        entry = {}
        headers = {}
        headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"

        dolar_url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json"

        source_code_req = urllib.request.Request(dolar_url, headers=headers)
        source_code = urllib.request.urlopen(source_code_req).read()
        jsource = json.loads(source_code)
        entry = jsource[0]
        selix=float(entry['valor'])
        
        return selix, 'good'

    except Exception as e:
        return 3.65, 'error'


